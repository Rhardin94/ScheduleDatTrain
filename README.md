# ScheduleDatTrain
## ScheduleDatTrain is a jQuery powered project that utilizes moment.js
* The user may submit a train schedule through the form on the bottom of the page,
    * The search parameters specifically consists of:
    1. Train Name
    2. Destination
    3. First Train Time (HH:mm in military time)
    4. Frequency (in minutes)
* After the users subits the search, jQuery captures the data within firebase and coverts in using moment.js to display in a new row within the table above the specific train that was searched for:
    * The table shows the convereted data as:
    1. Train Name
    2. Destination
    3. Frequency (min)
    4. Next Arrival
    5. How Many Minutes away (from the current time)