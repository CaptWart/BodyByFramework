import React, { useState } from "react";
import { Button, Alert, Card, Form } from "react-bootstrap";

function Day(props) {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div>
      <h2>{props.days.length} Days Plan</h2>
      <Button
        name="addBtn"
        variant="primary" 
        type="submit" 
        onClick={props.handleSaveDay}
      >
        Add Day
      </Button>

      {props.days.length > 0 ?
        <span>
          {!showAlert && 
            <Button
              name="deleteBtn"
              variant="danger" 
              type="submit"
              onClick={() => setShowAlert(true)}
            >
              Remove Day
            </Button>
          }
          <Alert show={showAlert} variant="danger">
          <Alert.Heading>Are you sure?</Alert.Heading>
          <p>
            You are about to delete all the fitness and food data associated with 
            <span class="dayToDelete"> Day {props.days[props.days.length -1].day}.</span>
          </p>
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShowAlert(false)} variant="outline-primary">Cancel</Button>
            <Button onClick={() => {props.handleDeleteDay(); setShowAlert(false);}} variant="outline-danger">Delete</Button>
          </div>
          </Alert>
        </span>
        : null
      }
    
      {props.days.length > 0 &&
        <div>
          <label>Select the Day</label><br/>
          <select id="days" onChange={props.handleDayChange}>
            {props.days.map(day => (
              <option key={day._id} value={day._id}>Day: {day.day}</option>
            ))}
          </select>
          <Card>
            <Form>
              <Form.Group>
                <Form.Label>Body Weight</Form.Label>
                  <Form.Control
                    id="bodyWeight"
                    name="bodyWeight"
                    type="text"
                    defaultValue={props.bodyWeight}
                    onChange={props.handleBodyWeightEntry}
                  />
              </Form.Group>
              <Button
                name="createBtn"
                variant="primary" 
                type="submit" 
                onClick={props.handleSaveBodyWeight}
              >
                Save
              </Button>
            </Form>
          </Card>
        </div>
      }
    </div>
  );
}

export default Day;