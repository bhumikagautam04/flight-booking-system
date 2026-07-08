var express = require('express');
var pool = require('./pool');
var router =express.Router();
var upload=require('./multer');
const {check_user} = require('./checkuser');
var {LocalStorage} =require('node-localstorage');
var localStorage = new LocalStorage('./scratch');

router.get('/flight_interface', function(req,res,next){
      var admin = check_user(localStorage);
      if(admin){
        res.render('flight_interface',{message:""});
      } else {
        res.redirect('/admin/login_page');
      }
});

router.get("/fetch_all_city", function(req,res){

    pool.query("select * from city", function(err,result){
        if(err)
        {
            res.json({status:false, message:err});
    }
    else{
        res.json({status:true, data:result});
    }
    })
})
router.post("/submit_flight_information", upload.single('picture'), function(req,res){
        var days = req.body.days ? req.body.days.join(',') : '';
        var logo = req.file ? req.file.filename : '';

    pool.query("insert into flight(flight_name, flight_type, flight_seat,days, source_city, departure_time, destination_city, arrival_time, company,logo) values(?,?,?,?,?,?,?,?,?,?)", 
    [req.body.flightname, req.body.flighttype, req.body.flightseats, days, req.body.sourcecity, req.body.departuretime, req.body.destinationcity, req.body.arrivaltime, req.body.company, logo],
    function(err,result){
        if(err){
             console.log(err);
            console.log("Days:", req.body.days);
            console.log("Joined Days:", days);
            console.log("File:", req.file);
            res.json({status:false, message:"sql Error"});
        } else {
            res.json({status:true, message:"Flight added successfully"});
        }
    });
})
router.get("/fetch_all_flight",function(req,res){
      var admin = check_user(localStorage);
        if(!admin){
            return res.redirect('/admin/login_page');
        }

    pool.query("select * from flight", function(err,result){
        if(err){
            res.render('DisplayFlight',{status:false, data:[],admin:admin});
        } else {
            res.render('DisplayFlight',{status:true, data:result,admin:admin});
        }
    })
})
router.get('/edit_delete/:flight_id',function(req,res){
      var admin = check_user(localStorage);
      if(!admin){
        return res.redirect('/admin/login_page');
      }
   pool.query("select * from flight where flight_id=?",[req.params.flight_id],function(err,result){
     if(err)
     {
        
        res.render('edit_delete', {status:false, data :[], admin:admin});
     }
     else{
        res.render("edit_delete", {status:true , data:result[0], admin:admin});
     }
   })
})

router.post("/flight_edit_delete",function(req,res){
    var btn_value=req.body.btn
 if(btn_value=="Edit")
 {
    pool.query("update flight set flight_name=?, flight_type=?, flight_seat=?, source_city=?, departure_time=?, destination_city=?, arrival_time=?, company=? where flight_id=?",[req.body.flightname, req.body.flighttype, req.body.flightseats, req.body.sourcecity, req.body.departuretime, req.body.destinationcity, req.body.arrivaltime, req.body.company,req.body.flight_id],
    function(err,result){
    if(err)
    {
        res.redirect('/flight/fetch_all_flight');
    }
     else
    {
        res.redirect('/flight/fetch_all_flight');
    }
 })  
}

else{
    pool.query("delete from flight where flight_id=?",[req.body.flight_id],function(err,result){
        if(err)
         {
        res.redirect('/flight/fetch_all_flight');
    }
     else
    {
        res.redirect('/flight/fetch_all_flight');
    }
    })
}
})

router.get("/show_picture/:id/:name/:picture", function(req,res){
    res.render("show_picture_edit", {data:req.params})
})

router.post("/final_picture_edit",upload.single("picture"),function(req,res){

    if(!req.file){
        return res.redirect("/flight/fetch_all_flight");
    }
    pool.query("update flight set logo=? where flight_id=?",[req.file.filename,req.body.flight_id],function(err,result){
       
        if(err)
        {
            res.redirect('/flight/fetch_all_flight')
        }
        else{
            res.redirect('/flight/fetch_all_flight')
        }
    })
})
router.get("/search_by_id",function(req,res){
      var admin = check_user(localStorage);
      if(admin){
    res.render("search_by_id",{message:" "});
      } else {
        res.redirect('/admin/login_page');
      }
})

 router.post('/fetch_by_id', function(req,res){
   var flightId = req.body.flight_id || req.body.flightid;

   pool.query("select * from flight where flight_id=?",[flightId],function(err,result){
        if(err)
        {
            res.render('edit_delete', {status:false,data:[],message:'server error'});
        }
        else
        {
            if(result.length==1)
            {
                res.render('edit_delete', {status:true,data:result[0],message:" "});
            }
            else{
                res.render('search_by_id',{message:'Flight ID does not exist', flight_id:flightId})
            }
        }
    })
})

module.exports = router;
