const express = require('express');
const app = express();
const server = require("http").createServer(app);

app.use(express.static(__dirname+"/assets"));

app.get('/',function (req,res) {
 res.sendFile(__dirname+'/views/index.html','utf8');
})

app.listen("3000",()=> {
  console.log("App listen at: http://localhost:3000")
})
