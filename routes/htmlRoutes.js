var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // console.log("Testing it!" + req.flash("info"));
    // db.Example.findAll({}).then(function(dbExamples) {

    res.render("index", {
      user: req.user
    });
  });
  // });

  app.get("/loginscreen", function(req, res) {
    // console.log("Testing it!" + req.flash("info"));
    if (req.user) {
      console.log("do nothing");
      res.render("index", {
        user: req.user
        // examples: dbExamples,
        // flash: req.flash("error"),
      });
    } else {
      // db.Example.findAll({}).then(function(dbExamples) {
      res.render("profile", {
        // examples: dbExamples,
        // flash: req.flash("error"),
      });
    }
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
