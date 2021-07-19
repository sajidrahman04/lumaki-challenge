const mongoose = require('mongoose');

const uri = process.env.DATABASE || "//localhost:27017/lumaki-challenge";

mongoose.connect(uri, 
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
connection.on('reconnected', () => {
  console.log('Mongo has reconnected')
})
connection.on('error', error => {
  console.log('Mongo connection has an error', error)
  mongoose.disconnect()
})
connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
})
