export function callCalendar(data) {
  if (!Array.isArray(data) || data == undefined) {
    return [];
  }

  // Get current date
  let currentDate = new Date();
  // Get the first day of the current month
  let firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );
  // Get the last day of the current month
  let lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
  );

  // Filter dates in the current month
  let datesInCurrentMonth = data.filter((dateObj) => {
    let date = dateObj.date.toDate(); // Convert Firestore Timestamp to JavaScript Date object
    return date >= firstDayOfMonth && date <= lastDayOfMonth;
  });

  // Extract the dates from date objects
  // let resultDates = datesInCurrentMonth.map(dateObj => dateObj.date.toDate());
  let resultDates = datesInCurrentMonth.map((dateObj) => {
    let currDate = dateObj.date.toDate();
    let date = currDate.getDate().toString().padStart(2, "0");
    let month = (currDate.getMonth() + 1).toString().padStart(2, "0");
    let year = currDate.getFullYear();
    //console.log(`${year}-${month}-${date}`);

    //return event object as specified by FullCalendar
    return {
      title: "\u2B50",
      start: `${year}-${month}-${date}`,
    };
  });

  // Return the array of event objects
  return resultDates;
}

export function getTodayMealData(mealRecords) {
  if (mealRecords == undefined) {
    return [0,0,0,0];
  }
  // Get today's date
  let today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

  // Initialize variables to store sums
  let calories = 0;
  let carbohydrates = 0;
  let fat = 0;
  let protein = 0;

  // Iterate over mealRecords array
  mealRecords.forEach((record) => {
    // Convert date to JavaScript Date object
    let recordDate = record.date.toDate(); // Assuming date is a Firestore Timestamp

    // Check if the record's date matches today's date
    if (recordDate.toDateString() === today.toDateString()) {
      // Add the values to the sums
      calories += record.calories;
      carbohydrates += record.carbohydrates;
      fat += record.fat;
      protein += record.protein;
    }
  });

  // Return an object containing the sums for today
  return [parseFloat(calories.toFixed(1)), parseFloat(carbohydrates.toFixed(1)), parseFloat(protein.toFixed(1)), parseFloat(fat.toFixed(1))];
}

export function getLastEntryBeforeMonday(data) {
  if (!data || data.length === 0) {
    return null; // Return null if data is empty or undefined
  }

  let currentDate = new Date();
  let monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Monday of the current week

  let lastEntry = null;

  // Iterate through data to find the last entry before Monday
  for (let i = data.length - 1; i >= 0; i--) {
    let entryDate = new Date(data[i].date.toDate()); // Convert Firestore Timestamp to JavaScript Date object
    if (entryDate < monday) {
      lastEntry = data[i];
      break;
    }
  }

  return lastEntry ? lastEntry.weight : null; // Return weight if last entry found, else return null
}