const config=require('./utils/config');
const mongoose=require('mongoose');
const app=require('./app');

console.log("connecting to MongoDB")
//connect with DB
mongoose.connect(config.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
        app.listen(config.PORT,() =>{
            console.log(`Server running on PORT ${config.PORT}`);
        });
    })
    .catch((error)=>{
        console.log('Error connecting to MongoDB', error);
    });

