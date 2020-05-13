import React from "react";
import { Accordion, Card, Button, Form } from "react-bootstrap";

function Fitness(props) {
  return (
    <div>
      {props.fitnesses.map(fitness => 
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={fitness._id}>
                {fitness.workout}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={fitness._id}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="weight">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                      name={fitness._id}
                      type="text" 
                      defaultValue={fitness.weight}
                      onChange={props.handleUpdateFitnessWeight}
                    />
                  </Form.Group>

                  <Form.Group controlId="sets">
                    <Form.Label>Sets</Form.Label>
                    <Form.Control 
                      type="text" 
                      defaultValue={fitness.sets}
                      onChange={props.handleUpdateFitnessSets}
                    />
                  </Form.Group>
                  
                  <Form.Group controlId="reps">
                    <Form.Label>Reps</Form.Label>
                    <Form.Control 
                      type="text" 
                      defaultValue={fitness.reps} 
                      onChange={props.handleUpdateFitnessReps}
                    />
                  </Form.Group>

                  <Form.Group controlId="time">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      type="text" 
                      defaultValue={fitness.time}
                      onChange={props.handleUpdateFitnessTime}
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    value={fitness._id} 
                    onClick={props.handleUpdateFitness}
                  >
                    Save
                  </Button>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      )}
      <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link">
                
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse>
              <Card.Body>
                <Form>
                  <Form.Group controlId="weight">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control 
                      type="text" 
        
                      onChange={props.handleUpdateFitnessWeight}
                    />
                  </Form.Group>

                  <Form.Group controlId="sets">
                    <Form.Label>Sets</Form.Label>
                    <Form.Control 
                      type="text" 
                      
                      onChange={props.handleUpdateFitnessSets}
                    />
                  </Form.Group>
                  
                  <Form.Group controlId="reps">
                    <Form.Label>Reps</Form.Label>
                    <Form.Control 
                      type="text" 
                       
                      onChange={props.handleUpdateFitnessReps}
                    />
                  </Form.Group>

                  <Form.Group controlId="time">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      type="text" 
                      
                      onChange={props.handleUpdateFitnessTime}
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    
                    onClick={props.handleUpdateFitness}
                  >
                    Save
                  </Button>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion> */}
      )}
      {/* <table className="table table-bordered table-responsive-md table-striped text-center">
      <thead>
          <tr>
            <th className="text-center">Workout</th>
            <th className="text-center">Weight</th>
            <th className="text-center">Sets</th>
            <th className="text-center">Reps</th>
            <th className="text-center">Time(mins)</th>
          </tr>
      </thead>
      <tbody id="fitnessTable">
        {props.fitnesses.map(fitness => 
          <tr>
            <td>{fitness.workout}</td>
            <td>{fitness.weight}</td>
            <td>{fitness.sets}</td>
            <td>{fitness.reps}</td>
            <td>{fitness.time}</td>
          </tr>
        )}
        <tr>
          <td contentEditable="true"></td>
          <td contentEditable="true"></td>
          <td contentEditable="true"></td>
          <td contentEditable="true"></td>
          <td contentEditable="true"></td>
        </tr>
      </tbody>
      </table> */}
    </div>
  );
}

export default Fitness;