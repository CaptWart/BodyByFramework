import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import API from "../Utils/API";

function Day(props) {
  const [lastDay, setLastDay] = useState({_id: 0, day: 0});

  useEffect(() => {
    console.log("this is the current selectedPlan: ", props.selectedPlan);
    loadLastDay(props.selectedPlan);
  }, [props.selectedPlan]);

  const loadLastDay = planID => {
    API.getLastDay(planID)
    .then(res => {
      console.log("res.data: ", res.data);
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
          value={lastDay.length > 0 ? lastDay[0].day : 0}
          onClick={props.handleSaveDay}
        >
          Add Day
        </Button>
      {props.days.length > 0 ?
        <Button
          name="deleteBtn"
          variant="danger" 
          type="submit"
          value={lastDay.length > 0 ? lastDay[0]._id : 0}
          onClick={props.handleDeleteDay}
        >
          Remove Day
        </Button>
        : null
      }
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