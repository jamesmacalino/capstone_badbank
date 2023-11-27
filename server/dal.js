require("dotenv").config();
const MongoClient = require('mongodb').MongoClient;
//const uri = process.env.react_app_MONGO_URI || 'mongodb://localhost:27017';
const uri="mongodb+srv://capstoneadmin:xttSOJU77BNVE8k2@capstonecluster1.qvldmd7.mongodb.net/?retryWrites=true&w=majority"
//const port=process.env.MONGO_PORT
let db = null;
 
// connect to mongo
MongoClient.connect(uri, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('capstonecluster1');
});

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// Login a user
async function login(email, password) {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const docs = await collection.find().toArray();
        const user = docs.find((user) => user.email == email);
        if (!user) {
            return false;
        }

        if (user.password == password) {
            return user;
        }

        return false;
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// function to adjust funds in an account
async function adjust(email, amount) {
    try {

        const collection = db.collection('users');
        const docs = await collection.find().toArray();
        const user = docs.find((user) => user.email == email);
        if (!user) {
            console.log("user not found");
            return null;
        }

        //convert amount from a string from the url to a number
        amount = Number(amount);
        // Calculate the new balance after the deposit
        const newBalance = user.balance + amount;

        // Update the user's balance in the collection
        await collection.updateOne(
            { email: user.email },
            { $set: { balance: newBalance } }
        );

        console.log(`Fund adjustment of ${amount} to ${user.email} completed.`);
        return "" + newBalance; //return a string instead of a number, numbers are error codes in "res.send"
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// function to get the balance for an account
async function balance(email) {
    try {

        const collection = db.collection('users');
        const docs = await collection.find().toArray();
        const user = docs.find((user) => user.email == email);
        if (!user) {
            console.log("user not found");
            return null;
        }

        console.log(`user.balance: ${user.balance}`);
        return "" + user.balance; //return a string instead of a number, numbers are error codes in "res.send"
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
};


module.exports = {create, find, login, update, balance, adjust, all};