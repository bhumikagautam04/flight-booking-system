 
 function check_user(req){
 try {
    var admin= req && req.session ? req.session.user : undefined;
    console.log('userrrrr:',admin);
    if (admin == undefined){
      return false;
    }
    var data =JSON.parse(admin);
    if(data==null){
      return false
    }
    else{
    return data
    }
  }catch (e){

  return false
  }
}
module.exports={check_user};