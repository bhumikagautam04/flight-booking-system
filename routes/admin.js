var express = require('express');
var pool = require('./pool');
var router = express.Router();

/* GET home page. */
router.get('/dashboard', function(req, res, next) {
  pool.query(
    "select count(*) as flights from flight; select count(*) as cities from city; select count(distinct company) as companies from flight",
    function(err, results) {
      if (err) {
        return res.render('dashboard', { stats: { flights: 0, cities: 0, companies: 0 } });
      }
      res.render('dashboard', {
        stats: {
          flights: results[0][0].flights || 0,
          cities: results[1][0].cities || 0,
          companies: results[2][0].companies || 0,
        },
      });
    }
  );
});

router.get("/login_page",function(req,res){
    res.render("login_page");
})


router.post("/chk_login", function(req, res) {

    pool.query(
        "select * from admin where (emailid=? or mobileno=?) and password=?",
        [req.body.emailid, req.body.emailid, req.body.pwd],
        function(err, result) {

            if (err) {
                return res.render("login_page", {
                    message: "Server Error"
                });
            }

            if (result.length == 1) {
            res.redirect('/admin/dashboard');

            } else {

                return res.render("login_page", {
                    message: "Invalid EmailID / Mobile No / Password"
                });

            }
        }
    );

});



module.exports = router;
