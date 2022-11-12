const { json } = require("express");
const express = require("express");
const router = express.Router();
const db = require("./DB");
const security = require("./Security");

trialLogins = [];

//add new user to database
router.post("/addUser", async (req, res) => {
  const data = req.body;

  //hash password and add use to database
  let hash = await security.Encode(data.passWord);
  let dbResult = await db.AddUser(data.userName, hash.Hash, hash.Salt);

  console.log("add user: ", dbResult);

  res.json(dbResult);
});

//validate user login
router.get("/login", async (req, res) => {
  let data = req.body;
  console.log(data.userName);

  //check if user has attempted too many times
  const userAttempts = trialLogins
    .filter(
      (x) => new Date(x.Time).getTime() + 1000 * 60 * 5 > new Date().getTime()
    )
    .filter((x) => x.Username == data.userName);

  //return if loginattempts are more than 5
  if (trialLogins.length >= 5) {
    userAttempts.forEach((el) => {
      trialLogins[trialLogins.findIndex((x) => x == el)].Time = new Date();
    });

    res.status(403);
    return;
  }

  //get user from database
  let user = await db.GetUser(data.userName);
  console.log(user);
  if (user === undefined) {
    AddToTrial(data.userName);

    res.sendStatus(501);
    return;
  }

  //check user validation
  let validated = await security.validatePassword(data.passWord, user.passWord);
  if (validated) {
    
    //rehash password & update database
    rehash(user.userName, data.passWord, user.salt);

    //return ok to client
    res.status(200);
  } 
  else {
    // Add to failed login attempts array
    console.log("wrong user");
    AddToTrial(data.userName);

    console.log("login attempts: ", trialLogins.length);
    // res.status(200).send({ "du har nu brugt ": `${response.length}` + " forsøg" });
    //return;
    res.status(500);
    //return;
  }

  res.json(user);

  //add attempt to trial array
  function AddToTrial(userName) {
    trialLogins.push({
      Username: userName,
      Time: new Date(),
    });

    // Remove old elements (if any)
    let newArray = trialLogins.filter(
      (x) => new Date(x.Time).getTime() + 1000 * 60 * 5 < new Date().getTime()
    );

    //update trial login array with new data
    if (newArray.length >= 1) {
      newArray.forEach((el) => {
        trialLogins.splice(
          trialLogins.findIndex((x) => x == el),
          1
        );
      });
    }
  }


  //rehash password
  async function rehash(userName, password, salt) {
    
    //cut out hash string
    let hash = password.slice(salt.length, password.length);
    
    //generate new salt
    let newSalt = await security.Salt();
    let newHash = newSalt + hash;
   
   // console.log("new hash: ", newHash);
   // console.log("new salt: ", newSalt);

   //update database with new password and salt
    let dbResult = await db.UpdateLogin(userName, newHash, newSalt);
    console.log("rehash: ", dbResult);
  }
});

module.exports = router;
