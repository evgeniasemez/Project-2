var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  // Get all examples
  app.get("/api/owners/:id", function(req, res) {
    db.owners
      .findOne({
        where: {
          include: [db.dogs],
          id: req.params.id
        }
      })
      .then(function(dbOwners) {
        res.json(dbOwners);
      });
  });

  // Create a new example
  app.post("/api/owners", function(req, res) {
    db.owners.create(req.body).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });

  // Delete an example by id
  app.delete("/api/owners/:id", function(req, res) {
    db.owners
      .destroy({
        where: { id: req.params.id }
      })
      .then(function(dbOwners) {
        res.json(dbOwners);
      });
  });

  app.get("/api/dogs/:id", function(req, res) {
    db.dogs
      .findOne({
        where: {
          include: [db.events],
          id: req.params.id
        }
      })
      .then(function(dbDogs) {
        res.json(dbDogs);
      });
  });

  // Create a new example
  app.post("/api/dogs/", function(req, res) {
    db.dogs.create(req.body).then(function(dbDogs) {
      res.json(dbDogs);
    });
  });

  // Delete an example by id
  app.delete("/api/dogs/:id", function(req, res) {
    db.dogs
      .destroy({
        where: { id: req.params.id }
      })
      .then(function(dogs) {
        res.json(dogs);
      });
  });

  app.get("/api/events", function(req, res) {
    db.events.findAll({}).then(function(dbOwners) {
      res.json(dbOwners);
    });
  });

  app.get("/api/events/:id", function(req, res) {
    db.events
      .findOne({
        where: {
          include: [db.dogs],
          id: req.params.id
        }
      })
      .then(function(dbEvents) {
        res.json(dbEvents);
      });
  });

  // Create a new example
  app.post("/api/events", function(req, res) {
    console.log(req.body);
    db.events.create(req.body).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  // Delete an example by id
  app.delete("/api/events/:id", function(req, res) {
    db.events
      .destroy({
        where: { id: req.params.id }
      })
      .then(function(dbEvents) {
        res.json(dbEvents);
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
    require("connect-ensure-login").ensureLoggedIn(),
    function(req, res) {
      res.render("profile", { user: req.user });
    }
  );
};
