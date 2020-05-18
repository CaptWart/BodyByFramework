import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import API from "../Utils/API";
import "./style.css";

am4core.useTheme(am4themes_animated);

function Dashboard(props) {
  const [totalWeightMoved, setTotalWeightMoved] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalMoneySpent, setTotalMoneySpent] = useState(0);

  const data = [{
    "name": "Total Weight Moved",
    "value": totalWeightMoved
  }, 
  {
    "name": "Total Calories",
    "value": totalCalories
  }, 
  {
    "name": "Total Money Spent",
    "value": totalMoneySpent
  }];

  useEffect(() => {
    getTotalCaloriesAndMoney(props.planID);
    getTotalWeightMoved(props.planID);    
  }, [props.planID]);

  useEffect(() => {
    return () => {
      am4core.disposeAllCharts();
    }
  }, []);

  useEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.SlicedChart);
    chart.hiddenState.properties.opacity = 0;
    chart.responsive.enabled = true;

    chart.data = data;
    
    let series = chart.series.push(new am4charts.FunnelSeries());
    series.colors.step = 2;
    series.dataFields.value = "value";
    series.dataFields.category = "name";
    series.alignLabels = true;
    
    series.labelsContainer.paddingLeft = 15;
    series.labelsContainer.width = 200;
    
    // series.orientation = "horizontal";
    //series.bottomRatio = 1;

    // chart.legend = new am4charts.Legend();
    // chart.legend.position = "left";
    // chart.legend.valign = "bottom";
    // chart.legend.margin(5,5,5,5);
  }, [data]);
 
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

  return (
    <Card className="containerCard">
      <h2>Dashboard</h2>
      <div id="chartdiv">

      </div>
      <h3>Total Calories: <span className="calcResult">{totalCalories} cal</span></h3>
      <h3>Total Money Spent: <span className="calcResult">$ {totalMoneySpent}</span></h3>
      <h3>Total Weight Moved: <span className="calcResult">{totalWeightMoved} lbs</span></h3>
    </Card>
  );
}

export default Dashboard;