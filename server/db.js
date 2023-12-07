const { MongoClient } = require('mongodb');
require('dotenv').config();

let db = null;

async function connectToMongo() {
    try {
        const client = await MongoClient.connect(process.env.REACT_APP_MONGO_URL, { useUnifiedTopology: true });
        console.log("Connected successfully to db server");
        return client.db('capstonecluster1');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

async function getDB() {
    if (!db) {
        db = await connectToMongo();
    }
    return db;
}

module.exports = { getDB };
