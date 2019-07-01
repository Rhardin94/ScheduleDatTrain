# ScheduleDatTrain
### Link to app found here: "https://rhardin94.github.io/ScheduleDatTrain/"
## Overview
ScheduleDatTrain is a jQuery app utilizing firebase to dynamically track user-created train schedules. The user is presented a simple layout that shows the current train schedules on the left side of the screen and a form to add new schedules on the right. To add a new schedule, the user may fill out the form with required information, then the algorithm in app.js with convert the time given until the next train (and dynamically update minutes remaining via firebase and moment.js).

## How to use

On first visiting the site, the user is presented with the single page app.

![homepage containing current train schedules and a form to add new ones](/assets/screenshots/home.jpg)

The user may view current schedules on the left hand side of the screen.

![current schedules table, listing each train's name, destination, frequency, next arrival, and minutes away](/assets/screenshots/current.jpg)

If the user wishes to add a new schedule, they may do so by filling out the required fields in the form on the right of the screen.

![Add new schedule form that requires name, destination, first train time, and frequency](/assets/screenshots/add.jpg)

Once the user has filled out each input field, they may hit the search button to retrieve the new schedule.

![filled out add new schedule form](/assets/screenshots/new.jpg)
![search button](/assets/screenshots/search.jpg)

After hitting the search button, the algorithm in app.js will actively populate the current schedules based on given information

![new schedule added to current schedules table](/assets/screenshots/added.jpg)

## Tech
* [Moment.js](https://momentjs.com/)
* [Firebase](https://firebase.google.com/?gclid=Cj0KCQjw3uboBRDCARIsAO2XcYAHXHyJ2OK79yAcdES-9rXxIyN6HvswNcnjW0TTWNzzKYCjax3_6bwaAmhPEALw_wcB)
* [jQuery](https://jquery.com/)