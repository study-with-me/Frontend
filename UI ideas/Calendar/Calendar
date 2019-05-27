import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";

const weekdays = moment.weekdaysShort();
const months = moment.months();

let numDays = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

let getDay = (year, month, day) => {
  return new Date(year, month, day).getDay();
};

let makeMonth = (year, month) => {
  let days = [];
  const firstDay = getDay(year, month, 1);
  const lastDays =
    month !== 11 ? numDays(year, month - 1) : numDays(year - 1, 11);
  for (let i = 0; i < firstDay; i++) {
    days.push(lastDays - (firstDay - i) + 1);
  }
  for (let i = 0; i < numDays(year, month); i++) {
    days.push(i + 1);
  }
  return days;
};

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: 2019,
      currentMonth: 5
    };
  }
  nextMonth() {
    if (this.state.currentMonth === 11) {
      this.setState({
        currentMonth: 0,
        currentYear: this.state.currentYear + 1
      });
    } else {
      this.setState({ currentMonth: this.state.currentMonth + 1 });
    }
  }
  prevMonth() {
    if (this.state.currentMonth === 0) {
      this.setState({
        currentMonth: 11,
        currentYear: this.state.currentYear - 1
      });
    } else {
      this.setState({ currentMonth: this.state.currentMonth - 1 });
    }
  }
  render() {
    let days = makeMonth(this.state.currentYear, this.state.currentMonth);
    return (
      <React.Fragment>
        <h1> Calendar </h1>
        <div className="month-container">
          <i className="fa fa-arrow-left" onClick={() => this.prevMonth()} />
          <h3>{months[this.state.currentMonth]} {this.state.currentYear}</h3>
          <i className="fa fa-arrow-right" onClick={() => this.nextMonth()} />
        </div>
        <div className="weekdays">
          {weekdays.map(weekday => (
            <div key={weekday}>{weekday}</div>
          ))}
        </div>
        <div class="grid">
          {days.map(day => (
            <div>{day}</div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
