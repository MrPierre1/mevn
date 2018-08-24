// import { func } from "../../../Library/Caches/typescript/2.6/node_modules/@types/joi";

var bcrypt = require("bcrypt");

var hash1;
var pass = "test1";

var ha2 = bcrypt.hash(pass, 10, function(err,hash){
    console.log("errors", err, 'hash', hash);
});

// varbcrypt
//   .compareSync(pass, ha2, function(err, result){
//       console.log("errrs", err, "bcrypt errr", result);
//   });
console.log(pass, ha2);
  bcrypt.compare(pass, ha2, function(err,res){
     console.log('erroors', err, 'result', res);
 }) 
