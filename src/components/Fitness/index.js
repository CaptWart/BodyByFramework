import React, { useState } from "react";
import { Accordion, Card, Button, ToggleButtonGroup, ToggleButton, Form, Modal } from "react-bootstrap";

function Fitness(props) {
  const [type, setType] = useState("strength");
  const [strengthForm, setStrengthForm] = useState("block");
  const [activityForm, setActivityForm] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const [fitnessToCopy, setFitnessToCopy] = useState({});
  const [dayToCopy, setDayToCopy] = useState();

  const handleTypeChange = e => {
    setType(e.target.value);
    if(strengthForm === "block") setStrengthForm("none");
    else setStrengthForm("block");

    if(activityForm === "block") setActivityForm("none");
    else setActivityForm("block");
  }

  const handleShowModal = e => {
    if(showModal === false) {
      const index = e.target.value;
      const data = props.fitnesses[index];
      const fitnessData = { 
        userID: data.userID,
        planID: data.planID,
        workout: data.workout,
        type: data.type,
        weight: data.weight,
        sets: data.sets,
        reps: data.reps,
        distance: data.distance,
        time: data.time
      }
      setShowModal(true);
      setDayToCopy(props.days[0]._id);
      setFitnessToCopy(fitnessData);
    } else {
      setShowModal(false);
    }
  }

  const handleDayToCopyChange = e => {
    setDayToCopy(e.target.value);
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
              onClick={props.handleSetFitness}
            >
              {fitness.workout}
              <Button
                name="showModalBtn"
                variant="primary"
                size="sm"
                className="mx-2" 
                value={index}
                onClick={handleShowModal}
              >
                Copy Workout
              </Button>
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
                    <Form.Label>Weight (lbs)</Form.Label>
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
                    <Form.Label>Distance (m)</Form.Label>
                    <Form.Control
                      name="distance"
                      type="text"
                      defaultValue={fitness.distance}
                      onChange={props.handleFitnessEntry}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Time (minutes)</Form.Label>
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
                    onChange={props.handleFitnessEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Weight (lbs)</Form.Label> 
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
                  <Form.Label>Distance (m)</Form.Label>
                  <Form.Control
                    name="distance"
                    type="text" 
                    onChange={props.handleFitnessEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Time (minutes)</Form.Label>
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

      <Modal show={showModal} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>{fitnessToCopy.workout}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Select the Day to Copy this Workout</label><br/>
          <select id="days" onChange={handleDayToCopyChange}>
            {props.days.map(day => (
              <option key={day._id} value={day._id}>Day: {day.day}</option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={() => {props.handleCopyFitness(dayToCopy, fitnessToCopy); handleShowModal();}}
          >
            Copy
          </Button>
          <Button variant="secondary" onClick={handleShowModal}>
            Candel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Fitness;