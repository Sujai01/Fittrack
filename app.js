const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const apiRoutes = require("./routes/api");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/dashboard", (req, res) => {
const allLogs = JSON.parse(fs.readFileSync("./data/logs.json", "utf8"));
const gymLogs = allLogs.filter(log => log.type === "gym");
const badmintonLogs = allLogs.filter(log => log.type === "badminton");

res.render("dashboard", { gymLogs, badmintonLogs });

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

app.get("/history", (req, res) => {
  const logs = JSON.parse(fs.readFileSync("./data/logs.json", "utf8"));
  const gymLogs = logs.filter(log => log.type === "gym");
  const badmintonLogs = logs.filter(log => log.type === "badminton");

  res.render("history", { gymLogs, badmintonLogs });
});

app.post("/clear-logs" , (req , res) =>{
  fs.writeFileSync("./data/logs.json" , "[]");
  res.redirect("/dashboard");
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
