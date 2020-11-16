var jsmediatags = require("jsmediatags");
const testFolder = './Songs/';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(testFolder + file);

    new jsmediatags.Reader(testFolder + file)
      .setTagsToRead(["title", "artist"])
      .read({
        onSuccess: function(tag) {
          console.log(tag.tags.title);
          //console.log("WORK");
        },
        onError: function(error) {
          console.log(':(', error.type, error.info);
          console.log("PROBLEMS");

        }
      });

  });

})
