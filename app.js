if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore  =require("connect-mongo");
const flash = require("connect-flash");
const Listing = require("./models/listing.js");
require('./passport');
require('./main.js');
const passport = require("passport"); 
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");


const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const dburl=process.env.ATLASDB_URL;
main().then(() => {
    console.log("connetion sucessfull");
}).catch((err) => {
    console.log(err);
})



async function main() {
    await mongoose.connect(dburl);
}

const store=MongoStore.create({
    mongoUrl:dburl,
    touchAfter:24*60*60,
    crypto:{
        secret:process.env.SECRET,
    },
});
store.on("error",function(e){
    console.log("session store error",e);
})

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}





app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize()); 
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
const authRoutes = require('./routes/auth');


// main route
app.get("/", (req, res) => {
    res.redirect("/listings");
})

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

// app.get("/demousers",async (req,res)=>{
//     let fakeUser=new User({
//         email:"shubham@123",
//         username:"shubham",
//     });
 
//     let newUser=await User.register(fakeUser,"password");
//     res.send(newUser);
// });

app.use(authRoutes);

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/",userRouter);
app.get("/listings/category/:category", async (req, res) => {
    try {
        console.log("Category:", req.params.category);
        const { category } = req.params;
        const listings = await Listing.find({ category: category });
        res.json(listings);  // Return filtered listings as JSON
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ error: 'Unable to fetch listings' });
    }
});



 
app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });
    // res.status(statusCode).send(message);
});

// app.get("/testListing",async (req,res)=>{
//     res.send("hii i am test");
//     let sampleListing=new Listing({
//         title:"Best Villa",
//         description:"It is best villa located in ghats of america and india",
//         price:100,
//         location:"maharashtra,india",

//     });
//     await sampleListing.save();
//     console.log("sample was saved"); 
// });

app.listen(8080, (req, res) => {
    console.log("server is on");
});


