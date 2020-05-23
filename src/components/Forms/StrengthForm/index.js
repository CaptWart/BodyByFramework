import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

function StrengthForm(props) {
  // const [formClear, setFormClear] = useState(false);

  // useEffect(() => {
  //   setFormClear(props.formClear);
  // }, [props.formClear])

  return (
    <Form className="strengthForm">
      <Form.Group>
        <Form.Label>Workout</Form.Label>
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
        <Form.Label>Sets</Form.Label>
        <Form.Control
          name="sets" 
          type="text"
          defaultValue={props.sets}
          onChange={props.onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Reps</Form.Label>
        <Form.Control
          name="reps" 
          type="text"
          defaultValue={props.reps}
          onChange={props.onChange}
        />
      </Form.Group>
    </Form>
  );
}

export default StrengthForm;