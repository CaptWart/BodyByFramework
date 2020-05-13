import React, { useState, useEffect } from "react";
import API from "../../components/Utils/API";
import { Accordion, Card, Button } from "react-bootstrap";
import Plan from "../Plan";
import Day from "../Day";
import Fitness from "../Fitness";
import Food from "../Food";
import "./style.css";

function Dashboard(props) {
  const [planID, setPlanID] = useState("");
  const [days, setDays] = useState([]);
  const [dayID, setDayID] = useState("");
  const [fitnesses, setFitnesses] = useState([]);
  const [foods, setFoods] = useState([]);

  // const [currentFitnessID, setCurrentFitnessID] = useState("");
  const [currentFitnessWeight, setCurrentFitnessWeight] = useState(0);
  const [currentFitnessSets, setCurrentFitnessSets] = useState(0);
  const [currentFitnessReps, setCurrentFitnessReps] = useState(0);
  const [currentFitnessTime, setCurrentFitnessTime] = useState(0);
  const [currentFoodID, setCurrentFoodID] = useState("");
  const [currentFoodCalories, setCurrentFoodCalories] = useState(0);
  const [currentFoodPrice, setCurrentFoodPrice] = useState(0);

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
    })
    .catch(err =>
      console.log(err)
    );
  }

  // Update Fitness.
  function updateFitness(fitnessID) {
    const fitnessData = {
      weight: currentFitnessWeight,
      sets: currentFitnessSets,
      reps: currentFitnessReps,
      time: currentFitnessTime
    }
    console.log("fitnessID: ", fitnessID);
    console.log("fitnessData: ", fitnessData);
    API.updateFitness(fitnessID, fitnessData)
    .then(res => {
      console.log("Fitness data updated: ", res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handlePlanChange = e => {
    setPlanID(e.target.value);
  }

  const handleDayChange = e => {
    setDayID(e.target.value);
    console.log("dayID: ", dayID);
  }

  const handleUpdateFitness = e => {
    e.preventDefault();
    console.log(this);
    const fitnessID = e.target.value;
    updateFitness(fitnessID);
  }

  const handleUpdateFitnessWeight = e => {
    console.log(e);
    setCurrentFitnessWeight(e.target.value);
  }

  const handleUpdateFitnessSets = e => {
    setCurrentFitnessSets(e.target.value);
  }

  const handleUpdateFitnessReps = e => {
    setCurrentFitnessReps(e.target.value);
  }

  const handleUpdateFitnessTime = e => {
    setCurrentFitnessTime(e.target.value);
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

        <div id="dataForm">
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Fitnesses
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Fitness 
                    fitnesses={fitnesses}
                    handleUpdateFitness={handleUpdateFitness}
                    handleUpdateFitnessWeight={handleUpdateFitnessWeight}
                    handleUpdateFitnessSets={handleUpdateFitnessSets}
                    handleUpdateFitnessReps={handleUpdateFitnessReps}
                    handleUpdateFitnessTime={handleUpdateFitnessTime}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Foods
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Food 
                    foods={foods} 
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        {/* <Fitness
          fitnesses={fitnesses}
        />
        <br/>
        <Food
          foods={foods}
        /> */}
      </div>
    </div>
  );
}

export default Dashboard;