const mongoose = require('mongoose');

const connectdatabase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI )
      
    .then(con =>{
        console.log(`MongoDB database connnected with host:${con.connection.host}`)
    }).catch(err => {
        console.error(`Error connecting to MongoDB: ${err.message}`);
    });
    
    
}
  
module.exports = connectdatabase;