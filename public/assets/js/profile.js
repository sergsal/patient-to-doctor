$(document).ready(function () {
	//converts time in db to a moment.js formatted time
	$(".availability-time").each(function (i) {
		var time = $(this).text();
		var timeFormatted = moment(time).format("dddd, MMMM Do YYYY, hh:mm a");
		$(this).html(timeFormatted)
	});


	function startChange() {
		var startDate = start.value(),
			endDate = end.value();

		if (startDate) {
			startDate = new Date(startDate);
			startDate.setDate(startDate.getDate());
			end.min(startDate);
		} else if (endDate) {
			start.max(new Date(endDate));
		} else {
			endDate = new Date();
			start.max(endDate);
			end.min(endDate);
		}
	}

	function endChange() {
		var endDate = end.value(),
			startDate = start.value();

		if (endDate) {
			endDate = new Date(endDate);
			endDate.setDate(endDate.getDate());
			start.max(endDate);
		} else if (startDate) {
			end.min(new Date(startDate));
		} else {
			endDate = new Date();
			start.max(endDate);
			end.min(endDate);
		}
	}

	var today = kendo.date.today();

	var start = $("#start").kendoDateTimePicker({
		value: today,
		change: startChange,
		parseFormats: ["MM/dd/yyyy"]
	}).data("kendoDateTimePicker");

	var end = $("#end").kendoDateTimePicker({
		value: null,
		change: endChange,
		parseFormats: ["MM/dd/yyyy"]
	}).data("kendoDateTimePicker");

	start.max(end.value());
	end.min(start.value());
});