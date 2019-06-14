var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({
      where: { id: req.params.id }
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  app.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/",
      successRedirect: "/",
      failureFlash: true
    }),
    function(req, res) {
      res.redirect("/");
    }
  );

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get(
    "/profile",
    require("connect-ensure-login").ensureLoggedIn("loginscreen"),
    function(req, res) {
      res.render("profile", { user: req.user });
    }
  );

  // setting sign up
  app.post("/signup", function(req, res) {
    console.log("Hello Evgenia: ", req.body);
    db.owners
      .create({
        username: req.body.username,
        password: req.body.password,
        name: req.body.fullname,
        phone: req.body.phonenumber,
        email: req.body.email
      })
      .then(function(jane) {
        console.log("Jane's auto-generated ID:", jane.id);
      });
  });
};
