var db = require("../models");
var passport = require("passport");
var sha256 = require("js-sha256");

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
  // eslint-disable-next-line no-unused-vars
  app.post("/signup", function(req, res) {
    console.log("Hello Evgenia: ", req.body);
    var pass = sha256(req.body.password);
    console.log(pass);
    db.owners
      .create({
        username: req.body.username,
        password: pass,
        name: req.body.fullname,
        phone: req.body.phonenumber,
        email: req.body.email
      })
      .then(function(jane) {
        console.log("Jane's auto-generated ID:", jane.id);
      });
  });
  //load dog editing html
  /*app.get("/loadDogData", function(req, res) {
    db.findAll({
      where: {
        owner: req.parms.owner
      }
    }).then(function(result) {
      console.log(res.json(result));
      return res.json(result);
    });
  });
  /*app.get("/api/:characters?", function(req, res) {
    if (req.params.characters) {
      // Display the JSON for ONLY that character.
      // (Note how we're using the ORM here to run our searches)
      Character.findOne({
        where: {
          routeName: req.params.characters
        }
      }).then(function(result) {
        return res.json(result);
      });
    } else {
      Character.findAll().then(function(result) {
        return res.json(result);
      });
    }
  });*/
};
