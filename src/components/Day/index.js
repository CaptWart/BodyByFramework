import React from "react";

function Day(props) {
  return (
    <div>
      <label>Select the Day</label><br/>
      <select id="days" onChange={props.handleDayChange}>
        {props.days.map(day => (
          <option value={day._id}>Day: {day.day}</option>
        ))}
      </select>
    </div>
  );
}

export default Day;