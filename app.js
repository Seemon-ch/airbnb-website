const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require("path");

main().then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.set("view engine" ,"ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.send("WELCOME TO ROOT PAGE");
});

//index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render(("listings/index"), { allListings });
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});
//create route 
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//show route 
app.get("/listings/:id" ,async (req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show",{listing});
})
//testing schema
// app.get("/testListing" , async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My new Vila",
//         description:"near beach ",
//         price:1200,
//         location:"calangute,Goa",
//         country:"India"
//     });
//     await sampleListing.save();
//     console.log("saved sample");
//     res.send("sucessful");
// });

app.listen("8080",()=>{
    console.log("listening to port 8080");
});