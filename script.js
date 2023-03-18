const container = $('.container');
const timeBlocks = $('.time-block');
const saveBtn = $('.saveBtn i');



const today = moment();
$('#currentDay').text(today.format("dddd, Do MMMM YYYY"));