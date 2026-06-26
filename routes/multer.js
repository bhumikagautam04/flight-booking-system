var multer =require('multer');
const {v4:uuidv4}=require('uuid');
var storage= multer.diskStorage({

     destination:function(req,file,path){
        path(null,'public/images')
     },
     filename:function(req,file,path){
        var filename =uuidv4()+file.originalname.substring(file.originalname.lastIndexOf('.'));
           path(null, filename);
     }
})
var upload=multer({storage:storage})

module.exports=upload;


