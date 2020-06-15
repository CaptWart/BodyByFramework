import React from "react";
import { Accordion, Card, Button, Form } from "react-bootstrap";

function Food(props) {
  return (
    <div>
      <Accordion>
      {props.foods.map(food => 
        <Card key={food._id}>
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
                <Form.Group>
                  <Form.Label>Item</Form.Label>
                  <Form.Control
                    key={food._id}
                    name="item"
                    type="text" 
                    defaultValue={food.item} 
                    //onChange={props.handleFoodEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Calories</Form.Label>
                  <Form.Control
                    key={food._id}
                    name="calories"
                    type="text" 
                    defaultValue={food.calories} 
                    //onChange={props.handleFoodEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    key={food._id}
                    name="price" 
                    type="text" 
                    defaultValue={food.price}
                    //onChange={props.handleFoodEntry}
                  />
                </Form.Group>
                <Button
                  name="updateBtn"
                  variant="primary"
                  size="sm"
                  type="submit"
                  value={food._id}
                  onClick={props.handleSaveFood}
                >
                  Save
                </Button>
                <Button
                  name="deleteBtn"
                  variant="danger"
                  size="sm"
                  className="mx-2"
                  type="submit" 
                  value={food._id} 
                  onClick={props.handleDeleteFood}
                >
                  Delete
                </Button>
              </Form>
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
              onClick={props.handleSetFood}
            >
              Add New
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="new">
            <Card.Body>
              <Form id="newFood">
                <Form.Group>
                  <Form.Label>Item</Form.Label>
                  <Form.Control
                    name="item"
                    type="text" 
                    //onChange={props.handleFoodEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Calories</Form.Label>
                  <Form.Control
                    name="calories"
                    type="text" 
                    //onChange={props.handleFoodEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    type="text"
                    //onChange={props.handleFoodEntry} 
                  />
                </Form.Group>
                <div id="foodSaveAlert" className="alert">
                  Please enter valid data: "Item" name is required. All other data must be numbers.
                </div>
                <Button
                  name="createBtn"
                  variant="primary"
                  size="sm"
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