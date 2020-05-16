import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import API from "../Utils/API";

function Day(props) {
  const [lastDay, setLastDay] = useState({});

  useEffect(() => {
    console.log("this is the current selectedPlan: ", props.selectedPlan);
    loadLastDay(props.selectedPlan);
  }, [props.selectedPlan]);

  // const onClickAddDay = () => {
  //   console.log("selectedPlan when Add button clicke: ", props.selectedPlan);
  //   console.log("lastDay when Add button clicked: ", lastDay[0]);
  //   props.handleSaveDay();
  // }

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
      {lastDay.length > 0 ?
        <Button
          name="addBtn"
          variant="primary" 
          type="submit" 
          value={lastDay[0].day}
          // onClick={onClickAddDay}
          onClick={props.handleSaveDay}
        >
          Add Day
        </Button>
        : null
      }
      {props.days.length > 0 && lastDay.length > 0 ?
        <Button
          name="deleteBtn"
          variant="danger" 
          type="submit"
          value={lastDay[0]._id}
          // value={lastDay[lastDay.length - 1]._id}
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