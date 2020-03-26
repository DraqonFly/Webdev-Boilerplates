
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router({ caseSensitive: true, strict: true });
const api = express();
const path = require('path');
api.use(express.static(path.join(__dirname, '/public/html')));

// define port, database-Name and collection-Name
const port_db = 27017;
const database = "DraqonStack";
const collectionName = "service"

// construct a Schema to pull from collection
const collectionSchema = new mongoose.Schema({ _id: String, version: String, bit: String, debug: String, engine: String, ok: String });

// create collection out of schema, and collection-Name
const collection = mongoose.model('Info', collectionSchema, collectionName);

router.get('/', (req, res) => res.sendFile('/Users/Draqon/Development/boilerplates/draqon-stack/api/public/html/mongoDB_status.html'))

// Update Database-Collection
router.get('/update', (req, res, next) => {
    mongoose.connect('mongodb://localhost:' + port_db + '/' + database, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        var admin = new mongoose.mongo.Admin(mongoose.connection.db);
        admin.buildInfo(function (err, mongobuild) {

            const info = [];

            info.push({ _id: "info_0" }, { version: "mongoDB version: " + mongobuild.version });


            collection.updateOne(info[0], { version: info[1].version, new: " hi" }, function (err, data) {
                if (err) return console.error(err);
                collection.find({}, function (err, data) {
                    if (err) return console.error(err);
                    res.send(data);

                })
            })
        })
    })
})


// Insert One Into Database-Collection
router.get('/insert', (req, res, next) => {
    mongoose.connect('mongodb://localhost:' + port_db + '/' + database, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        var admin = new mongoose.mongo.Admin(mongoose.connection.db);
        admin.buildInfo(function (err, mongobuild) {

            var collection_object = new collection({ _id: "info_4", ok: mongobuild.ok === 1 ? "mongoDB is OK" : "mongoDB is not OK" });
            collection_object.save(function (err, collection_object) {
                if (err) return console.error(err);
                collection.find({}, function (err, data) {
                    if (err) return console.error(err);
                    res.send(data);
                })
            });


        })
    })
})


module.exports = router;
