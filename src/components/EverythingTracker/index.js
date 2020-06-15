import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useSetState from "../Utils/useSetState";
import { Accordion, Card, Button, Row, Col } from "react-bootstrap";
import API from "../Utils/API";
//import Dashboard from "../Dashboard";
import Plan from "../Plan";
import Day from "../Day";
import Fitness from "../Fitness";
import Food from "../Food";
import "./style.css";

const initialFitnessState = {
  workout: "",
  type: "",
  weight: 0,
  sets: 0,
  reps: 0,
  distance: 0,
  time: 0
}

const initialFoodState = {
  item: "",
  calories: 0,
  price: 0
}

function EverythingTracker(props) {
 // console.log(props)
  const userID = props.userID;
  const [planID, setPlanID] = useState("");
  const [planState, setPlanState] = useState({});
  const [days, setDays] = useState([]);
  const [dayID, setDayID] = useState("");
  //const [bodyWeight, setBodyWeight] = useState();
//  const [bodyWeightState, setBodyWeightState] = useState({});
  const [lastDay, setLastDay] = useState({});
  const [fitnesses, setFitnesses] = useState([]);
  const [foods, setFoods] = useState([]);
  const [previousFitness, setPreviousFitness] = useState({});
  const [previousFood, setPreviousFood] = useState({});
//  const [fitnessState, setFitnessState] = useSetState({});
  const [foodState, setFoodState] = useSetState(previousFood);
  const [plans, setPlans] = useState(props.plans);

  // Call setPlanID when props.plans are passed (beginning).
  useEffect(() => {
    //console.log('hi')
    console.log(props.plans)
    //console.log(props)
    const plans = props.plans;
    if(plans.length) {
      setPlans(props.plans);
      setPlanID(plans[0]._id);
      //setFitnesses(props.plans[0].days[0].fitnesses)
    }
  }, [props.plans]);

  useEffect(() => {
    console.log(plans)
    if(plans.length === 1) {
      setPlanID(plans[0]._id);
    }
    else if(plans.length >= 1){
      console.log('else')
      setPlanID(plans[0]._id);
    }
  },[plans])

  //Call loadDays(set days) when planID changes.
  useEffect(() => {
    if(planID !== "") {
      loadDays(planID);
      loadLastDay(planID);
      //console.log(planID)
    }
  }, [planID]);

  useEffect(() => {
    if(planID !== "") {
      loadDays(planID);
      loadLastDay(planID);
      //console.log(planID)
    }
  }, [dayID]);
  // Set dayID when days state changes.
  // useEffect(() => {
  //   if(days.length) setDayID(days[0]._id)
  // }, [days]);

  // Call loadFitnesses(set fitnesses) and loadFoods(set foods) when dayID changes.
  // useEffect(() => {
  //   if(dayID !== "") {
  //     loadDay(dayID);
  //     loadFitnesses(dayID);
  //     loadFoods(dayID);
  //   }
  // }, [dayID]);

  // Call setPreviousFitness(set previousFitness) when finessState changes.
  // useEffect(() => {
  //   //setPreviousFitness(fitnessState);
  // }, [fitnessState]);

  // Call setPreviousFood(set previousFood) when foodState changes.
  useEffect(() => {
    setPreviousFood(foodState);
  }, [foodState]);

  /* Plan(s) API call */
  // Load Plans of the user
  function getUserData(userID) {
    API.getUser(userID)
    .then(res => {
      console.log(res)
    })
  }

  function loadPlans(userID) {
    console.log('hi')

    API.getAllPlans(userID)
      .then(res => {
        setPlans(res.data)
        console.log(res.data)
      })
      .catch(err => {});
  };

  // Create Plan.
  function createPlan() {
    console.log('hi')

    const planData = {...planState, userID: userID};
    API.createPlan(planData)
    .then(res => {
      loadPlans(userID);
    })
    .catch(err => {})
  }

  // UpdatePlan.
  function updatePlan(planID) {
    console.log('hi')

    API.updatePlan(planID, planState)
    .then(res => {
      loadPlans(userID);
    })
    .catch(err => {})
  }

   // Delete Plan.
   function deletePlan(planID) {
    console.log('hi')

    API.deletePlan(planID)
    .then(res => {
      loadPlans(userID);
    })
    .catch(err => {})
  }

  /* Day(s) API call */
  // Load Days of the plan.
  function loadDays(planID) {
    setDays(props.plans.find( ({_id}) => _id === planID ).days)
  };

  // function loadDay(dayID) {
  //   console.log('thing')

  //   setBodyWeight(days.find( ({_id}) => _id === dayID ).bodyWeight)
  // }
  const loadLastDay = planID => {
    console.log('thing')
    const planInfo = props.plans.find( ({_id}) => _id === planID ).days
    const lastDay = planInfo[planInfo.length -1]
    if(lastDay.day === 1) {
      console.log("if")
      document.getElementById("bodyWeightForm").reset();
      document.getElementById("saveBodyWeightAlert").style.display = "none";
      //loadDay(lastDay._id);
    }
  }

  // Create Day.
  // function createDay(newDay) {
  //   console.log('hi')

  //   const dayData = {day: newDay, userID: userID, planID: planID};
  //   API.createDay(dayData)
  //   .then(res => {
  //     loadDays(planID);
  //     loadLastDay(planID);
  //   })
  //   .catch(err => {})
  // }

  // Update Day.
  // function updateDay(dayID) {
  //   // API.updateDay(dayID, bodyWeight)
  //   console.log('hi')
  //   API.updateDay(dayID, bodyWeightState)
  //   .then(res => {
  //     loadDays(planID);
  //     loadDay(dayID);
  //   })
  //   .catch(err => {})
  // }  

  // Delete Day.
  // function deleteDay(dayID) {
  //   console.log('hi')

  //   API.deleteDay(dayID)
  //   .then(res => {
  //     loadDays(planID);
  //     loadLastDay(planID);
  //   })
  //   .catch(err => {})
  // }

  /* Fitness(es) API call */
  // Load Fitnesses of the day.
  function loadFitnesses(dayID) {
    console.log(days.length)
    if (days.length > 0) {
      console.log(days.find( ({_id}) => _id === dayID ))
      setFitnesses(days.find( ({_id}) => _id === dayID ).fitnesses)
    }
  }

  // Load Fitness (single).
  // function loadFitness(fitnessID){
  //   //setFitnessState(props.)
  //   console.log(fitnessID)
  //   API.getFitness(fitnessID)
  //   .then(res => {
  //     setFitnessState(res.data);
  //   })
  //   .catch(err => {});
  // }

  // Create Fitness.
  // function createFitness(data) {
  //   console.log('hi')

  //   API.createFitness(data)
  //   .then(res => {
  //     loadFitnesses(dayID);
  //   })
  //   .catch(err => {})
  // }

  // Update Fitness.
  // function updateFitness(fitnessID) {
  //   console.log('hi')

  //   API.updateFitness(fitnessID, fitnessState)
  //   .then(res => {
  //     loadFitnesses(dayID);
  //   })
  //   .catch(err => {})
  // }

  // Delete Fitness.
  // function deleteFitness(fitnessID) {
  //   console.log('hi')

  //   API.deleteFitness(fitnessID)
  //   .then(res => {
  //     loadFitnesses(dayID);
  //   })
  //   .catch(err => {})
  // }

  /* Food(s) API call */
  // Load Foods of the day.
  // function loadFoods(dayID) {
  //   setFoods(days.find( ({_id}) => _id === dayID ).foods)
  // }

  // Load Food (single).
  function loadFood(foodID){
    console.log(foodID)
    API.getFood(foodID)
    .then(res => {
      setFoodState(res.data);
    })
    .catch(err => {});
  }

  // Create Food.
  // function createFood(data) {
  //   console.log('hi')

  //   API.createFood(data)
  //   .then(res => {
  //     loadFoods(dayID);
  //   })
  //   .catch(err => {})
  // }

  // Update Food.
  // function updateFood(foodID) {
  //   console.log('hi')

  //   API.updateFood(foodID, foodState)
  //   .then(res => {
  //     loadFoods(dayID);
  //   })
  //   .catch(err => {})
  // }

  // Delete Food.
  // function deleteFood(foodID) {
  //   console.log('hi')

  //   API.deleteFood(foodID)
  //   .then(res => {
  //     loadFoods(dayID);
  //   })
  //   .catch(err => {})
  // }

  /* Plan event handling */
  const handlePlanEntry = e => {
    console.log('hit')
    setPlanState({
      name: e.target.value
    });
  }

  const handlePlanChange = e => {
    const editPlanForm = document.getElementById("existingPlanNameForm");
    //document.getElementById("bodyWeightForm").reset();
    document.getElementById("saveBodyWeightAlert").style.display = "none";
    if(editPlanForm){
      editPlanForm.reset();
    }
    setPlanID(e.target.value);
    console.log(props.plans.find( ({_id}) => _id === planID ).days)
    
  }

  const handleSavePlan = e => {
    e.preventDefault();
    if(e.target.name === "createBtn") {
      if(document.getElementById("newPlanName").value === "") {
        document.getElementById("planAlert").style.display = "block";        
      } else {
        document.getElementById("planAlert").style.display = "none";
        createPlan();
        document.getElementById("newPlanNameForm").reset();
      }
    }
    else {    
      if(document.getElementById("existingPlanName").value === "") {
        document.getElementById("planEditAlert").style.display = "block";
      } else {
        document.getElementById("planEditAlert").style.display = "none";
        const planID = e.target.value;
        updatePlan(planID);
      }
    }
  }

  const handleDeletePlan = e => {
    const planID = e.target.value;
    deletePlan(planID);
  }

  /*  Day event handling  */
  const handleCurrentDay = e => {
    loadFitnesses(e)
    //console.log(e)
  }
  // const handleDayChange = e => {
  //   console.log('day change')
  //   const id = e.target.value;
  //   document.getElementById("bodyWeightForm").reset();
  //   document.getElementById("saveBodyWeightAlert").style.display = "none";
  //   setDayID(id);
  //   loadDay(id);
  // }

  // const handleSaveDay = e => {
  //   e.preventDefault();
  //   let last = 0;
  //   if(lastDay.length) last = parseInt(lastDay[0].day);
  //   const newDay = last + 1;
  //   createDay(newDay);
  // }

  // const handleBodyWeightEntry = e => {
  //   setBodyWeightState({
  //     bodyWeight: e.target.value
  //   });
  // }

  // const handleSaveBodyWeight = e => {
  //   e.preventDefault();
  //   const weight = document.getElementById("bodyWeight").value;
  //   if(isNaN(weight) || weight === "") {
  //     document.getElementById("saveBodyWeightAlert").style.display = "block";        
  //   } else {
  //     document.getElementById("saveBodyWeightAlert").style.display = "none";
  //     updateDay(dayID);
  //   }
  // }

  // const handleCancelEditBodyWeight = e => {
  //   e.preventDefault();
  //   document.getElementById("bodyWeightForm").reset();
  //   document.getElementById("saveBodyWeightAlert").style.display = "none";
  // }

  // const handleDeleteDay = e => {
  //   const dayID = lastDay[0]._id;
  //   deleteDay(dayID);
  // }

  /* Fitness event handling */
  // const handleSetFitness = e => {
  //   console.log(e)
  //   if(e.target.name === "new") {
  //     console.log("hitnew")

  //     setFitnessState(initialFitnessState);
  //   } 
  //   else {
  //     const fitnessID = e.target.name;
  //     console.log("hitelse")

  //     loadFitness(fitnessID);
  //   }
  // }

  // const handleFitnessEntry = e => {
  //   console.log('hit')
  //   setFitnessState({
      
  //     [e.target.name]: e.target.value
  //   });
  // }

  // const handleSaveFitness = e => {
  //   e.preventDefault();
  //   if(e.target.name === "createBtn") {
  //     const type = e.target.value;
  //     const fitnessData = {...fitnessState, type:type, userID: userID, planID: planID, dayID: dayID};

  //     if(type === "strength") {
  //       if(fitnessData.workout === "" || isNaN(fitnessData.weight) || isNaN(fitnessData.sets) || isNaN(fitnessData.reps)) {
  //         document.getElementById("strengthSaveAlert").style.display = "block"; 
  //       } else {
  //         document.getElementById("strengthSaveAlert").style.display = "none";
  //         document.getElementById("activitySaveAlert").style.display = "none";
  //         clearFitness(); // Reset the fitnessState with the initial values.
  //         createFitness(fitnessData);
  //         document.getElementById('newStrength').reset();
  //         document.getElementById('newActivity').reset();
  //       }
  //     } else {
  //       if(fitnessData.workout === "" || isNaN(fitnessData.distance) || isNaN(fitnessData.time)) {
  //         document.getElementById("activitySaveAlert").style.display = "block"; 
  //       } else {
  //         document.getElementById("strengthSaveAlert").style.display = "none";
  //         document.getElementById("activitySaveAlert").style.display = "none";
  //         clearFitness(); // Reset the fitnessState with the initial values.
  //         createFitness(fitnessData);
  //         document.getElementById('newStrength').reset();
  //         document.getElementById('newActivity').reset();
  //       }
  //     }
  //   }
  //   else {
  //     const fitnessID = e.target.value;
  //     updateFitness(fitnessID);
  //   }
  // }

  // const handleDeleteFitness = e => {
  //   // e.preventDefault();
  //   const fitnessID = e.target.value;
  //   deleteFitness(fitnessID);
  // }

  // const clearFitness = () => {
  //   setFitnessState(initialFitnessState);
  // }

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

  // const handleSaveFood = e => {
  //   e.preventDefault();
  //   if(e.target.name === "createBtn") {
  //     const foodData = {...foodState, userID: userID, planID: planID, dayID: dayID};
  //     if(foodData.item === "" || isNaN(foodData.calories) || isNaN(foodData.price)) {
  //       document.getElementById("foodSaveAlert").style.display = "block"; 
  //     } else {
  //       document.getElementById("foodSaveAlert").style.display = "none";
  //       clearFood();  // Reset the foodState with the initial values.
  //       createFood(foodData);
  //       document.getElementById('newFood').reset();
  //     }
  //   }
  //   else {
  //     const foodID = e.target.value;
  //     updateFood(foodID);
  //   }
  // }

  // const handleDeleteFood = e => {
  //   // e.preventDefault();
  //   const foodID = e.target.value;
  //   deleteFood(foodID);
  // }

  const clearFood = () => {
    setFoodState(initialFoodState);
  }

  return (
    <Card className="everythingTracker containerCard col-sm-12 col-lg-8 col-xl-6 mx-auto">
      <div>
        <Row>
          <Col xsm={12} sm={10}>
            <h1>{props.nickname}'s BBF Tracker</h1>
          </Col>
          <Col xsm={12} sm={2} className="text-right">
            <Link to="/logout">
              <Button type="button">
                  Logout
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
      <div>
        <Plan
          // plans={props.plans}
          plans={plans}
          selectedPlan={planID}
          handlePlanChange={handlePlanChange}
          handlePlanEntry={handlePlanEntry}
          handleSavePlan={handleSavePlan}
          handleDeletePlan={handleDeletePlan}
        />
        {/* <Dashboard 
          userID={userID}
          planID={planID}
          days={days}
          fitnesses={fitnesses}
          foods={foods}

        /> */}
        <Card className="dataEntry containerCard">
        {plans.length > 0 ?
          <Day 
            current={dayID}
            days={days}
            lastDay={lastDay}
            handleCurrentDay={handleCurrentDay}
            //bodyWeight={bodyWeight}
            //handleDayChange={handleDayChange}
            //handleSaveDay={handleSaveDay}
            //handleDeleteDay={handleDeleteDay}
            //handleBodyWeightEntry={handleBodyWeightEntry}
            //handleSaveBodyWeight={handleSaveBodyWeight}
            //handleCancelEditBodyWeight={handleCancelEditBodyWeight}
          />
          : null
        }
        <br/>

        {days.length > 0 ?
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
                      // handleSetFitness={handleSetFitness}
                      // handleFitnessEntry={handleFitnessEntry}
                      // handleSaveFitness={handleSaveFitness}
                      // handleDeleteFitness={handleDeleteFitness}
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
                      //handleSaveFood={handleSaveFood}
                      //handleDeleteFood={handleDeleteFood}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
          : null
        }
        </Card>
      </div>
    </Card>
  );
}

export default EverythingTracker;