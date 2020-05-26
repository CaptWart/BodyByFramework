import React, { useEffect } from "react";
import { Form } from "react-bootstrap";

function ActivityForm(props) {
  return (
    <Form className="activityForm">
    <Form.Group>
      <Form.Label>Activity</Form.Label>
      <Form.Control
        name="workout"
        type="text"
        defaultValue={props.workout}
        onChange={props.onChange}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Weight</Form.Label>
      <Form.Control
        name="weight" 
        type="text"
        defaultValue={props.weight}
        onChange={props.onChange}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Time</Form.Label>
      <Form.Control
        name="time"
        type="text"
        defaultValue={props.time}
        onChange={props.onChange}
      />
    </Form.Group>
  </Form>
  );
}

export default ActivityForm;