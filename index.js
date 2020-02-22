/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const createEmployeeRecord = function(person) {
  return {
    firstName: person[0],
    familyName: person[1],
    title: person[2],
    payPerHour: person[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = function(peopleArray) {
  return peopleArray.map(person => createEmployeeRecord(person));
}

const createTimeEvent = function(dateStamp, type) {
  const dateHourSplit = dateStamp.split(" ");
  let date = dateHourSplit[0];
  let hour = parseInt(dateHourSplit[1],10);
  const timeEvent = {
    type: type,
    hour: hour,
    date: date
  };

  if (type == 'TimeIn') {
    this.timeInEvents.push(timeEvent);
  } else {
    this.timeOutEvents.push(timeEvent);
  };

  return this;
}

const createTimeInEvent = function(dateStamp) {
  return createTimeEvent.call(this, dateStamp, 'TimeIn');
}

const createTimeOutEvent = function(dateStamp) {
  return createTimeEvent.call(this, dateStamp, 'TimeOut');
}

const hoursWorkedOnDate = function(date) {
  const timeInEvent = this.timeInEvents.find(e => e.date == date);
  const timeOutEvent = this.timeOutEvents.find(e => e.date == date);
  let hours = (timeOutEvent.hour - timeInEvent.hour)/100;
  return hours;
}

const wagesEarnedOnDate = function( date) {
  const hours = hoursWorkedOnDate.call(this, date);
  const wages = hours * this.payPerHour;
  return wages;
}

const findEmployeeByFirstName = function(srcArray, firstName) {
  const employee = srcArray.find(person => person.firstName == firstName);//

  if (!employee) {
    return undefined;
  } else {
    return employee;
  }
}

const calculatePayroll = function(employeeRecords) {
  const payroll = employeeRecords.reduce((total, employee) => allWagesFor.call(employee) + total, 0);
  return payroll;
}
