let container = $('.container');
let timeBlocks = $('.time-block');
let saveButton = $('.saveBtn i');


function localStorageEvents() {
  let savedEvent = JSON.parse(localStorage.getItem("saved"));
  if (savedEvent !== null) {
    timeBlocks.each(function() {
      let description = $(this).find('.description textarea');
      let selectedTime = parseInt($(this).attr("id"));
      for (let i = 0; i < savedEvent.length; i++) {
        if (savedEvent[i].hour == selectedTime) {
          description.val(savedEvent[i].text);
          break;
        }
      }
    });
  }
}

localStorageEvents();

// Using moment.js to get current day and hour
let today = moment();
$('#currentDay').text(today.format("dddd, Do MMMM YYYY"));


let currentTime = moment().hour();
timeBlocks.each(function() {
  let description = $(this).find('.description');
  let selectedTime = parseInt($(this).attr("id"));
  if (selectedTime === currentTime) {
    description.addClass("present");
  } else if (selectedTime < currentTime) {
    description.addClass("past");
  } else if (selectedTime > currentTime) {
    description.addClass("future");
  }
});

function saveEvent(event) {
    let description = $(event.target).closest('.time-block').find('.description textarea');
    let eventDescription = description.val();
    let hourEvent = $(event.target).closest('.time-block').attr("id");
    let savedEvent = JSON.parse(localStorage.getItem("saved")) || [];
    let saved = {
      hour: hourEvent,
      text: eventDescription
    };

    let index = savedEvent.findIndex(function(event) {
        return event.hour === saved.hour;
    });

    if (index >= 0) {
        savedEvent[index] = saved;
    } else {
        savedEvent.push(saved);
    }

    localStorage.setItem("saved", JSON.stringify(savedEvent));
}

container.on("click", ".saveBtn i", saveEvent);