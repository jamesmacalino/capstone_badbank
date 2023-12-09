const { MongoClient, ServerApiVersion } = require('mongodb');
const { getDB } = require('./db');
const uri = process.env.REACT_APP_MONGO_URL || 'mongodb://localhost:27017';
//const uri = "mongodb+srv://dbadmin:SSAthAb4eCd6QeBN@capstonecluster1.qvldmd7.mongodb.net/?retryWrites=true&w=majority";

// // connect to mongo
// MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, client) {
//     console.log("Connected successfully to db server");

//     try {
//         // connect to atlas capstonecluster1 database
//         db = client.db('capstonecluster1');
//     } catch (err) {
//         console.error('Error connecting to mongodb:', err);
//     }
// });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(url, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
//   async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);

// create user account
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = { name, email, password, balance: 0 };
        collection.insertOne(doc, { w: 1 }, function (err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}

async function connectToMongo() {
    db = await getDB();
}
connectToMongo(); // Establish the initial connection when the module is imported


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
        const user = await collection.findOne({ email: email });
        // const user = docs.find((user) => user.email == email);
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
function find(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
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
function update(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
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
function all() {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
};


module.exports = { create, find, login, update, balance, adjust, all };