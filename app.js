const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const userRoutes=require('./routes/userRoutes')
const resetRoutes = require('./routes/resetRoutes')

//add middleware
app.use(bodyParser.json())
app.use(cors());

app.use('/api/users',userRoutes);
app.use('/api/users',resetRoutes);

module.exports =app;