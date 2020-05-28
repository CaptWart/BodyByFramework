import React, { useState } from "react";

import { Button, Alert, Card, Form } from "react-bootstrap";

function Day(props) {
  const [showAlert, setShowAlert] = useState("none");

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
            <Button
              name="deleteBtn"
              variant="danger" 
              type="submit"
              onClick={() => setShowAlert("block")}
            >
              Remove Day
            </Button>
          <Alert style={{display: showAlert}} variant="danger">
          <Alert.Heading>Are you sure?</Alert.Heading>
          <p>
            You are about to delete all the data associated with 
            <span className="dayToDelete"> Day {props.days[props.days.length -1].day}.</span>
          </p>
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShowAlert("none")} variant="primary" size="sm">Cancel</Button>
            <Button onClick={() => {props.handleDeleteDay(); setShowAlert("none");}} variant="danger" size="sm">Delete</Button>
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
            <Form id="bodyWeightForm" className="p-2">
              <Form.Group className="mb-2">
                <Form.Label>Body Weight</Form.Label>
                  <Form.Control
                    id="bodyWeight"
                    name="bodyWeight"
                    type="text"
                    defaultValue={props.bodyWeight}
                    onChange={props.handleBodyWeightEntry}
                  />
              </Form.Group>
              <div id="saveBodyWeightAlert" className="alert" style={{display: showAlert}}>
                Body Weight needs to be a number.
                <Button
                  name="createBtn"
                  variant="primary" 
                  size="sm"
                  type="submit"
                  onClick={props.handleCancelEditBodyWeight}
                >
                  Cancel Edit
                </Button>
              </div>
              <Button
                name="createBtn"
                variant="primary" 
                size="sm"
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