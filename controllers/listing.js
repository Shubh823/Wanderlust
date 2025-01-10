const { model } = require("mongoose");
const Listing = require("../models/listing.js");


module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    let currUser=req.user || req.session.currUser;
    res.render("listings/index.ejs", { allListings,currUser });
   

}

module.exports.renderNewForm=(req, res) => {
    
    res.render("listings/new.ejs");

};

module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: 'reviews',
        populate: {
            path: 'author',
            model:'User'
        }
    })
    .populate('owner');
    if(!listing){
        req.flash("error","Cannot find that listing!");
         res.redirect("/listings");
    }
    let currUser=req.user || req.session.currUser;
    res.render("listings/show.ejs", { listing,currUser });

}

module.exports.creatListing=async (req, res, next) => {
   let url=req.file.path;
   let filename=req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.owner=req.user._id;
    newListing.image={url,filename};
   await newListing.save();
   req.flash("success","New Listing Created!");
   res.redirect("/listings");
}

module.exports.editListing=async (req, res) => {
   const { id } = req.params;
   const listing = await Listing.findById(id);
   if(!listing){
    req.flash("error","Listing you requested for, dose not exist");
    res.redirect("/listings");
   }
   
   let originalImageUrl=listing.image.url;
   originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250")
   res.render("listings/edit.ejs", { listing,originalImageUrl });
}

module.exports.updateListing=async (req, res) => {
    

    const { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true, runValidators: true });
    if(typeof req.file !=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }

     req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
 }

 module.exports.destroyListing=async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
 }

 module.exports.searchListing=async (req, res) => {
   
   try {
     const { query } = req.query;
     if (!query) {
       req.flash("error", "Please enter a search term.");
       return res.redirect("/listings");
     }
 
     // Perform a search in the database (e.g., by title or description)
     const listings = await Listing.find({
        $or: [
          { title: { $regex: query, $options: "i" } }, // String-based search
          { description: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } },
          { country: { $regex: query, $options: "i" } },
          // Numeric field search (only if the query is numeric)
          ...(isNaN(query) ? [] : [{ price: query }]),
        ],
      });
     
 
     res.render("listings/search.ejs", { listings, query });
   } catch (error) {
     console.error(error);
     req.flash("error", "An error occurred while searching.");
     res.redirect("/listings");
   }
 }