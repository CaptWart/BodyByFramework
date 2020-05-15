import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import API from "../Utils/API";

function Day(props) {
  const [lastDay, setLastDay] = useState(1);

  useEffect(() => {
    loadLastDay(props.selectedPlan);
  }, [props.selectedPlan]);

  const onClickAddDay = () => {
    setLastDay(lastDay + 1);
    console.log("lastDay: ", lastDay);
  }

  const loadLastDay = planID => {
    API.getLastDay(planID)
    .then(res => {
      setLastDay(res.data);
    })
    .catch(err =>
      console.log(err)
    );
  }

  return (
    <div>
      <h3>{props.days.length} Days Plan</h3>
      <Button
        name="addBtn"
        variant="primary" 
        type="submit" 
        onClick={onClickAddDay}
      >
        Add Day
      </Button>
      {props.days.length > 0 &&
        <div>
          <label>Select the Day</label><br/>
          <select id="days" onChange={props.handleDayChange}>
            {props.days.map(day => (
              <option value={day._id}>Day: {day.day}</option>
            ))}
          </select>
        </div>
      }
    </div>
  );
}

export default Day;