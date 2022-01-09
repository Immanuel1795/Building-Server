import express from "express";
const router = express.Router();

import fs from 'fs';

const today = new Date();
const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var hours = today.getHours();
var minutes = today.getMinutes();
var ampm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12;
minutes = minutes < 10 ? '0'+minutes : minutes;
const time = hours + '.' + minutes + ampm;
const dateTime = new Date().toLocaleString() + ', '  + today.getTime();

router
  .route("/get-files")
  .get(async (request, response) => {

    fs.readdir("./fstaskfiles", function(err, files){
        response.send(files);
    })
 
 
  });

  router
  .route("/create-files")
  .post(async (request, response) => {

    fs.writeFile(`./fstaskfiles/${date}_${time}.txt`,dateTime, (err)=>{
        console.log("success")
    })
 
    response.send("File Created Successfully");
  });
  


  export const fstaskRouter = router;