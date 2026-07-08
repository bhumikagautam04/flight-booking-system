 var jwt =require('jsonwebtoken');


 function verify_token(token){
 if(!token){
  return false;
 }
 try {
  var user = jwt.verify(token, 'BHUMIKA');
  console.log('user',user);
  return user;

 } catch (error) {
  return false;
 }
}
module.exports = verify_token;