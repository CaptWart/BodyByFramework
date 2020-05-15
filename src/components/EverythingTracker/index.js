import React, { useState, useEffect } from "react";
import API from "../Utils/API";
import useSetState from "../Utils/useSetState";
import { Accordion, Card, Button } from "react-bootstrap";
import Plan from "../Plan";
import Day from "../Day";
import Fitness from "../Fitness";
import Food from "../Food";
import Dashboard from "../Dashboard";
import "./style.css";

const initialFitnessState = {
  workout: "",
  weight: 0,
  sets: 0,
  reps: 0,
  time: 0
}

const initialFoodState = {
  item: "",
  calories: 0,
  price: 0
}

function EverythingTracker(props) {
  const [planID, setPlanID] = useState("");
  const [planState, setPlanState] = useState({});
  const [days, setDays] = useState([]);
  const [dayID, setDayID] = useState("");
  const [fitnesses, setFitnesses] = useState([]);
  const [foods, setFoods] = useState([]);
  const [previousFitness, setPreviousFitness] = useState({});
  const [previousFood, setPreviousFood] = useState({});
  const [fitnessState, setFitnessState] = useSetState(previousFitness);
  const [foodState, setFoodState] = useSetState(previousFood);

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

  // Call setPreviousFitness(set previousFitness) when finessState changes.
  useEffect(() => {
    setPreviousFitness(fitnessState);
  }, [fitnessState]);

  // Call setPreviousFood(set previousFood) when foodState changes.
  useEffect(() => {
    setPreviousFood(foodState);
  }, [foodState]);

  /* Plan(s) API call */
  // Create Plan.
  function createPlan() {
    const planData = {...planState, userID: props.userID};
    API.createPlan(planData)
    .then(res => {
      console.log("Plan data created: ", res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // UpdatePlan.
  function updatePlan(planID) {
    console.log("planID: ", planID);
    API.updatePlan(planID, planState)
    .then(res => {
      console.log("Plan data updated: ", res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

   // Delete Plan.
   function deletePlan(planID) {
    API.deletePlan(planID)
    .then(res => {
      console.log("Fitness data deleted: ", res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  /* Day(s) API call */
  // Load Days of the plan.
  function loadDays(planID) {
    API.getAllDays(planID)
    .then(res => {
        setDays(res.data);
    })
    .catch(err => 
      console.log(err)
    );
  };

  /* Fitness(es) API call */
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

  // Load Fitness (single).
  function loadFitness(fitnessID){
    API.getFitness(fitnessID)
    .then(res => {
      setFitnessState(res.data);
    })
    .catch(err =>
      console.log(err)
    );
  }

  // Create Fitness.
  function createFitness() {
    const fitnessData = {...fitnessState, userID: props.userID, planID: planID, dayID: dayID}
    API.createFitness(fitnessData)
    .then(res => {
      console.log("Fitness data created: ", res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // Update Fitness.
  function updateFitness(fitnessID) {
    API.updateFitness(fitnessID, fitnessState)
    .then(res => {
      console.log("Fitness data updated: ", res.data)
    })
    .catch(err => {
      console.log("fitness update got error!");
      console.log(err)
    })
  }

  // Delete Fitness.
  function deleteFitness(fitnessID) {
    API.deleteFitness(fitnessID)
    .then(res => {
      console.log("Fitness data deleted: ", res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  /* Food(s) API call */
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

  // Load Food (single).
  function loadFood(foodID){
    API.getFood(foodID)
    .then(res => {
      setFoodState(res.data);
    })
    .catch(err =>
      console.log(err)
    );
  }

  // Create Food.
  function createFood() {
    const foodData = {...foodState, userID: props.userID, planID: planID, dayID: dayID};
    API.createFood(foodData)
    .then(res => {
      console.log("Food data created: ", res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // Update Food.
  function updateFood(foodID) {
    API.updateFood(foodID, foodState)
    .then(res => {
      console.log("Food data updated: ", res.data)
    })
    .catch(err => {
      console.log("food update got error!");
      console.log(err)
    })
  }

  // Delete Food.
  function deleteFood(foodID) {
    console.log("deleting food");
    API.deleteFood(foodID)
    .then(res => {
      console.log("Food data deleted: ", res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  /* Plan event handling */
  const handlePlanEntry = e => {
    console.log("I'm in handlePlanEntry!");
    console.log("e.targe.value: ", e.target.value);
    setPlanState({
      name: e.target.value
    });
  }

  const handleSavePlan = e => {
    // e.preventDefault()
    if(e.target.name === "createBtn") {
      createPlan();
    }
    else {
      const planID = e.target.value;
      updatePlan(planID);
    }
  }

  const handlePlanChange = e => {
    setPlanID(e.target.value);
  }

  const handleDeletePlan = e => {
    const planID = e.target.value;
    deletePlan(planID);
  }

  /*  Day event handling  */
  const handleDayChange = e => {
    setDayID(e.target.value);
  }

  /* Fitness event handling */
  const handleSetFitness = e => {
    if(e.target.name === "new") {
      setFitnessState(initialFitnessState);
    } 
    else {
      const fitnessID = e.target.name;
      loadFitness(fitnessID);
    }
  }

  const handleFitnessEntry = e => {
    setFitnessState({
      [e.target.name]: e.target.value
    });
  }

  const handleSaveFitness = e => {
    e.preventDefault();
    if(e.target.name === "createBtn") {
      clearFitness(); // Reset the fitnessState with the initial values.
      createFitness();
    }
    else {
      const fitnessID = e.target.value;
      updateFitness(fitnessID);
    }
  }

  const handleDeleteFitness = e => {
    e.preventDefault();
    const fitnessID = e.target.value;
    deleteFitness(fitnessID);
  }

  const clearFitness = () => {
    setFitnessState(initialFitnessState);
  }

  /* Food event handling */
  const handleSetFood = e => {
    if(e.target.name === "new") {
      setFoodState(initialFoodState);
    }
    else {
      const foodID = e.target.name;
      loadFood(foodID);
    }
  }

  const handleFoodEntry = e => {
    setFoodState({
      [e.target.name]: e.target.value
    });
  }

  const handleSaveFood = e => {
    e.preventDefault();
    if(e.target.name === "createBtn") {
      clearFood();  // Reset the foodState with the initial values.
      createFood();
    }
    else {
      const foodID = e.target.value;
      updateFood(foodID);
    }
  }

  const handleDeleteFood = e => {
    e.preventDefault();
    console.log("delete food e.target.value: ", e.target.value);
    const foodID = e.target.value;
    deleteFood(foodID);
  }

  const clearFood = () => {
    setFoodState(initialFoodState);
  }

  return (
    <div>
      <div>
        <h1>{props.nickname}'s BBF Tracker</h1>
      </div>
      <Dashboard 

      />
      <div>
        <Plan
          plans={props.plans}
          selectedPlan={planID}
          handlePlanChange={handlePlanChange}
          handlePlanEntry={handlePlanEntry}
          handleSavePlan={handleSavePlan}
          handleDeletePlan={handleDeletePlan}
        />
        <br/>
        <Day 
          days={days}
          selectedPlan={planID}
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
                    handleSetFitness={handleSetFitness}
                    handleFitnessEntry={handleFitnessEntry}
                    handleSaveFitness={handleSaveFitness}
                    handleDeleteFitness={handleDeleteFitness}
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
                    handleSetFood={handleSetFood}
                    handleFoodEntry={handleFoodEntry}
                    handleSaveFood={handleSaveFood}
                    handleDeleteFood={handleDeleteFood}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default EverythingTracker;