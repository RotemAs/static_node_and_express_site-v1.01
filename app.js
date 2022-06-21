const express = require("express")
const app = express()
const {projects} = require ("./data.json")
const PORT = '3000'


app.use("/static", express.static("public"))
app.set('view engine', 'pug');

app.get("/", (req, res)=>{
    res.render('index', {projects});

});


app.get("/about", (req, res)=>{
  // throw new Error(500)
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
  res.render('page-not-found', { err });
  // console.log('test100')
  // next(err);
});
/*
 * Global Error Handler
 */
app.use((err, req, res,next) => {
  err.message = err.message || "There was a server error!";
  // console.error(err.stack)
  res.status(500);
  res.render('error', { err });
});

app.listen(PORT, () => {
    console.log(`The app is running at http://localhost:${PORT}/`)



});

// ,target="_blank"