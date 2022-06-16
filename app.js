const express = require("express")
const app = express()
const {projects} = require ("./data.json")


app.use("/static", express.static("public"))
app.set('view engine', 'pug');

app.get("/", (req, res)=>{
    res.render('index', {projects});

});


app.get("/about", (req, res)=>{
    res.render('about');

});

app.get("/projects/:id", (req, res, next)=>{
    res.render('project', {project:projects[req.params.id]});
    const project = data.projects[id];
  if (project) {
    res.render("project", { project });
  } else {
    const err = new Error();
    err.status = 404;
    err.message = `Project ${id} does not exist`;
    next(err);
  }
});

/*
 *404 Error Handler
 */
app.use((req, res, next) => {
  const err = new Error(
    "Sorry! That page doesn't exist! Please check the correct URL!"
  );
  err.status = 404;
  next(err);
});
/*
 * Global Error Handler
 */
app.use((err, req, res) => {
  err.message = err.message || "There was a server error!";
  res.status(err.status || 500);
  console.log(`You have hit a ${err.status} error!`);
  res.send(`Error Code: ${res.status} : ${err.message}`);
});


app.listen(3000, () => {
    console.log("The app is running at http://localhost:3000/")



});