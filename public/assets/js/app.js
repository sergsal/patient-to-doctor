//var timeStart = $("#availability-time-start").text();
//var timeEnd = $("#availability-time-end").text();
//var timeStartFormatted = moment(timeStart).format("dddd, MMMM Do YYYY, hh:mm a");
//var timeEndFormatted = moment(timeEnd).format("dddd, MMMM Do YYYY, hh:mm a");

//$("#availability-time-start").html(timeStartFormatted);
//$("#availability-time-end").html(timeEndFormatted)

$(".availability-time").each(function(i) {
 var time = $(this).text();
 var timeFormatted = moment(time).format("dddd, MMMM Do YYYY, hh:mm a");
 $(this).html(timeFormatted)
});

//$(".availability-time-end").each(function(i) {
// var timeEnd = $(this).text();
// console.log(timeEnd)
// var timeEndFormatted = moment(timeStart).format("dddd, MMMM Do YYYY, hh:mm a");
// $(this).html(timeEndFormatted)
//})