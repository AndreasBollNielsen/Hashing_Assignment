const express = require("express");
const app = express();
const cors = require("cors");
const handler = require("./Routes/Handler");
const port = 3600;

//initialize app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", handler);

//output port listener
app.listen(port, () => {
  console.log(`port is listening ${port}`);
});
