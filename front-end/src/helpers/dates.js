export const dateHelpers = {
    formatDate,

    daysAgo,
};

//used to format date to more readable format
function formatDate(dateData) {
  var date = new Date(dateData);
  return date.toDateString();
}

//Used to calculate difference between date and todays date in days
function daysAgo(dateData) {
  var date1 = new Date(dateData);
  var todays = new Date();

  var result = Math.round(Math.abs((date1 - todays) / (24 * 60 * 60 * 1000)));
  if (result == 0) {
    return "Today";
  } else {
    return result;
  }
}
