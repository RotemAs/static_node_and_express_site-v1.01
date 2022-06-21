const express = require("express")
const app = express()
const {projects} = require ("./data.json")
const PORT = '3000'


app.use("/static", express.static("public"))
app.set('view engine', 'pug');

app.get("/", (req, res)=>{
  console.log('test ///')

    res.render('index', {projects});

});


app.get("/about", (req, res)=>{
  console.log('test /about')
    res.render('about');

});

app.get("/projects/:id", (req, res, next)=>{
  if (parseInt(req.params.id) < projects.length) {
    const project = projects[req.params.id];
    res.render("project", { project });
  }  else {
    next()
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
  console.log(`You have hit a ${err.status} error!`);
  res.render('page-not-found', { err });
  // next(err);
});
/*
 * Global Error Handler
 */
app.use((err, req, res) => {
  err.message = err.message || "There was a server error!";
  res.status(500);
  console.log(`You have hit a ${err.status} error!`);
  res.render('error', { err });
});

app.listen(PORT, () => {
    console.log(`The app is running at http://localhost:${PORT}/`)



});

