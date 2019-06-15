require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("passport");

var LocalStrategy = require("passport-local").Strategy;
var sha256 = require("js-sha256");


// Initialize Passport and restore authentication state, if any, from the
// session.

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.get("/", function(req, res) {
//   // Get an array of flash messages by passing the key to req.flash()
//   res.render("index", { messages: req.flash("info") });
// });

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.owners
    .findOne({
      where: {
        id: id
      }
    })
    .then(function(user) {
      var err = null;
      cb(err, user);
    });
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    console.log(username + " " + password);

    db.owners
      .findOne({
        where: {
          username: username
        }
      })
      .then(function(user) {
        if (!user) {
          return done(null, false);
        }

        if (user.password !== sha256(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
  })
);

module.exports = app;
