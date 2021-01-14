/**
 * Add input data function, ask the data and use the check functions to validate. 
 * If the data is valid, call getNumberOfNotifications function to calculate 
 * the results
 */
function addInputData() {
  let firstLine, secondLine;

  let numberOfDays = 0,
    trailingDays = 0;

  let requestFirstLine = true,
    requestSecondLine = true;

  do {
    firstLine = prompt(
      "Enter two space-separated non-negative equal or greater than one integer numbers where the first number is the number of days and the second number is the number of trailing days (it must be less than the number of days)."
    );

    let firstLineChecked = checkFirstLine(firstLine);

    //If the size is incorrect
    if (!firstLineChecked[0]) {
      alert("You must enter two integer numbers in this request.");
    } else {
      //If the number are out of range.
      if (!firstLineChecked[1]) {
        alert(
          "You must enter an equal or greater than one integer number for the number of days and less or equal than 200000."
        );
      } else {
        if (!firstLineChecked[2]) {
          alert(
            "You must enter an equal or greater than one integer number for the second number (trailing days) and less or equal than the number of days."
          );
        } else {
          //If everything is okay, change requestSecondLine to break the do while and store the important data
          numberOfDays = getNumbers(firstLine)[0];
          trailingDays = getNumbers(firstLine)[1];
          requestFirstLine = false;
        }
      }
    }
  } while (requestFirstLine);

  do {
    secondLine = prompt(
      `Enter a list of size ${numberOfDays} non-negative space-separated integer numbers denoting customer expenditure`
    );
    let secondLineChecked = checkSecondLine(secondLine, numberOfDays);

    //If the size is incorrect
    if (!secondLineChecked[0]) {
      alert(`You must enter a ${numberOfDays} size list.`);
    } else {
      //If the numbers aren't integer
      if (!secondLineChecked[1]) {
        alert(`You must enter integer numbers.`);
      } else {
        //If the numbers are out of range.
        if (!secondLineChecked[2]) {
          alert(
            `You must enter non-negative and less than 200 integer numbers.`
          );
        } else {
          //If everything is okay, change requestSecondLine to break the do while
          requestSecondLine = false;
        }
      }
    }
  } while (requestSecondLine);

  //Call the function to calculate and show the result to the client
  getNumberOfNotifications(numberOfDays, trailingDays, getNumbers(secondLine));
}

/**
 * This function recieves the data to calculate the number of notifications
 * 
 * @param {Number} numberOfDays 
 * @param {Number} trailingDays 
 * @param {Array} expenditure 
 * 
 */
function getNumberOfNotifications(numberOfDays, trailingDays, expenditure) {
  //Declare the number of notifications
  let numberOfNotifications = 0;
  //Declare the number of times the for will iterate to get the data
  let numberOfTimes = numberOfDays - trailingDays;

  for (let i = 0; i < numberOfTimes; i++) {
    //Declare median and median x 2
    let median, medianMultiplied;

    //Get an array with the expenditure data based in the variable "trailingDays"
    let tempArrayTrailing = expenditure.slice(i, i + parseInt(trailingDays));
    tempArrayTrailing.sort();

    let count = parseInt(trailingDays);

    //If the number of trailing days is even
    if (parseInt(trailingDays) % 2 === 0) {
      median =
        (parseInt(tempArrayTrailing[count / 2 - 1]) + parseInt(tempArrayTrailing[count / 2])) / 2;
    } else {
      //If not
      median = parseInt(tempArrayTrailing[(count - 1) / 2]);
    }

    medianMultiplied = median * 2;

    //If the next day expenditure is bigger than the medianX2 add a notification
    if (medianMultiplied >= parseInt(expenditure[i + parseInt(trailingDays) + 1])) {
      numberOfNotifications++;
    }
  }
  alert(
    `The number of notifications with the nomber of days: ${numberOfDays}, number of trailing days: ${trailingDays} and the expenditure: ${expenditure} is ${numberOfNotifications}`
  );

  document.getElementById('output').innerHTML = numberOfNotifications;
}

/**
 * Recieves the first line String and check if the length of the data,
 * the number of days and the trailing days are correct
 * 
 * @param {String} firstLine String with the numbers
 * 
 * @returns {Array} Containing the validation data for the length, n and d.
 */
function checkFirstLine(firstLine) {
  let lengthConfirm, nConfirm, dConfirm;

  let firstLineDataSeparated = getNumbers(firstLine);

  if (firstLineDataSeparated.length != 2) {
    lengthConfirm = false;
    nConfirm = false;
    dConfirm = false;
    return [lengthConfirm, nConfirm, dConfirm];
  } else {
    lengthConfirm = true;
  }

  let n = firstLineDataSeparated[0];
  let d = firstLineDataSeparated[1];

  if (isInteger(n) && n <= 200000 && n > 0) nConfirm = true;
  else nConfirm = false;

  if (isInteger(d) && d <= n && d > 0) dConfirm = true;
  else dConfirm = false;

  return [lengthConfirm, nConfirm, dConfirm];
}

/**
 * Recieves the second line String and check if the length of the data,
 * the format (integer) and the range are corrext
 * 
 * @param {String} secondLine String with the numbers
 * @param {Number} numberOfDays Integer with the number of days
 * 
 * @returns {Array} Containing the validation data for the length, n and d.
 */
function checkSecondLine(secondLine, numberOfDays) {
  let lengthConfirm = false,
    integerConfirm = false,
    rangeConfirm = false;

  let secondLineDataSeparated = getNumbers(secondLine);

  if (secondLineDataSeparated.length != numberOfDays) lengthConfirm = false;
  else lengthConfirm = true;

  for (let number in secondLineDataSeparated) {
    if (!isInteger(secondLineDataSeparated[number])) {
      integerConfirm = false;
      return [lengthConfirm, integerConfirm, rangeConfirm];
    } else integerConfirm = true;

    if (
      secondLineDataSeparated[number] < 0 ||
      secondLineDataSeparated[number] > 200
    ) {
      rangeConfirm = false;
      return [lengthConfirm, integerConfirm, rangeConfirm];
    } else rangeConfirm = true;
  }

  return [lengthConfirm, integerConfirm, rangeConfirm];
}

/**
 * Recieves an String of numbers space-separated and return an array with the numbers
 * 
 * @param {String} input String of numbers
 * 
 * @returns {Array} Containing the numbers in the array.
 */
function getNumbers(input) {
  return input.split(/(\s)/).filter((e) => e.trim().length > 0);
}

/**
 * Recieves an String of numbers space-separated and return an array with the numbers
 * 
 * @param {Number} number Number to check if it's an integer
 * 
 * @returns {Boolean}
 */
function isInteger(number) {
  return /^-?\d+$/.test(number);
}

addInputData();
