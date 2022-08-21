const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){

  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  console.log(req.body.CityName);
  const query=req.body.CityName;
  const unit="metric";
  const apikey="a3cc3c30d60aace2fd9510429fe28275";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+ apikey;
  https.get(url, function(response) {
    console.log('status code:', response.statusCode);
    // console.log(response);
    response.on("data", function(data) {
      const weatherreport = JSON.parse(data);
      // console.log(weatherreport);
      console.log("temp: ", weatherreport.main.temp);
      console.log("description: ", weatherreport.weather[0].description);
      const icon = weatherreport.weather[0].icon
      console.log("icon");
      const iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p1>The weather report of " + query + " is " + weatherreport.weather[0].description + "</p1>");
      res.write("<h1>Temperature in " + query + " is " + weatherreport.main.temp + " degree celcius</h1>");
      res.write("<img src=" + iconurl + ">");
      res.send();
    });

  });
})









app.listen(3000, function() {
  console.log("server is running on server 3000");
});
