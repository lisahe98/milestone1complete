const express = require("express");
const PORT = process.env.PORT || 8007;
const app = express();
const fs = require("fs").promises;

// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("createcard");
});

app.post("/create", (req,res) => {
  const user = req.body; // Data from browser
  user.id = Math.floor(Math.random() * 600) + 1;
  fs.readFile("database.json", "utf-8") //read the file as string
  .then((content) => JSON.parse(content)) // convert string to object
  .then((jsonObj) => {
    jsonObj.users.push(user); // push object to file
    fs.writeFile("database.json", JSON.stringify(jsonObj)) // save object in file
    .then(() => res.redirect("/people/" + user.id )) // redirect user to user's page
    .catch(err => console.log(err)) // every function needs .catch this one is for write file
  })
  .catch(err => console.log(err))// .catch for readFile
})



app.get("/people/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("database.json", "utf-8")
  .then(content => JSON.parse(content).users)
  .then(listOfUsers => listOfUsers.find(user => user.id == id))
  .then(user => res.render("homepage", { user }))
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;//next term topic
});
/********** */
// app.get("./homepage", (req, res) => {
//   res.render("homepage");
// })
// app.post("./create", (req,res) => {
//   const user = req.body;
//   fs.readFile("database.json", "utf-8")
//   .then((content) => JSON.parse(content))
//   .then((jsonObj) => {
//     //writefile("database.json", newJsonObj)
//     .then(() => res.redirect("/people/"))
//   })
// })
/********** */
app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});