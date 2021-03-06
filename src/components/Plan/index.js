import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import API from "../Utils/API";
import "./style.css";

function Plan(props) {
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});

  useEffect(() => {
    loadPlan(props.selectedPlan);
  }, [props.selectedPlan])

  const onClickCreatePlan = () => setShowCreatePlan(!showCreatePlan);
  const onClickEditPlan = () => {
    setShowEditPlan(!showEditPlan);
  }

  const loadPlan = planID => {
    API.getPlan(planID)
    .then(res => {
      setSelectedPlan(res.data);
    })
    .catch(err =>{});
  }
  
  return (
    <div>
      <Button
        name="createBtn"
        variant="primary" 
        type="submit" 
        onClick={onClickCreatePlan}
      >
        Create New Plan
      </Button>
      {showCreatePlan &&
        <Card>
          <Form id="newPlanNameForm">
            <Form.Group>
              <Form.Label>New Plan Name</Form.Label>
                <Form.Control
                  id="newPlanName"
                  name="name"
                  type="text"
                  onChange={props.handlePlanEntry}
                />
            </Form.Group>
            <div id="planAlert" className="alert">Plan name needs to be entered.</div>
            <Button
              name="createBtn"
              variant="primary" 
              size="sm"
              type="submit" 
              onClick={props.handleSavePlan}
            >
              Save
            </Button>
          </Form>
        </Card>
      }

      {props.plans.length > 0 &&
        <div>
          <label>Select Your Plan</label><br/>
          <select onChange={props.handlePlanChange}>
            {props.plans.map(plan => (
              <option key={plan._id} value={plan._id}>{plan.name}</option>
            ))}
          </select>
          <Button
            name="createBtn"
            variant="primary"
            size="sm"
            type="submit"
            onClick={onClickEditPlan}
          >
            Edit
          </Button>
        </div>
      }

      {showEditPlan &&
        <Card>
          <Form id="existingPlanNameForm" className="p-2">
            <Form.Group>
              <Form.Label>Plan Name</Form.Label>
                <Form.Control
                  id="existingPlanName"
                  name="name"
                  type="text"
                  defaultValue={selectedPlan.name}
                  onChange={props.handlePlanEntry}
                />
            </Form.Group>
            <div id="planEditAlert" className="alert">Plan name needs to be entered.</div>
            <Button
              name="updateBtn"
              variant="primary"
              size="sm" 
              type="submit"
              value={selectedPlan._id}
              onClick={props.handleSavePlan}
            >
              Save
            </Button>
            <Button
              name="deleteBtn"
              variant="danger"
              size="sm" 
              type="submit"
              className="ml-2"
              value={selectedPlan._id}
              onClick={props.handleDeletePlan}
            >
              Delete
            </Button>
          </Form>
        </Card>
      }
    </div>
  )
}

export default Plan;