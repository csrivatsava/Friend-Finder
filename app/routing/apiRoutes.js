var arrayFriends = require('../data/friends.js');


/**
 * Function to process the express get and POST requests
 * 
 * @param {any} app 
 */
module.exports = function (app) {

  app.get('/api/friends', function (req, res) {
    res.json(arrayFriends);
  });

  app.post('/api/friends', function (req, res) {
    console.log("req: " +JSON.stringify(req.body.scores))

    var diffArr = [];

    // Looping through all the friends list to find out the closest match.
    for (var i = 0; i < arrayFriends.length; i++) {

      var totalDiff = 0;      

      // Looping through the scores of each friend to find a cloest match.
      for (var j = 0; j < arrayFriends[i].scores.length; j++) {
        //Math.abs function returns a positive value
        totalDiff = totalDiff + Math.abs(parseInt(arrayFriends[i].scores[j]) - parseInt(req.body.scores[j]));

      }
      // closest match is pushed into an Array
      diffArr.push(totalDiff);

    }

    var smallestdiff = diffArr.indexOf(Math.min.apply(null, diffArr))
    arrayFriends.push(req.body);

    console.log({ name: arrayFriends[smallestdiff].name, photo: arrayFriends[smallestdiff].photo })
    res.json({ name: arrayFriends[smallestdiff].name, photo: arrayFriends[smallestdiff].photo });

  });

}