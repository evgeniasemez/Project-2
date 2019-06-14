require("dotenv").config();
var express = require("express");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

// app.get("/", function(req, res) {
//   // Get an array of flash messages by passing the key to req.flash()
//   res.render("index", { messages: req.flash("info") });
// });
s
// Middleware
//Parse application body by JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static("public"));

// Set Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
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

module.exports = app;
