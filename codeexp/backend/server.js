const express = require("express");
// const cors = require("cors");
const app = express();
const port = 3000;
const { db } = require("./config.js");
const docRef = db.collection("users").doc("alovelace");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/create", async (req, res) => {
//   const data = req.body;
  await docRef.set({
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
});
