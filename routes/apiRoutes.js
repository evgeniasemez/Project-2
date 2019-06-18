var db = require("../models");
var passport = require("passport");
var sha256 = require("js-sha256");

module.exports = function(app) {
  // Get all examples
  app.get("/api/owners/:id", function(req, res) {
    db.owners
      .findOne({
        where: {
          //include: [db.dogs],
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
          id: req.params.id
        }
      })
      .then(function(dbDogs) {
        console.log(dbDogs);
        res.json(dbDogs);
      });
  });

  app.get("/api/dogsByOwner/:owner", function(req, res) {
    db.dogs
      .findOne({
        where: {
          ownerId: req.params.owner
        }
      })
      .then(function(dbDogs) {
        console.log(dbDogs);
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
      successRedirect: "/landing.html"
    }),
    function(req, res) {
      console.log("HI");

      res.redirect("/landing.html");
    }
  );

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get(
    "/owner",
    require("connect-ensure-login").ensureLoggedIn("loginscreen"),
    function(req, res) {
      res.redirect("/landing.html");
    }
  );

  // setting sign up
  // eslint-disable-next-line no-unused-vars
  app.post("/signup", function(req, res) {
    console.log("Hello Evgenia: ", req.body);
    var pass = req.body.password;
    console.log(pass);
    db.owners
      .create({
        username: req.body.username,
        password: sha256(pass),
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
