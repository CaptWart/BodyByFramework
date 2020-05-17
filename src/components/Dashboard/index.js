import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import API from "../Utils/API";
import "./style.css";

function Dashboard(props) {
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalWeightMoved, setTotalWeightMoved] = useState(0);
  const [totalMoneySpent, setTotalMoneySpent] = useState(0);

  useEffect(() => {
    getTotalCaloriesAndMoney(props.planID);
    getTotalWeightMoved(props.planID);
  }, [props.planID])

  const getTotalCaloriesAndMoney = planID => {
    API.getAllFoods(planID)
    .then(res => {
      const foodData = res.data;
      let totalCal = 0;
      let totalPrice = 0;
        if(foodData.length) {
        const calories = foodData.map(food => food.calories);
        totalCal= calories.reduce((acc, cur) => acc + cur);

        const prices = foodData.map(food => food.price);
        totalPrice = prices.reduce((acc, cur) => acc + cur);
      }
      setTotalCalories(totalCal);
      setTotalMoneySpent(totalPrice);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const getTotalWeightMoved = planID => {
    API.getAllFitnesses(planID)
    .then(res => {
      const fitnessData = res.data;
      let total = 0;
      if(fitnessData.length) {
        const weights = fitnessData.map(fitness => fitness.weight * fitness.sets * fitness.reps);
        total = weights.reduce((acc, cur) => acc + cur);
      }
      setTotalWeightMoved(total);
    })
  }

  return (
    <Card className="containerCard">
      <h2>Dashboard</h2>
      <h3>Total Calories: <span className="calcResult">{totalCalories} cal</span></h3>
      <h3>Total Money Spent: <span className="calcResult">$ {totalMoneySpent}</span></h3>
      <h3>Total Weight Moved: <span className="calcResult">{totalWeightMoved} lbs</span></h3>
    </Card>
  );
}

export default Dashboard;