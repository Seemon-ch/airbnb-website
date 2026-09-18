const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

main().then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/", (req,res)=>{
    res.send("WELCOME TO ROOT PAGE");
});

//testing schema
app.get("/testListing" , async (req,res)=>{
    let sampleListing = new Listing({
        title:"My new Vila",
        description:"near beach ",
        price:1200,
        location:"calangute,Goa",
        country:"India"
    });
    await sampleListing.save();
    console.log("saved sample");
    res.send("sucessful");
});

app.listen("8080",()=>{
    console.log("listening to port 8080");
});