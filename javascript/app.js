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
$("#submit").on("click", function() {
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
        firstTrain: timeConverted,
        trainFrequency: frequency,
        currentTime: currentTime,
        timeDifference: timeDiff,
        timeBetween: tRemaining,
        minutesLeft: tMinutesTillTrain,
        nextTrain: nextTrain,
    })
})