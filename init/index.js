const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");


main().then(()=>{
    console.log("connetion sucessfull");
}).catch((err)=>{
    console.log(err); 
})

async function main(){
    await mongoose.connect("mongodb://localhost:27017/wanderlust");
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"677a59600d8ad7ceb7807719"}));

  
    await Listing.insertMany(initData.data);
    console.log("data was initialized");

};

initDB();