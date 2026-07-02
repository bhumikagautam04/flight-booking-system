var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.get("/login_page",function(req,res){
    res.render("login_page");
})


module.exports = router;
