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
    let train = $("#train-name").val();
    //Captures destination of train
    let destination = $("#destination").val();
    //Captures time of first train
    let time = $("#first-train-time").val();
    //Captures frequency of train
    let frequency = $("#frequency").val();
    //Converts the time so it comes before current time
    let timeConverted = moment(time, "HH:mm").subtract(1, "years");
    //Captures the current time
    let currentTime = moment().format("hh:mm");
    //Calculates the difference between current time and first train time
    let timeDiff = moment().diff(moment(timeConverted), "minutes");
    //Calculates time between trains
    let tRemaining = timeDiff % frequency;
    //Calculates minutes until next train
    let tMinutesTillTrain = frequency - tRemaining;
    //Calculates time of next train
    let nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    //Adding the data to firebase
    database.ref("/train-data").push({
        trainName: train,
        trainDestination: destination,
        firstTrain: time,
        trainFrequency: frequency,
        currentTime: currentTime,
        timeDifference: timeDiff,
        timeBetween: tRemaining,
        minutesLeft: tMinutesTillTrain,
        nextTrain: nextTrain,
    })
    //Clears the texboxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
});
/*Function that runs whenever database values change
and adds new table row with calculated data*/
database.ref("/train-data").on("child_added", function (update) {
    let newRow = $("<tr>");
    let tName = $("<td>").text(update.val().trainName);
    tName.attr("scope", "row");
    let tDestination = $("<td>").text(update.val().trainDestination);
    let tFrequency = $("<td>").text(update.val().trainFrequency);
    let nextArrival = $("<td>").text(update.val().nextTrain);
    let minutesAway = $("<td>").text(update.val().minutesLeft);
    newRow.append(tName);
    newRow.append(tDestination);
    newRow.append(tFrequency);
    newRow.append(nextArrival);
    newRow.append(minutesAway);
    $(".tables-body").append(newRow);
    if (update.val().currentTime > update.val().nextArrival) {
        $(".tables-body").empty();
    }
});