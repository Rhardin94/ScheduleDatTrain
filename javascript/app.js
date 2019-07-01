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
//On-click for adding a train schedule
$("#submit").on("click", function (event) {
  //Prevents submit from refreshing page
  event.preventDefault();
  //Captures Name of Train
  const train = $("#train-name").val().trim();
  //Captures destination of train
  const destination = $("#destination").val().trim();
  //Captures time of first train
  const firstTime = $("#first-train-time").val().trim();
  //Captures frequency of train
  const frequency = $("#frequency").val().trim();
  //Temporary object for the data
  const trainData = {
    trainName: train,
    trainDestination: destination,
    firstTrain: firstTime,
    trainFrequency: frequency,
  };
  //Validation to avoid empty train schedule
  if ((!trainData.trainName) || (!trainData.trainDestination) || (!trainData.firstTrain) || (!trainData.trainFrequency)) {
    $("label").append(" (You didn't fill in the required fields!)");
    setTimeout(() => {
      $("#name").text("Train Name");
      $("#tDestination").text("Destination");
      $("#time").text("First Train Time (HH:mm - military time)");
      $("#tFrequency").text("Train Frequency (min)")
    }, 3000);
    return false;
  } else {
  //Adding the data to firebase
  database.ref("/train-data").push(trainData);
  //Clears the texboxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train-time").val("");
  $("#frequency").val("");
  }
});
/* Trying to loop through firebase with these 
const query = database.ref("train-data").orderByKey();
query.once("child_added").then
snapshot.forEach(function (childSnapshot) {
    const key = childSnapshot.key;
    const childData = childSnapshot.val();
/*Function that runs whenever database values change
and adds new table row with calculated data*/
//Interval that runs every second checking for database changes, updates every minute as calculations change
const snapshotInterval = setInterval(function () {
  //Clears the table of duplicates before reappending them below each time the snapshot runs
  $(".tables-body").empty();
      /*Function that runs whenever database a child is added to train-data directory in firebase 
      and adds new table row with calculated data*/
      database.ref("/train-data").on("child_added", function(snapshot) {
          //Captures the snapshotted data in variables again
          const trainName = snapshot.val().trainName;
          const trainDestination = snapshot.val().trainDestination;
          const firstTrain = snapshot.val().firstTrain;
          const trainFrequency = snapshot.val().trainFrequency;
          //Converts the time so it comes before current time
          const timeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
          //Captures current time in a variable
          const currentTime = moment();
          //Calculates the difference between current time and first train time
          const timeDiff = currentTime.diff(moment(timeConverted), "minutes");
          //Calculates time between trains
          const tRemaining = timeDiff % trainFrequency;
          //Calculates minutes until next train
          const tMinutesTillTrain = trainFrequency - tRemaining;
          //Calculates time of next train
          const nextTrain = currentTime.add(tMinutesTillTrain, "minutes").format("hh:mm");
          //Creates the new table row for the calculated data
          const newRow = $("<tr>");
          //Creating table data with trainName variable
          const tName = $("<td>").text(trainName);
          //Attaching scope of "row" for bootstrap styling
          tName.attr("scope", "row");
          //Creates table data for trainDestination variable
          const tDestination = $("<td>").text(trainDestination);
          //Creates table data for trainFrequency variable
          const tFrequency = $("<td>").text(trainFrequency);
          //Creates table data for nextTrain variable
          const nextArrival = $("<td>").text(nextTrain);
          //Creates table data for tMinutesTillTrain variable
          const minutesAway = $("<td>").text(tMinutesTillTrain);
          //Appends the new <td> tags to the newRow variable
          newRow.append(tName);
          newRow.append(tDestination);
          newRow.append(tFrequency);
          newRow.append(nextArrival);
          newRow.append(minutesAway);
          //Appends the newRow with all the data inside to the table body.
          $(".tables-body").append(newRow);
        })
        //Runs the snapshot every second
      }, 1000);