var EddystoneBeaconScanner = require("eddystone-beacon-scanner");
var admin = require("firebase-admin");
var moment = require("moment");

const gatewayName = process.env.DEVICE;

if (!gatewayName) {
  throw new Error("Gateway name was not defined.");
}

var serviceAccount = require("./serviceAccountKey.json");

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://beacon-monitoring.firebaseio.com"
});

const db = firebase.database();

const updateRemoteLog = ({ event, beacon }) => {
  db.ref("/" + gatewayName).set({
    distance: beacon.distance,
    status: event,
    timestamp: moment().toString()
  });

  console.log({ event, beacon });
};

EddystoneBeaconScanner.on("found", function(beacon) {
  updateRemoteLog({ event: "found", beacon });
});

EddystoneBeaconScanner.on("updated", function(beacon) {
  updateRemoteLog({ event: "updated", beacon });
});

EddystoneBeaconScanner.on("lost", function(beacon) {
  updateRemoteLog({ event: "lost", beacon });
});
