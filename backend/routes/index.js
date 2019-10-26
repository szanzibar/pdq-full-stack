var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  if (process.env.FRONTEND && process.env.FRONTENDPORT) {
    res.redirect(`${process.env.FRONTEND}:${process.env.FRONTENDPORT}`);
  } else {
    res.send("<p>Visit the front end.</p>");
  }
});

module.exports = router;
