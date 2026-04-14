const dns = require("dns");
dns.setServers(["1.1.1.1", "0.0.0.0"]);

const mongoose = require('mongoose');

const initData = require('./data.js');

const listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://P-laxminarsimha:Pln%40102627@cluster0.mwiapbd.mongodb.net/?appName=Cluster0";

main()
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
     await listing.deleteMany({});
     initData.data = initData.data.map((obj) => ({...obj, owner : '69d6a0a392fcfbb6d2cd9310'}));
     await listing.insertMany(initData.data);
     console.log("data was initialized successfully");
};

initDB();
