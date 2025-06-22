const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/dashboard", (req, res) => {
  const logs = JSON.parse(fs.readFileSync("./data/logs.json", "utf8"));
  res.render("dashboard", { logs });
});


app.post("/add-log" , (req , res)=>{
  const newLog={
    type:req.body.type,
    date:req.body.date,
    details:req.body.details
  };
   
  const logs = JSON.parse(fs.readFileSync("./data/logs.json", "utf8"));
  logs.push(newLog); 

    fs.writeFileSync("./data/logs.json", JSON.stringify(logs, null, 2));

  res.redirect("/dashboard");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
