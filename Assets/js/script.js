// Day of week, Month, Day of month in header 
let todayDate = $("#currentDay");
todayDate.text(dayjs().format('dddd, MMMM D'));

// Container for our calender content
let content = $("#myContent");

for (let i = 8; i < 19; i++) {
    var timeVar = i;
    var amPm = "AM";

    if (i > 11) {
        timeVar %= 12;
        timeVar = timeVar == 0 ? 12 : timeVar;
        amPm = "PM";
        console.log(timeVar);
    }
    console.log(timeVar);
    // Section
    let sectionDiv = $("<section>"); 
    sectionDiv.addClass("row time-block");
    // // Div for the hour of the day
    let hourDiv = $("<div>");
    hourDiv.addClass("hour col-2 col-md-1");
    hourDiv.text(timeVar + amPm);
    // // Textarea for the notes
    let notesArea = $("<textarea>");
    notesArea.addClass("col-8 col-md-10");
    notesArea.attr("type", "text");
    notesArea.attr("data-reference", timeVar);
    let currentHour = dayjs().format('H');
    if (i < currentHour) {
        notesArea.addClass("past");
    }
    else if (i == currentHour) {
        notesArea.addClass("present");
    }
    else {
        notesArea.addClass("future");
    }

    // if (i + 8)< HOUR
        // change background to grey
        
    // // Save button
    let saveDiv = $("<div>");
    saveDiv.addClass("saveBtn col-2 col-md-1");
    saveDiv.attr("data-reference", timeVar);

    // Append each part of the section to the section
    sectionDiv.append(hourDiv);
    sectionDiv.append(notesArea);
    sectionDiv.append(saveDiv);
    // Then append it to the content
    content.append(sectionDiv);
}
