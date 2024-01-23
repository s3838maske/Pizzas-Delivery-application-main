// db.js
const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        const dbUrl = process.env.DB_URL || "mongodb+srv://Shubhamdb:SDawM6vJsg3b2bGo@cluster0.4qdffol.mongodb.net/SM-Pizza";
        // Replace 'yourDatabaseName' with the actual name of your database
        mongoose.set("strictQuery", false);

        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
       
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Could not connect to MongoDB:', error.message);
    }
};

module.exports = connectToDatabase;

