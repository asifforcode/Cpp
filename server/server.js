const express = require('express');
const connectDB = require('./src/config/db');
const startGrpcServer = require('./src/controllers/grpcServer');
const questionRoutes = require('./src/routes/questionRoutes');
const cors=require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/api/v1', questionRoutes);
app.get('/',(req,res)=>{
  res.json({success: true,message: 'Server is Start'});
})

const startAllServers = async () => {
  try {
    await connectDB();
    startGrpcServer();
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`)
    });
    console.log("server is runing");
  } catch (error) {
    console.error('Error starting servers:', error);
    process.exit(1); 
};
}

startAllServers();
