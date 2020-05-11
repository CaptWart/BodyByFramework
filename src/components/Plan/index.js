import React from "react";

function Plan(props) {
  return (
    <div>
      <label>Select Your Plan</label><br/>
      <select id="plans" onChange={props.handlePlanChange}>
        {props.plans.map(plan => (
          <option value={plan._id}>{plan.name}</option>
        ))}
      </select>
    </div>
  )
}

export default Plan;