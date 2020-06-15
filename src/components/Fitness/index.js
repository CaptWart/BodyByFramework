import React, { useState } from "react";
import useSetState from "../Utils/useSetState";
import { Accordion, Card, Button, ToggleButtonGroup, ToggleButton, Form } from "react-bootstrap";
import API from "../Utils/API";

const initialFitnessState = {
  workout: "",
  type: "",
  weight: 0,
  sets: 0,
  reps: 0,
  distance: 0,
  time: 0
}

function Fitness(props) {
  console.log('fitness props: ', props)
  const [type, setType] = useState("strength");
  const [strengthForm, setStrengthForm] = useState("block");
  const [activityForm, setActivityForm] = useState("none");

  const [fitnessState, setFitnessState] = useSetState(props);
  //const [fitnesses, setFitnesses] = useState([]);
  const dayID = 0;

  const handleSetFitness = e => {
    console.log(e)
    if(e.target.name === "new") {
      console.log("hitnew")

      setFitnessState(initialFitnessState);
    } 
    else {
      const fitnessID = e.target.name;
      console.log("hitelse")

      //loadFitness(fitnessID);
    }
  }

  const handleFitnessEntry = e => {
    console.log('hit')
    setFitnessState({
      
      [e.target.name]: e.target.value
    });
  }

  const handleSaveFitness = e => {
    e.preventDefault();
    if(e.target.name === "createBtn") {
      const type = e.target.value;
      const fitnessData = {...fitnessState, type:type, dayID: dayID};

      if(type === "strength") {
        if(fitnessData.workout === "" || isNaN(fitnessData.weight) || isNaN(fitnessData.sets) || isNaN(fitnessData.reps)) {
          document.getElementById("strengthSaveAlert").style.display = "block"; 
        } else {
          document.getElementById("strengthSaveAlert").style.display = "none";
          document.getElementById("activitySaveAlert").style.display = "none";
          clearFitness(); // Reset the fitnessState with the initial values.
          createFitness(fitnessData);
          document.getElementById('newStrength').reset();
          document.getElementById('newActivity').reset();
        }
      } else {
        if(fitnessData.workout === "" || isNaN(fitnessData.distance) || isNaN(fitnessData.time)) {
          document.getElementById("activitySaveAlert").style.display = "block"; 
        } else {
          document.getElementById("strengthSaveAlert").style.display = "none";
          document.getElementById("activitySaveAlert").style.display = "none";
          clearFitness(); // Reset the fitnessState with the initial values.
          createFitness(fitnessData);
          document.getElementById('newStrength').reset();
          document.getElementById('newActivity').reset();
        }
      }
    }
    else {
      const fitnessID = e.target.value;
      updateFitness(fitnessID);
    }
  }

  const handleDeleteFitness = e => {
    // e.preventDefault();
    const fitnessID = e.target.value;
    deleteFitness(fitnessID);
  }
  const clearFitness = () => {
    setFitnessState(initialFitnessState);
  }


  const handleTypeChange = e => {
    setType(e.target.value);
    if(strengthForm === "block") setStrengthForm("none");
    else setStrengthForm("block");

    if(activityForm === "block") setActivityForm("none");
    else setActivityForm("block");
  }


  function createFitness(data) {
    console.log(data)

    API.createFitness(data)
    .then(res => {
      loadFitnesses(dayID);
    })
    .catch(err => {})
  }

  function deleteFitness(fitnessID) {
    console.log('hi')

    API.deleteFitness(fitnessID)
    .then(res => {
      //loadFitnesses(dayID);
    })
    .catch(err => {})
  }
  function updateFitness(fitnessID) {
    console.log('hi')

    API.updateFitness(fitnessID, fitnessState)
    .then(res => {
      loadFitnesses(dayID);
    })
    .catch(err => {})
  }
  function loadFitnesses(dayID) {
    //setFitnesses(days.find( ({_id}) => _id === dayID ).fitnesses)
  }

  return (
    <div>
      <Accordion>
      {props.fitnesses.map((fitness, index) => 
        <Card key={fitness._id}>
          <Card.Header>
            <Accordion.Toggle
              name={fitness._id}
              as={Button} 
              variant="link" 
              eventKey={fitness._id}
              onClick={handleSetFitness}
            >
              {fitness.workout}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={fitness._id}>
            <Card.Body>
              {fitness.type==="strength" ?
                <Form className="strengthForm">
                  <Form.Group>
                    <Form.Label>Workout</Form.Label>
                    <Form.Control
                      key={fitness._id}
                      name="workout"
                      type="text" 
                      defaultValue={fitness.workout}
                      //onChange={props.handleFitnessEntry}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Weight (lbs)</Form.Label>
                    <Form.Control
                      key={fitness._id}
                      name="weight"
                      type="text" 
                      defaultValue={fitness.weight}
                      //onChange={props.handleFitnessEntry}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Sets</Form.Label>
                    <Form.Control
                      key={fitness._id}
                      name="sets"
                      type="text" 
                      defaultValue={fitness.sets}
                      //onChange={props.handleFitnessEntry}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Reps</Form.Label>
                    <Form.Control
                      key={fitness._id}
                      name="reps"
                      type="text" 
                      defaultValue={fitness.reps} 
                      //onChange={props.handleFitnessEntry}
                    />
                  </Form.Group>
                </Form>
                :
                <Form className="activityForm">
                  <Form.Group>
                    <Form.Label>Activity</Form.Label>
                    <Form.Control
                      name="workout"
                      type="text"
                      defaultValue={fitness.workout}
                      //onChange={props.handleFitnessEntry}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Distance (km)</Form.Label>
                    <Form.Control
                      name="distance"
                      type="text"
                      defaultValue={fitness.distance}
                      //onChange={props.handleFitnessEntry}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Time (minutes)</Form.Label>
                    <Form.Control
                      name="time"
                      type="text"
                      defaultValue={fitness.time}
                      //onChange={props.handleFitnessEntry}
                    />
                  </Form.Group>
                </Form>
              }
              <Button
                name="updateBtn"
                variant="primary"
                size="sm"
                className="mx-2" 
                type="submit" 
                value={fitness._id} 
                onClick={handleSaveFitness}
              >
                Save
              </Button>
              <Button
                name="deleteBtn"
                variant="danger"
                size="sm"
                className="mx-2"
                type="submit" 
                value={fitness._id} 
                onClick={handleDeleteFitness}
              >
                Delete
              </Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )}    
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              name="new"
              variant="link"
              eventKey="new"
              onClick={handleSetFitness}
            >
              Add New
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="new">
            <Card.Body>
              <ToggleButtonGroup toggle name="fitnessType">
                <ToggleButton type="radio" name="fitnessType" value={"strength"} size="sm" onChange={handleTypeChange}>Strength</ToggleButton>
                <ToggleButton type="radio" name="fitnessType" value={"activity"}  size="sm" onChange={handleTypeChange}>Activity</ToggleButton>
              </ToggleButtonGroup>
              <Form id="newStrength" className="newFitnessForm" style={{ display: strengthForm }}>
                <Form.Group>
                  <Form.Label>Workout</Form.Label>
                  <Form.Control
                    name="workout"
                    type="text" 
                    //onChange={props.handleFitnessEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Weight (lbs)</Form.Label> 
                  <Form.Control
                    name="weight" 
                    type="text" 
                    //onChange={props.handleFitnessEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Sets</Form.Label>
                  <Form.Control
                    name="sets" 
                    type="text" 
                    //onChange={props.handleFitnessEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Reps</Form.Label>
                  <Form.Control
                    name="reps" 
                    type="text" 
                    //onChange={props.handleFitnessEntry}
                  />
                </Form.Group>
                <div id="strengthSaveAlert" className="alert">
                  Please enter valid data: "Workout" name is required. All other data must be numbers.
                </div>
                <Button
                  name="createBtn" 
                  variant="primary"
                  size="sm"
                  type="submit"
                  value={type}
                  onClick={handleSaveFitness}
                >
                  Save
                </Button>
              </Form>
              <Form id="newActivity" className="newFitnessForm" style={{ display: activityForm }}>
                <Form.Group>
                  <Form.Label>Activity</Form.Label>
                  <Form.Control
                  name="workout"
                  type="text" 
                  onChange={handleFitnessEntry}
                />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Distance (km)</Form.Label>
                  <Form.Control
                    name="distance"
                    type="text" 
                    onChange={handleFitnessEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Time (minutes)</Form.Label>
                  <Form.Control
                    name="time"
                    type="text" 
                    onChange={handleFitnessEntry}
                  />
                </Form.Group>
                <div id="activitySaveAlert" className="alert">
                Please enter valid data: "Activity" name is required. All other data must be numbers.
                </div>
                <Button
                  name="createBtn" 
                  variant="primary"
                  size="sm"
                  type="submit"
                  value={type}
                  onClick={handleSaveFitness}
                >
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default Fitness;