// Initialize Firebase
const config = {
  apiKey: "AIzaSyCuh8LmWDUI6tyuyU4qx2RXnTgRqwH-ll8",
  authDomain: "train-schedules-e7aef.firebaseapp.com",
  databaseURL: "https://train-schedules-e7aef.firebaseio.com",
  projectId: "train-schedules-e7aef",
  storageBucket: "",
  messagingSenderId: "762110917052"
};
firebase.initializeApp(config);
//Reference database
const database = firebase.database();
$("#submit").on("click", function (event) {
  //Prevents submit from refreshing page
  event.preventDefault();
  //Captures Name of Train
  let train = $("#train-name").val().trim();
  //Captures destination of train
  let destination = $("#destination").val().trim();
  //Captures time of first train
  let firstTime = $("#first-train-time").val().trim();
  //Captures frequency of train
  let frequency = $("#frequency").val().trim();
  //Temporary object for the data
  let trainData = {
    trainName: train,
    trainDestination: destination,
    firstTrain: firstTime,
    trainFrequency: frequency,
  };
  //Adding the data to firebase
  database.ref("/train-data").push(trainData);
  //Clears the texboxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train-time").val("");
  $("#frequency").val("");
});
/* Trying to loop through firebase with these 
let query = database.ref("train-data").orderByKey();
query.once("child_added").then
snapshot.forEach(function (childSnapshot) {
    let key = childSnapshot.key;
    let childData = childSnapshot.val();
/*Function that runs whenever database values change
and adds new table row with calculated data*/
//Also trying to add an interval to run the snapshot every minute
let snapshotInterval = setInterval(function () {
  $(".tables-body").empty();
      database.ref("/train-data").on("child_added", function(snapshot) {
          //Captures the snapshotted data in variables again
          let trainName = snapshot.val().trainName;
          let trainDestination = snapshot.val().trainDestination;
          let firstTrain = snapshot.val().firstTrain;
          let trainFrequency = snapshot.val().trainFrequency;
          //Converts the time so it comes before current time
          let timeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
          //Captures current time in a variable
          let currentTime = moment();
          //Calculates the difference between current time and first train time
          let timeDiff = currentTime.diff(moment(timeConverted), "minutes");
          //Calculates time between trains
          let tRemaining = timeDiff % trainFrequency;
          //Calculates minutes until next train
          let tMinutesTillTrain = trainFrequency - tRemaining;
          //Calculates time of next train
          let nextTrain = currentTime.add(tMinutesTillTrain, "minutes").format("hh:mm");
          //Creates the new table row for the calculated data
          let newRow = $("<tr>");
          let tName = $("<td>").text(trainName);
          tName.attr("scope", "row");
          let tDestination = $("<td>").text(trainDestination);
          let tFrequency = $("<td>").text(trainFrequency);
          let nextArrival = $("<td>").text(nextTrain);
          let minutesAway = $("<td>").text(tMinutesTillTrain);
          newRow.append(tName);
          newRow.append(tDestination);
          newRow.append(tFrequency);
          newRow.append(nextArrival);
          newRow.append(minutesAway);
          $(".tables-body").append(newRow);
        })
      }, 1000);