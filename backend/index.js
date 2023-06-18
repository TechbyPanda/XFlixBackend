const app = require('./app');
const config = require('./config/config');
const mongoose = require('mongoose');

var backendServer = async () => {
    try{
        await mongoose.connect(config.mongoose.url);
        console.log("Database is connected");
        
        app.listen(config.port, () => console.log("App is running..."))
    }catch(error){
        console.log("Error connecting to database : ", error);
        process.exit(1);
    }
}

backendServer();