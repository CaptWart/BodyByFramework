import React, { useState } from "react";
import { Accordion, Card, Button, Form, Modal } from "react-bootstrap";

function Food(props) {
  const [showModal, setShowModal] = useState(false);
  const [foodToCopy, setFoodToCopy] = useState({});
  const [dayToCopy, setDayToCopy] = useState();

  const handleShowModal = e => {
    if(showModal === false) {
      const index = e.target.value;
      const data = props.foods[index];
      const foodData = { 
        userID: data.userID,
        planID: data.planID,
        item: data.item,
        calories: data.calories,
        price: data.price
      }
      setShowModal(true);
      setDayToCopy(props.days[0]._id);
      setFoodToCopy(foodData);
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
      {props.foods.map((food, index) => 
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
              <Button
                name="showModalBtn"
                variant="primary"
                size="sm"
                className="mx-2" 
                value={index}
                onClick={handleShowModal}
              >
                Copy
              </Button>
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
                    onChange={props.handleFoodEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Calories</Form.Label>
                  <Form.Control
                    key={food._id}
                    name="calories"
                    type="text" 
                    defaultValue={food.calories} 
                    onChange={props.handleFoodEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    key={food._id}
                    name="price" 
                    type="text" 
                    defaultValue={food.price}
                    onChange={props.handleFoodEntry}
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
                    onChange={props.handleFoodEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Calories</Form.Label>
                  <Form.Control
                    name="calories"
                    type="text" 
                    onChange={props.handleFoodEntry}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    type="text"
                    onChange={props.handleFoodEntry} 
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

      <Modal show={showModal} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>{foodToCopy.item}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Select the Day to Copy this Food</label><br/>
          <select id="days" onChange={handleDayToCopyChange}>
            {props.days.map(day => (
              <option key={day._id} value={day._id}>Day: {day.day}</option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={() => {props.handleCopyFood(dayToCopy, foodToCopy); handleShowModal();}}
          >
            Copy
          </Button>
          <Button variant="secondary" onClick={handleShowModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Food;