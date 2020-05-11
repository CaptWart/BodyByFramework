import React, { useState, useEffect } from "react";
import API from "../../components/Utils/API";
import Plan from "../Plan";
import Day from "../Day";
import Fitness from "../Fitness";
import Food from "../Food";

function Dashboard(props) {
  const [planID, setPlanID] = useState("");
  const [days, setDays] = useState([]);
  const [dayID, setDayID] = useState("");
  const [fitnesses, setFitnesses] = useState([]);
  const [foods, setFoods] = useState([]);

  // Call setPlanID when props.plans are passed (beginning).
  useEffect(() => {
    const plans = props.plans;
    if(plans.length) {
      setPlanID(plans[0]._id);
    }
  }, [props.plans]);

  // Call loadDays(set days) when planID changes.
  useEffect(() => {
    if(planID !== "") {
      loadDays(planID);
    }
  }, [planID]);

  // Set dayID when days state changes.
  useEffect(() => {
    if(days.length) setDayID(days[0]._id)
  }, [days]);

  // Call loadFitnesses(set fitnesses) and loadFoods(set foods) when dayID changes.
  useEffect(() => {
    if(dayID !== "") {
      loadFitnesses(dayID);
      loadFoods(dayID);
    }
  }, [dayID]);

  // Load Days of the plan.
  function loadDays(planID) {
    console.log("loadDays planID: ", planID);
    API.getAllDays(planID)
    .then(res => {
        setDays(res.data);
        console.log("days data: ", res.data);
    })
    .catch(err => 
      console.log(err)
    );
  };

  // Load Fitnesses of the day.
  function loadFitnesses(dayID) {
    API.getAllFitnessesByDay(dayID)
    .then(res => {
      setFitnesses(res.data);
      console.log("fitnesses data: ", res.data);
    })
    .catch(err =>
      console.log(err)
    );
  }

  // Load Foods of the day.
  function loadFoods(dayID) {
    API.getAllFoodsByDay(dayID)
    .then(res => {
      setFoods(res.data);
      console.log("foods data: ", res.data);
    })
    .catch(err =>
      console.log(err)
    );
  }

  const handlePlanChange = e => {
    setPlanID(e.target.value);
  }

  const handleDayChange = e => {
    setDayID(e.target.value);
    console.log("dayID: ", dayID);
}

  return (
    <div>
      <div>
        <h1>{props.nickname}'s Dashboard</h1>
      </div>
      <div>
        <Plan
          plans={props.plans}
          handlePlanChange={handlePlanChange}
        />
        <br/>
        <Day 
          days={days}
          handleDayChange={handleDayChange}
        />
        <br/>
        <Fitness
          fitnesses={fitnesses}
        />
        <br/>
        <Food
          foods={foods}
        />
      </div>
    </div>
  );
}

export default Dashboard;