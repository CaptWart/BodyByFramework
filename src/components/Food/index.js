import React from "react";
import { Accordion, Card, Button, Form } from "react-bootstrap";

function Food(props) {
  return (
    <div>
      {props.foods.map(food => 
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={food._id}>
                {food.item}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={food._id}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="calories">
                    <Form.Label>Calories</Form.Label>
                    <Form.Control type="text" value={food.calories} />
                  </Form.Group>

                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" value={food.price} />
                  </Form.Group>

                  <Button variant="primary" type="submit" value={food._id}>
                    Save
                  </Button>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      )}
      {/* <table className="table table-bordered table-responsive-md table-striped text-center">
      <thead>
          <tr>
            <th className="text-center">Item</th>
            <th className="text-center">Calories</th>
            <th className="text-center">Price</th>
          </tr>
      </thead>
      <tbody id="foodTable">
        {props.foods.map(food => 
          <tr>
            <td>{food.item}</td>
            <td>{food.calories}</td>
            <td>{food.price}</td>
          </tr>
        )}
        <tr>
          <td contentEditable="true"></td>
          <td contentEditable="true"></td>
          <td contentEditable="true"></td>
        </tr>
      </tbody>
      </table> */}
    </div>
  );
}

export default Food;