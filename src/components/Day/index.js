import React from "react";
import { Button } from "react-bootstrap";

function Day(props) {
  return (
    <div>
      <h3>{props.days.length} Days Plan</h3>

      <Button
        name="addBtn"
        variant="primary" 
        type="submit" 
        onClick={props.handleSaveDay}
      >
        Add Day
      </Button>

      {props.days.length > 0 ?
        <Button
          name="deleteBtn"
          variant="danger" 
          type="submit"
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