//converts time in db to a moment.js formatted time
$(".availability-time").each(function(i) {
 var time = $(this).text();
 var timeFormatted = moment(time).format("dddd, MMMM Do YYYY, hh:mm a");
 $(this).html(timeFormatted)
});

$(document).ready(function () {
	// create DateTimePicker from input HTML element
	$(".datetimepicker").kendoDateTimePicker({
		value: new Date()
	});
});