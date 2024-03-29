const Product = require('../models/products');
const dotenv = require('dotenv');
const connectdatabase = require('../config/database');

const products = require('../data/product');

// setting dotenv file

dotenv.config({path:'backend/config/config1.env'});

connectdatabase();

const seedProducts = async () => {
    try{
     
        await Product.deleteMany();
        console.log('Products are deleted');
        await Product.insertMany(products)
        console.log ('All Products are added')
        process.exit()

    } catch(error){
        console.log(error.message);
        process.exit();
    }
} 

seedProducts();