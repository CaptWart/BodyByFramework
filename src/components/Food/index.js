import React from "react";
import { Accordion, Card, Button, Form } from "react-bootstrap";

function Food(props) {
  return (
    <div>
      {props.foods.map(food => 
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                name={food._id}
                as={Button} 
                variant="link" 
                eventKey={food._id}
                onClick={props.handleSetFood}
              >
                {food.item}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={food._id}>
              <Card.Body>
                <Form>
                <Form.Group controlId="item">
                    <Form.Label>Item</Form.Label>
                    <Form.Control
                      name="item"
                      type="text" 
                      defaultValue={food.item} 
                      onChange={props.handleFoodChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="calories">
                    <Form.Label>Calories</Form.Label>
                    <Form.Control
                      name="calories"
                      type="text" 
                      defaultValue={food.calories} 
                      onChange={props.handleFoodChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      name="price" 
                      type="text" 
                      defaultValue={food.price}
                      onChange={props.handleFoodChange}
                    />
                  </Form.Group>
                  <Button
                    name="updateBtn"
                    variant="primary"
                    type="submit"
                    value={food._id}
                    onClick={props.handleSaveFood}
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
            <Accordion.Toggle 
              as={Button}
              name="new"
              variant="link" 
              eventKey="new"
              onClick={props.handleSetFood}
            >
              Add New
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="new">
            <Card.Body>
              <Form>
                <Form.Group controlId="item">
                  <Form.Label>Item</Form.Label>
                  <Form.Control
                    name="item"
                    type="text" 
                    onChange={props.handleFoodChange}
                  />
                </Form.Group>
                <Form.Group controlId="calories">
                  <Form.Label>Calories</Form.Label>
                  <Form.Control
                    name="calories"
                    type="text" 
                    onChange={props.handleFoodChange}
                  />
                </Form.Group>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    type="text"
                    onChange={props.handleFoodChange} 
                  />
                </Form.Group>
                <Button
                  name="createBtn"
                  variant="primary" 
                  type="submit" 
                  onClick={props.handleSaveFood}
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

export default Food;