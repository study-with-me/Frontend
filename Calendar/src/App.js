import React, { Component, Fragment, useEffect } from "react";
// import ReactDOM from "react-dom";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";

const weekdays = moment.weekdaysShort();
const months = moment.months();

let monthLength = (year, month) => new Date(year, month + 1, 0).getDate();
let dayOfWeek = (year, month, day) => new Date(year, month, day).getDay();
let range = (n = 0, f = i => i) =>
  Array(n)
    .fill()
    .map((_, i) => f(i));

let fromDate = d => ({
  currentMonth: d.getMonth(),
  currentYear: d.getFullYear()
});
let toDate = ({ currentYear, currentMonth }) => {
  let d = new Date();
  d.setFullYear(currentYear);
  d.setMonth(currentMonth);
  return d;
};

let Day = (type, date) => ({ type, date });

let makeMonth = (year, month) => {
  const currLength = monthLength(year, month);
  const prevLength =
    month > 0 ? monthLength(year, month - 1) : monthLength(year - 1, 11);

  const firstDayOfWeek = dayOfWeek(year, month, 1);
  const lastMonthOffset = prevLength - firstDayOfWeek;

  let prevDays = range(firstDayOfWeek, i =>
    Day("prev", lastMonthOffset + i + 1)
  );
  let curDays = range(currLength, i => Day("curr", i + 1));
  let nextDays = range(42 - prevDays.length - curDays.length, i =>
    Day("next", i + 1)
  );

  return [prevDays, curDays, nextDays];
};

// Elements

let CalendarHeader = ({ currentMonth, currentYear, next, prev }) => (
  <Fragment>
    <div className="calendar-header">
      <div className="month-nav-container">
        <i className="fa fa-arrow-left" onClick={prev} />
        <h3>
          {months[currentMonth]} {currentYear}
        </h3>
        <i className="fa fa-arrow-right" onClick={next} />
      </div>
      <div className="weekdays">
        {weekdays.map(weekday => (
          <div key={weekday} className={"weekday " + weekday}>
            {weekday}
          </div>
        ))}
      </div>
    </div>
  </Fragment>
);

let DayCell = ({
  day: { type, date },
  selected,
  actions: { select, deselect }
}) => {
  return (
    <div
      onClick={selected ? deselect : select}
      className={"day -" + type + "-month" + (selected ? " -selected" : "")}
    >
      <div className="day-label">{date}</div>
    </div>
  );
};

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...fromDate(new Date()),
      taskList: Object.fromEntries(months.map(m => [m, range(31, i => [])])),
      selection: new Set([1, 2]),
      mouse: {
        down: false
      },
      popUp: {
        visibility: "hidden"
      },
      data: []
    };
  }
  move(dir = 0) {
    this.setState(({ currentMonth, currentYear }) => ({
      selection: new Set([]),
      ...fromDate(
        toDate({
          currentMonth: currentMonth + dir,
          currentYear: currentYear
        })
      )
    }));
  }

  setSelection(selection) {
    this.setState({ selection });
  }
  selectDay(d) {
    this.setSelection(new Set([d]));
  }
  addDay(d) {
    let { selection } = this.state;
    selection.add(d);
    this.setSelection(selection);
  }
  removeDay(d) {
    let { selection } = this.state;
    selection.delete(d);
    this.setSelection(selection);
  }
  isSelected(d) {
    return this.state.selection.has(d);
  }
  addEvent() {
    let name = this.refs.name.value;
    let time = this.refs.time.value;
    let d = Date.now();
    let data = [...this.state.data];
    let obj = {};
    obj["name"] = name;
    obj["time"] = time;
    obj["id"] = d;
    data.push(obj);
    this.setState({ data });
    document.getElementById("add-event").reset();
  }

  render() {
    let { currentYear, currentMonth } = this.state;
    let [prevDays, curDays, nextDays] = makeMonth(currentYear, currentMonth);
    return (
      <React.Fragment>
        <div className="header">
          <h1> Calendar </h1>
        </div>
        <CalendarHeader
          currentMonth={currentMonth}
          currentYear={currentYear}
          next={() => this.move(1)}
          prev={() => this.move(-1)}
        />
        <div className="calender-grid">
          <div
            className="grid"
            onMouseDown={() => this.setState({ mouse: { down: true } })}
            onMouseUp={() => this.setState({ mouse: { down: false } })}
          >
            {[...prevDays, ...curDays, ...nextDays].map(day => (
              <DayCell
                key={`${day.type}-${day.date}`}
                day={day}
                selected={day.type === "curr" && this.isSelected(day.date)}
                actions={{
                  select: () => {
                    if (day.type === "prev") this.move(-1);
                    if (day.type === "next") this.move(1);
                    this.selectDay(day.date);
                  },
                  deselect: () => this.removeDay(day.date)
                }}
              />
            ))}
          </div>
          <div
            className="fab-button"
            onClick={() => this.setState({ popUp: { visibility: "visible" } })}
          >
            +
          </div>
          <div
            className="pop-up"
            style={{
              visibility: this.state.popUp.visibility
            }}
          >
            <form id="add-event">
              Event Name: <input type="text" ref="name" />
              <br />
              <br />
              Event Time: <DateTimePicker ref="time" />
              <br />
              <br />
              <button onClick={() => this.addEvent()}>Add</button>
            </form>
          </div>
        </div>
        <div className="sidebar">
          <div className="sidebar-header">Todo</div>
          <div className="sidebar-content">
            {this.state.data.map(item => (
              <div id={item.id}>
                <label>Name: {item.name} </label>
                <label>Date: {item.time}</label>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
