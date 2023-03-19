const timeBlocks = $('.time-block');
const saveBtn = $('.saveBtn i');


function localStorageEvent () {
    const savedEv = JSON.parse(localStorage.getItem('saved'));
    if (savedEv !== null) {
        timeBlocks.each(function() {
            const textInput = $(this).find('.textInput textarea');
            const selectedTime = parseInt($(this).attr('id'));
            for (var i=0; i < savedEv.length; i++) {
                if (savedEv[i].hour == selectedTime) {
                    textInput.val(savedEv[i].text);
                    break;
                }
            }
        });
    }
}

localStorageEvent();

const today = moment();
$('#currentDay').text(today.format('MMMM Do YYYY'));

// Check current time to see if event has past or is preceding 
function currentTime() {
    timeBlocks.each(function(){
        const textInput = $(this).attr(' textInput');
        const selectedTime = parseInt($(this).attr('id'));
        if(selectedTime === currentTime) {
         textInput.addClass('present');
        } else if(selectedTime < currentTime) {
         textInput.addClass('past');
        } else if (selectedTime > currentTime) {
         textInput.addClass('future');
        }
    })
}

currentTime();



$('.saveBtn').click(function() {
    localStorage.setItem('textInput', textInput);
    document.getElementById('textInput').innerHTML = localStorage.getItem('textInput');
}); 