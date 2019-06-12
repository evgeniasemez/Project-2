var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // console.log("Testing it!" + req.flash("info"));

    // db.Example.findAll({}).then(function(dbExamples) {
    res.render("index", {
      msg: "Welcome!",
      // examples: dbExamples,
      // flash: req.flash("error"),
      message: req.flash("error")
    });
  });
  // });

  app.get("/loginscreen", function(req, res) {
    // console.log("Testing it!" + req.flash("info"));

    // db.Example.findAll({}).then(function(dbExamples) {
    res.render("profile", {
      msg: "Welcome!",
      // examples: dbExamples,
      // flash: req.flash("error"),
      message: req.flash("error")
    });
  });

  app.get("/flash", function(req, res) {
    // Set a flash message by passing the key, followed by the value, to req.flash().
    // req.flash("info", "Flash is back!");
    console.log(req.flash("error"));
    // res.render("index", {
    //   msg: "Welcome!",
    // examples: dbExamples,
    //   flash: req.flash("error"),
    //   message: "login failed"
    // });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({
      where: { id: req.params.id }
    }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
