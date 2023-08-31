const express = require('express');
const dotenv = require('dotenv').config({ path: 'backend/.env' });
const path = require('path');
const connectDb = require('./config/dbConnection')
const {errorHandler} = require(path.join(__dirname, './middleware/errorHandler.js'));
const contactRouter = require(path.join(__dirname, 'routes/contactRoutes.js'));
const userRouter = require(path.join(__dirname, 'routes/userRoutes.js'));

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts",contactRouter);
app.use("/api/users",userRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server running on port " + port);
});