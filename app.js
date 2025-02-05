const express =require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
const query=req.body.cityName;
const apiKey="bf4f1cffbb6c6fed5c5d99aec418bb81";
const unit="metric";

const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit; 
https.get(url,function(response){
    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const description=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const imageURL="https://openweathermap.org/img/wn/"+icon+ "@2x.png";

        res.write("<h1>The weather in "+query+" is "+ temp +" celcius degrees</h1>");
        res.write("<p>The weather is currently:" + description + "</p>");
        res.write("<img src="+imageURL+">");
        res.send();
    })
});

})

app.listen(3000,function(){
    console.log("server is running on port 3000");
})