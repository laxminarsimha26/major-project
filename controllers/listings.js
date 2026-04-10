const listings = require("../models/listing.js");
const geocode = require("../utils/geocode");

module.exports.index = async (req, res, next) => {
    const allListings = await listings.find({});
    res.render("listings/index.ejs", {allListings})
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
    };

    module.exports.showListing = async (req, res) => {
      let { id } = req.params;
      const listing = await listings.findById(id).populate({path: "reviews", populate:{path: "author"}}).populate("owner");
      if(!listing){
            req.flash("error", "Cannot find that listing!");
            return res.redirect("/listings");
        }
      res.render("listings/show", { listing });
    };

    module.exports.createListing = async (req, res, next) => {
        let url = req.file.path;
        let filename = req.file.filename;

       const newListing = new listings(req.body.listing);
       newListing.owner = req.user._id;
       newListing.image = {url, filename};
       // 🔥 Convert location → coordinates
    const coords = await geocode(req.body.listing.location);

    newListing.geometry = {
        type: "Point",
        coordinates: coords
    };
        await newListing.save();
        req.flash("success", "Successfully made a new listing!");
        res.redirect("/listings"); 
    };

    module.exports.renderEditForm = async (req, res) => {
         let { id } = req.params;
      const listing = await listings.findById(id);
        if(!listing){   
            req.flash("error", "Cannot find that listing!");
            return res.redirect("/listings");
        }

        let originalImageUrl = listing.image.url;
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
      res.render("listings/edit", { listing, originalImageUrl });
    };
    
    module.exports.updateListing = async (req, res) => {    
        let { id } = req.params;
        let listing = await listings.findByIdAndUpdate(id, { ...req.body.listing });

        if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
        }
        req.flash("success", "Successfully updated the listing!");
        res.redirect(`/listings/${id}`);
    };

    module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await listings.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted the listing!");
    res.redirect("/listings");
};