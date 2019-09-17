var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
var Artifact = require('./data.js');

var firebaseConfig = {
    apiKey: "AIzaSyDlG7W2KW8AzVM-W5tOYlcrAiH9lDbzv1Y",
    authDomain: "it-project-2019sem2.firebaseapp.com",
    databaseURL: "https://it-project-2019sem2.firebaseio.com",
    projectId: "it-project-2019sem2",
    storageBucket: "",
    messagingSenderId: "240150750224",
    appId: "1:240150750224:web:b6b663108abd79251e1695"
};

// Endpoints
var ARTIFACTS = "/artifacts";
var COLLECTIONS = "/collections";
var COLLECTIONS_ARTIFACTS = "/collections-artifacts";
var COLLECTIONS_PERMISSIONS = "/collections-permissions";
var USERS = "/users";
var OWNERS_COLLECTIONS = "/owners-collections";

var test_artifact = {
  "name": "IMG123.jpg",
  "description": "Family portrait in front of the Louvre (photobombing pigeon in the background)",
  "ownerID": "abc123",
  "originDate": 1532084700,
  "originLocation": {
    "lat": 48.860809,
    "long": 2.336722
  },
  "knownLocation": {
    "lat": -82.468636,
    "long": -87.998860
  },
  "collectionID": 2019,
  "tags": {
    "photo": true,
    "Paris": true,
    "family": true
  }
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//
// Base level helper functions
//

function create(path, data) {
  var root_ref = database.ref(path);
  var item_ref = root_ref.push();
  var item_id = item_ref.key;
  console.log(item_id);

  return new Promise(function(resolve, reject) {
    item_ref.set(data, function(error) {
      if (error) {
        console.log("Error: " + error);
        reject(error);
      } else {
        // Data saved successfully!
        resolve(item_id);
      }
    });
  });
}

function update(path, data) {
  return new Promise(function(resolve, reject) {
    database.ref(path).update(data, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

function fetch(path) {
  return new Promise(function(resolve, reject) {
    database.ref(path).once('value').then(function(snapshot) {
      resolve(snapshot.val());
    });
  });
}


//
// Public functions
//

function add_new_artifact(json) {
  var artifact = Artifact.new(json);
  return new Promise(function(resolve, reject) {
      create(ARTIFACTS, artifact.to_firebase_JSON()).then(new_id => {
        artifact.update_id(new_id);
        resolve(artifact.to_JSON());
      });
  });
}

function update_artifact(json) {
  var artifact = Artifact.updated(json);
  return new Promise(function(resolve, reject) {
      update(ARTIFACTS + "/" + artifact.id, artifact.to_firebase_JSON()).then(did_update => {
        if (did_update) {
          resolve(artifact.to_JSON());
        }
        else {
          reject("Failed to update");
        }
      });
  });
}

function fetch_all_artifacts() {
  return new Promise(function(resolve, reject) {
      fetch(ARTIFACTS).then(artifacts_snapshot => {
        var artifact_jsons = [];
        for (var id in artifacts_snapshot) {
          artifact_jsons.push(Artifact.from_firebase_json(artifacts_snapshot[id], id).to_JSON());
        }
        resolve(artifact_jsons);
      });
  });
}

function fetch_artifact(id) {
  return new Promise(function(resolve, reject) {
      fetch(ARTIFACTS + "/" + id).then(snapshot_val => {
        var artifact = Artifact.from_firebase_json(snapshot_val, id);
        resolve(artifact.to_JSON());
      });
  });
}


//
// Exports
//

module.exports.add_new_artifact = add_new_artifact;
module.exports.update_artifact = update_artifact;
module.exports.fetch_artifact = fetch_artifact;
module.exports.fetch_all_artifacts = fetch_all_artifacts;