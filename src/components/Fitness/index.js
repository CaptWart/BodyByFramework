import React, { useState } from "react";
import { Accordion, Card, Button, ButtonGroup, ToggleButton, Form } from "react-bootstrap";
// import StrengthForm from "../Forms/StrengthForm";
// import ActivityForm from "../Forms/ActivityForm";

function Fitness(props) {
  const [type, setType] = useState("strength");
  const [strengthForm, setStrengthForm] = useState("block");
  const [activityForm, setActivityForm] = useState("none");
  const [activeKey, setActiveKey] = useState('');

  const handleTypeChange = e => {
    setType(e.target.value);
    if(strengthForm === "block") setStrengthForm("none");
    else setStrengthForm("block");

    if(activityForm === "block") setActivityForm("none");
    else setActivityForm("block");
  }

  return (
    <div>
      <Accordion>
      {props.fitnesses.map((fitness, index) => 
        <Card>
          <Card.Header>
            <Accordion.Toggle
              name={fitness._id}
              as={Button} 
              variant="link" 
              eventKey={fitness._id}
              onClick={props.handleSetFitness}
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
                      onChange={props.handleFitnessEntry}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                      key={fitness._id}
                      name="weight"
                      type="text" 
                      defaultValue={fitness.weight}
                      onChange={props.handleFitnessEntry}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Sets</Form.Label>
                    <Form.Control
                      key={fitness._id}
                      name="sets"
                      type="text" 
                      defaultValue={fitness.sets}
                      onChange={props.handleFitnessEntry}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Reps</Form.Label>
                    <Form.Control
                      key={fitness._id}
                      name="reps"
                      type="text" 
                      defaultValue={fitness.reps} 
                      onChange={props.handleFitnessEntry}
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
                      onChange={props.handleFitnessEntry}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Distance</Form.Label>
                    <Form.Control
                      name="distance"
                      type="text"
                      defaultValue={fitness.distance}
                      onChange={props.handleFitnessEntry}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      name="time"
                      type="text"
                      defaultValue={fitness.time}
                      onChange={props.handleFitnessEntry}
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
                onClick={props.handleSaveFitness}
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
                onClick={props.handleDeleteFitness}
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
              onClick={props.handleSetFitness}
            >
              Add New
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="new">
            <Card.Body>
              <ButtonGroup toggle>
                <ToggleButton type="radio" value={"strength"} size="sm" onChange={handleTypeChange}>Strength</ToggleButton>
                <ToggleButton type="radio" value={"activity"}  size="sm" onChange={handleTypeChange}>Activity</ToggleButton>
              </ButtonGroup>
              <Form id="newStrength" className="newFitnessForm" style={{ display: strengthForm }}>
                <Form.Group>
                  <Form.Label>Workout</Form.Label>
                  <Form.Control
                    name="workout"
                    type="text" 
                    onChange={props.handleFitnessEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Weight</Form.Label> 
                  <Form.Control
                    name="weight" 
                    type="text" 
                    onChange={props.handleFitnessEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Sets</Form.Label>
                  <Form.Control
                    name="sets" 
                    type="text" 
                    onChange={props.handleFitnessEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Reps</Form.Label>
                  <Form.Control
                    name="reps" 
                    type="text" 
                    onChange={props.handleFitnessEntry}
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
                  onClick={props.handleSaveFitness}
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
                  onChange={props.handleFitnessEntry}
                />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Distance</Form.Label>
                  <Form.Control
                    name="distance"
                    type="text" 
                    onChange={props.handleFitnessEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    name="time"
                    type="text" 
                    onChange={props.handleFitnessEntry}
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
                  onClick={props.handleSaveFitness}
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