export const timeDifference = (date) => {
  const dateNow = Date.now();
  var difference = dateNow - date;

  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  var secondsDifference = Math.floor(difference / 1000);

  // console.log(
  //   "difference = " +
  //     daysDifference +
  //     " day/s " +
  //     hoursDifference +
  //     " hour/s " +
  //     minutesDifference +
  //     " minute/s " +
  //     secondsDifference +
  //     " second/s "
  // );
  if (daysDifference === 1) {
    return `Yesterday`;
  }
  if (daysDifference > 1) {
    return `${daysDifference} days ago`;
  }
  if (hoursDifference > 0) {
    return `${hoursDifference} hours ago`;
  }
  if (minutesDifference > 1) {
    return `${minutesDifference} minutes ago`;
  }
  return "Just now";
};
