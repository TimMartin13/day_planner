// Day of week, Month, Day of month in header 
let todayDate = $("#currentDay");
todayDate.text(dayjs().format('dddd, MMMM D'));

// Container for our calender content
let content = $("#myContent");

// Start and end time in military hours
var startTime = 8;  // 8AM
var endTime = 19;   // 7PM

function pastPresentFuture (scheduleHour) {
    let currentHour = dayjs().format('H');
    if (scheduleHour < currentHour) {
        return "past";
    }
    else if (scheduleHour == currentHour) {
        return "present";
    }
    else {
        return "future";
    }
}

function populateCalendar() {
    for (let i = startTime; i < endTime; i++) {
        // Section
        let sectionDiv = $("<section>"); 
        sectionDiv.addClass("row time-block");
        // // Div for the hour of the day
        let hourDiv = $("<div>");
        hourDiv.addClass("hour col-2 col-md-1");

        var timeVar = i % 12;
        timeVar = ((i % 12) == 0 ? 12 : timeVar);
        hourDiv.text(timeVar + (i > 11 ? "PM" : "AM"));
        // hourDiv.text(timeVar + amPm);
        // // Textarea for the notes
        let notesArea = $("<textarea>");
        notesArea.addClass("col-8 col-md-10");
        notesArea.attr("type", "text");
        notesArea.attr("data-reference", i);
        notesArea.addClass(pastPresentFuture(i));
                    
        // // Save button
        let saveDiv = $("<div>");
        saveDiv.addClass("saveBtn col-2 col-md-1");
        saveDiv.attr("data-reference", i);
        
        let imgDiv = $("<img>");
        imgDiv.attr("src", "./Assets/images/saveButton.png");
    
        // Append each part of the section to the section
        saveDiv.append(imgDiv);
        sectionDiv.append(hourDiv);
        sectionDiv.append(notesArea);
        sectionDiv.append(saveDiv);
        // Then append it to the content
        content.append(sectionDiv);
        
    }
}

function addAppointments() {

    // get all the text areas
    var allTextAreas = $("textarea");
    // For each one, get the corresponding local storage data
    for (let i = 0; i < allTextAreas.length; i++) {
         var temp = JSON.parse(localStorage.getItem("Hour" + allTextAreas[i].dataset.reference));
         if (temp != null) {
            // if there is data, write it to the textarea 
            allTextAreas[i].value = temp;
         }
         
    }
}
populateCalendar();
addAppointments();

$(".saveBtn").on("click", function() {
    // Figure out which save button is being pressed
    var refData = ($(this).attr("data-reference"));

    // Grab all of the textareas
    var allTextAreas = $("textarea");
    
    // Find the one that matches the save button clicked
    for (let i = 0; i < allTextAreas.length; i++) {
        if(allTextAreas[i].dataset.reference === refData) {
            // Write the value of the text to local storage
            
            localStorage.setItem("Hour" + allTextAreas[i].dataset.reference, JSON.stringify(allTextAreas[i].value));
        }
    }  
})
