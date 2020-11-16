const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
var jsmediatags = require("jsmediatags");
const testFolder = './Songs/';
const fs = require('fs');

const one = mongoClient.connect(function(err, client){

    const db = client.db("NodeDB");
    const collection = db.collection("works");
    fs.readdir(testFolder, (err, files) => {
      files.forEach(file => {
        console.log(testFolder + file);

        new jsmediatags.Reader(testFolder + file)
          .setTagsToRead(["title", "artist"])
          .read({
            onSuccess: function(tag) {
              let data = {title: tag.tags.title, artist: tag.tags.artist};

              collection.insertOne(data, function(err, result){

                  if(err){
                      return console.log(err);
                  }
                  console.log(result.ops);
                  client.close();
              });
              // console.log(tag.tags);
              //console.log("WORK");
            },
            onError: function(error) {
              console.log(':(', error.type, error.info);
              console.log("PROBLEMS");

            }
          });

      });

    })

    module.exports = {
      one:one
    }

});
