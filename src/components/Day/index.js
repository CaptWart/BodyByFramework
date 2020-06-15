import React, { useState, useEffect } from "react";
import API from "../Utils/API";

import { Button, Alert, Card, Form } from "react-bootstrap";

function Day(props) {
  const [showAlert, setShowAlert] = useState("none");
  const [dayID, setDayID] = useState("");
  const [bodyWeightState, setBodyWeightState] = useState({});
  const [days, setDays] = useState([]);
  const [bodyWeight, setBodyWeight] = useState();

  console.log(props)
  const lastDay = props.lastDay
  const planID = props.planID

  if(props.days.length > 0 && dayID == ""){
    console.log(dayID)
    setDayID(props.days[0]._id)
    loadDay(props.days[0]._id)
    props.handleCurrentDay(props.days[0]._id)
  }

  const handleDayChange = e => {
    console.log(e.target.value)
    const id = e.target.value;
    document.getElementById("bodyWeightForm").reset();
    document.getElementById("saveBodyWeightAlert").style.display = "none";
    setDayID(id);
    loadDay(id);
  }

  useEffect(() => {
    props.handleCurrentDay(dayID)
  }, [dayID]);

  const handleSaveDay = e => {
    e.preventDefault();
    let last = 0;
    if(lastDay.length) last = parseInt(lastDay[0].day);
    const newDay = last + 1;
    createDay(newDay);
  }

  const handleDeleteDay = e => {
    const dayID = lastDay[0]._id;
    deleteDay(dayID);
  }
  const handleBodyWeightEntry = e => {
    setBodyWeightState({
      bodyWeight: e.target.value
    });
  }

  const handleSaveBodyWeight = e => {
    e.preventDefault();
    const weight = document.getElementById("bodyWeight").value;
    if(isNaN(weight) || weight === "") {
      document.getElementById("saveBodyWeightAlert").style.display = "block";        
    } else {
      document.getElementById("saveBodyWeightAlert").style.display = "none";
      updateDay(dayID);
    }
  }
  const handleCancelEditBodyWeight = e => {
    e.preventDefault();
    document.getElementById("bodyWeightForm").reset();
    document.getElementById("saveBodyWeightAlert").style.display = "none";
  
  }

  const loadLastDay = planID => {
    console.log('thing')
    const planInfo = props.plans.find( ({_id}) => _id === planID ).days
    const lastDay = planInfo[planInfo.length -1]
    if(lastDay.day === 1) {
      console.log("if")
      document.getElementById("bodyWeightForm").reset();
      document.getElementById("saveBodyWeightAlert").style.display = "none";
      loadDay(lastDay._id);
    }
  }

  function loadDays(planID) {
    setDays(props.plans.find( ({_id}) => _id === planID ).days)
  };

  function createDay(newDay) {
    console.log('hi')

    const dayData = {day: newDay};
    API.createDay(dayData)
    .then(res => {
      loadDays(planID);
      loadLastDay(planID);
    })
    .catch(err => {})
  }

  function deleteDay(dayID) {
    console.log('hi')

    API.deleteDay(dayID)
    .then(res => {
      loadDays(planID);
      loadLastDay(planID);
    })
    .catch(err => {})
  }

  function loadDay(dayID) {
    console.log(dayID)
    console.log(props.days.find( ({_id}) => _id === dayID ))

    setBodyWeight(props.days.find( ({_id}) => _id === dayID ).bodyWeight)
  }
  function updateDay(dayID) {
    // API.updateDay(dayID, bodyWeight)
    console.log('hi')
    API.updateDay(dayID, bodyWeightState)
    .then(res => {
      loadDays(planID);
      loadDay(dayID);
    })
    .catch(err => {})
  }  
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
          <select id="days" onChange={handleDayChange}>
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
                    defaultValue={bodyWeight}
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