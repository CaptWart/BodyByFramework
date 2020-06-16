import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Accordion } from "react-bootstrap";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import * as am4plugins_sliceGrouper from "@amcharts/amcharts4/plugins/sliceGrouper"; 
import domtoimage from "dom-to-image";
import { saveAs } from 'file-saver';
import API from "../Utils/API";
import "./style.css";

am4core.useTheme(am4themes_material);

function Dashboard(props) {
  const [allFitnesses, setAllFitnesses] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [totalWeightMoved, setTotalWeightMoved] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalMoneySpent, setTotalMoneySpent] = useState(0);
  const [selectedDataID, setSelectedDataID] = useState("");
  const [showAlert, setShowAlert] = useState("none");

  const loadAllFitnesses = planID => {
    API.getAllFitnesses(planID)
    .then(res => {
      setAllFitnesses(res.data);
    })
    .catch(err => {});
  }

  const loadAllFoods = planID => {
    API.getAllFoods(planID)
    .then(res => {
      setAllFoods(res.data);
    })
    .catch(err => {});
  }

  // Calculate total weight moved
  const getTotalFitnessVals = data => {
    let weightTotal = 0;
    let distTotal = 0;
    let timetotal = 0;

    if(data.length) {
      const weights = data.map(fitness => {
        let weight;
        if(fitness.weight > 0) weight = fitness.weight;
        else weight = 1;
        return weight * fitness.sets * fitness.reps;
      });
      weightTotal = weights.reduce((acc, cur) => acc + cur);

      const distance = data.map(fitness => {
        return fitness.distance;
      });
      distTotal = distance.reduce((acc, cur) => acc + cur);

      const time = data.map(fitness => {
        return fitness.time;
      });
      timetotal = time.reduce((acc, cur) => acc + cur);
    }
    setTotalWeightMoved(weightTotal);
    setTotalDistance(distTotal);
    setTotalTime(timetotal);
  }

  // Calculate total calories and money spent
  const getTotalCaloriesAndMoney = data => {
    let totalCal = 0;
    let totalPrice = 0;
      if(data.length) {
      const calories = data.map(food => food.calories);
      totalCal= calories.reduce((acc, cur) => acc + cur);

      const prices = data.map(food => food.price);
      totalPrice = prices.reduce((acc, cur) => acc + cur);
    }
    setTotalCalories(totalCal);
    setTotalMoneySpent(totalPrice.toFixed(2));
  }

  const createXYChartData = data => {
    if(data.length) {
      const daysData = data.map(day => {
        return {day:day.day, bodyWeight: day.bodyWeight};
      });
      return daysData;
    }
  }

  const xyChartData = createXYChartData(props.days);

  const createNumWorkoutData = data => {
    if(data.length) {
      const workoutArr = data.map(fitness => {return fitness.workout});
      const numWorkouts = [];
      workoutArr.forEach(currWorkout => {
        const numExist = numWorkouts.filter(item => item.workout === currWorkout);
        if(numExist.length === 0) {
          const numItems = workoutArr.filter(workout => workout === currWorkout);
          const uniqueWorkout = {workout: currWorkout, nums: numItems.length};
          numWorkouts.push(uniqueWorkout);
        }
      });
      return numWorkouts;
    }
  }

  const numWorkoutData = createNumWorkoutData(allFitnesses);

  const createFavoriteWorkouts = data => {
    let favorites = [];
    let length = 0;
    if(data) {
      favorites = data;
      length = favorites.length;
    }
    if(length < 3) {
      for(let i = length; i < 3; i++) {
        const item = {workout: "---", nums: 0};
        favorites.push(item);
      }
    }
    favorites.sort((a, b) => (a.nums < b.nums) ? 1 : (a.nums === b.nums) ? ((a.workout > b.workout) ? 1 : -1) : -1);
    return favorites;
  }

  const favoriteWorkouts = createFavoriteWorkouts(numWorkoutData);

  const createCaloriesData = data => {
    if(data.length) {
      const calorieArr = data.map(food => {
        return { name: food.item, value: food.calories };
      });

      let holder = {};

      calorieArr.forEach(item => {
        if (holder.hasOwnProperty(item.name)) {
          holder[item.name] = holder[item.name] + item.value;
        } else {
          holder[item.name] = item.value;
        }
      });

      const dataArr = [];

      for (var prop in holder) {
        dataArr.push({ name: prop, value: holder[prop] });
      }
      dataArr.sort((a, b) => (a.value < b.value) ? 1 : (a.value === b.value) ? ((a.name > b.name) ? 1 : -1) : -1);
      return dataArr;
    }
  }

  const caloriesData = createCaloriesData(allFoods);

  const createNumFoodData = data => {
    if(data.length) {
      const foodArr = data.map(food => {return food.item});
      const numFoods = [];
      foodArr.forEach(currFood => {
        const numExist = numFoods.filter(item => item.item === currFood);
        if(numExist.length === 0) {
          const numItems = foodArr.filter(food => food === currFood);
          const uniqueFood = {item: currFood, nums: numItems.length};
          numFoods.push(uniqueFood);
        }
      });
      return numFoods;
    }
  }

  const numFoodData = createNumFoodData(allFoods);

  const createFavoriteFoods = data => {
    let favorites = [];
    let length = 0;
    if(data) {
      favorites = data;
      length = favorites.length;
    }
    if(length < 3) {
      for(let i = length; i < 3; i++) {
        const item = {item: "---", nums: 0};
        favorites.push(item);
      }
    }
    favorites.sort((a, b) => (a.nums < b.nums) ? 1 : (a.nums === b.nums) ? ((a.item > b.item) ? 1 : -1) : -1);
    return favorites;
  }

  const favoriteFoods = createFavoriteFoods(numFoodData);

  const createWeeklyAverageData = (weeks, total) => {
    let average = 0;
    if(total) {
      if(weeks > 1) {
        average = Math.floor(total / weeks);
      }
      else {
        average = total;
      }
    }
    return average;
  }

  const numWeeks = props.days.length / 7;
  const averageWeightMoved = createWeeklyAverageData(numWeeks, totalWeightMoved);
  const averageCalories = createWeeklyAverageData(numWeeks, totalCalories);
  const averageMoneySpent = createWeeklyAverageData(numWeeks, totalMoneySpent);
  const averageDistance = createWeeklyAverageData(numWeeks, totalDistance);
  const averageTime = createWeeklyAverageData(numWeeks, totalTime);

  let iconPath = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z";

  useEffect(() => {
    loadAllFoods(props.planID);
    loadAllFitnesses(props.planID);
  }, [props.planID, props.fitnesses, props.foods]);

  useEffect(() => {
    getTotalFitnessVals(allFitnesses);
  }, [allFitnesses]);

  useEffect(() => {
    getTotalCaloriesAndMoney(allFoods);
  }, [allFoods]);

  useEffect(() => {
    createPictorialStackedChart(caloriesData);
    return () => {
      am4core.disposeAllCharts();
    }
  }, [caloriesData]);

  useEffect(() => {
    createXYChart(xyChartData);
    return () => {
      am4core.disposeAllCharts();
    }
  }, [xyChartData]);

  useEffect(() => {
    createFunnelChart(numWorkoutData);
    return () => {
      am4core.disposeAllCharts();
    }
  }, [numWorkoutData]);

  const createPictorialStackedChart = data => {
    let chart = am4core.create("pictorialStackedChart", am4charts.SlicedChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
    
    chart.data = data;
    
    let series = chart.series.push(new am4charts.PictorialStackedSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "name";
    series.alignLabels = false;

    let grouper = series.plugins.push(new am4plugins_sliceGrouper.SliceGrouper());
    // grouper.threshold = 5;
    grouper.threshold = 3;
    grouper.groupName = "Other";
    grouper.clickBehavior = "break";

    series.maskSprite.path = iconPath;
    series.ticks.template.locationX = 1;
    series.ticks.template.locationY = 0.5;

    chart.defaultState.transitionDuration = 0;
    
    series.labelsContainer.width = 200;
  }

  const createXYChart = data => {
    // Create chart instance
    let chart = am4core.create("xyChart", am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    let xValueAxis = chart.xAxes.push(new am4charts.ValueAxis());

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = "bodyWeight";
    lineSeries.dataFields.valueX= "day";
    lineSeries.name = "Body Weight";
    lineSeries.strokeWidth = 2;

    chart.defaultState.transitionDuration = 0;

    let label = chart.createChild(am4core.Label);
    label.text = "Body Weight by Day";
    label.fontSize = "1em";
    label.align = "center";   
  }

  const createFunnelChart = data => {
    let chart = am4core.create("funnelChart", am4charts.SlicedChart);
    chart.hiddenState.properties.opacity = 0;
    chart.responsive.enabled = true;

    chart.data = data;

    chart.defaultState.transitionDuration = 0;
    
    let series = chart.series.push(new am4charts.FunnelSeries());
    series.colors.step = 2;
    series.dataFields.value = "nums";
    series.dataFields.category = "workout";
    series.alignLabels = true;

    let grouper = series.plugins.push(new am4plugins_sliceGrouper.SliceGrouper());
    // grouper.threshold = 10;
    grouper.threshold = 5;
    grouper.groupName = "Other";
    grouper.clickBehavior = "break";
  }

  // Chart checkbox event handling
  const handleChartSelect = e => {
    const dataID = e.target.getAttribute("data-id");
    setSelectedDataID(dataID);
  }

  // Save(download) the image(png) of selected charts
  const saveImage = e => {
    if(selectedDataID !== "") {
      const dataImg = document.getElementById(selectedDataID);
      
      domtoimage.toBlob(dataImg)
      .then(function (blob) {
          saveAs(blob, 'BBF-data-image.jpeg');
          setShowAlert("none");
      })
      .catch(err => {});
    } else {
      setShowAlert("block");
    }
  }

  return (
    <Accordion defaultActiveKey="1">
      <Card className="dashboard">
      <Card.Header>
        <Accordion.Toggle as={ Button }  variant="link" eventKey="0"><h2>Charts</h2></Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">  
        <Card.Body>
          <Row>
          {/* Total Plan Data Summary */}
          <Col sm={12} lg={6}>
            <Card className="p-2">
              <Col xsm={12} className="text-right">
                  <input data-id="totalDataSummary" type="radio" name="dataSelection" onClick={handleChartSelect}></input>
              </Col><br/>
              <div id="totalDataSummary" className="dispData" >
                <h3>Total Plan Data Summary</h3>
                <h4>Total Calories: <span className="calcResult">{totalCalories} cal</span></h4>
                <h4>Total Money Spent: <span className="calcResult">$ {totalMoneySpent}</span></h4>
                <h4>Total Weight Moved: <span className="calcResult">{totalWeightMoved} lbs</span></h4>
                <h4>Total Distance: <span className="calcResult">{totalDistance} m</span></h4>
                <h4>Total Activity Time: <span className="calcResult">{totalTime} mins</span></h4>
              </div>
            </Card>
          </Col>
          {/* Weekly Average */}
          <Col sm={12} lg={6}>
            <Card className="p-2">
              <Col xsm={12} className="text-right">
                  <input data-id="weeklyAverage" type="radio" name="dataSelection" onClick={handleChartSelect}></input>
              </Col><br/>
              <div id="weeklyAverage" className="dispData" >
                <h3>Weekly Average</h3>
                <h4>Calories: <span className="calcResult">{averageCalories} cal</span></h4>
                <h4>Money Spent: <span className="calcResult">$ {averageMoneySpent}</span></h4>
                <h4>Weight Moved: <span className="calcResult">{averageWeightMoved} lbs</span></h4>
                <h4>Distance: <span className="calcResult">{averageDistance} m</span></h4>
                <h4>Activity Time: <span className="calcResult">{averageTime} mins</span></h4>
              </div>
            </Card>
          </Col>
          {/* Your Favorite Workouts */}
          <Col sm={12} lg={6}>
            <Card className="p-2">
              <Col xsm={12} className="text-right">
                  <input data-id="favoriteWorkouts" type="radio" name="dataSelection" onClick={handleChartSelect}></input>
              </Col><br/>
              <div id="favoriteWorkouts" className="dispData" >
                <h3>Your Top 3 Favorite Workouts</h3>
                <h4>#1: <span className="calcResult">{favoriteWorkouts[0].workout} - {favoriteWorkouts[0].nums}</span></h4>
                <h4>#2: <span className="calcResult">{favoriteWorkouts[1].workout} - {favoriteWorkouts[1].nums}</span></h4>
                <h4>#3: <span className="calcResult">{favoriteWorkouts[2].workout} - {favoriteWorkouts[2].nums}</span></h4>
              </div>
            </Card>
          </Col>
          {/* Your Favorite Foods */}
          <Col sm={12} lg={6}>
            <Card className="p-2">
              <Col xsm={12} className="text-right">
                  <input data-id="favoriteFoods" type="radio" name="dataSelection" onClick={handleChartSelect}></input>
              </Col><br/>
              <div id="favoriteFoods" className="dispData" >
                <h3>Your Top 3 Favorite Foods</h3>
                <h4>#1: <span className="calcResult">{favoriteFoods[0].item} - {favoriteFoods[0].nums}</span></h4>
                <h4>#2: <span className="calcResult">{favoriteFoods[1].item} - {favoriteFoods[1].nums}</span></h4>
                <h4>#3: <span className="calcResult">{favoriteFoods[2].item} - {favoriteFoods[2].nums}</span></h4>
              </div>
            </Card>
          </Col>
          {/* What You Are Made Out Of */}
          <Col sm={12} lg={6}>
            <Card className="p-2">
              <Row>
                <Col xsm={10}><h3>What You Are</h3></Col>
                <Col xsm={2} className="text-right">
                  <input data-id="pictorialStackedChart" type="radio" name="dataSelection" onClick={handleChartSelect}></input>
                </Col>
              </Row>
              <div id="pictorialStackedChart" className="dispData" ></div>
            </Card>
          </Col>
          {/* Body Weight by Day */}
          <Col sm={12} lg={6}>
            <Card>
              <Row>
                <Col xsm={10}><h3>Body Weight by Day</h3></Col>
                <Col xsm={2} className="text-right">
                  <input data-id="xyChart" type="radio" name="dataSelection" onClick={handleChartSelect}></input>
                </Col>
              </Row>
              <div id="xyChart" className="dispData" ></div>
            </Card>
          </Col>
          <Col sm={12} lg={12}>
            <Card>
              <Row>
              <Col xsm={10}><h3>Your Fitness Chart</h3></Col>
              <Col xsm={2} className="text-right">
                <input data-id="funnelChart" type="radio" name="dataSelection" onClick={handleChartSelect}></input>
              </Col>
              </Row>
              <div id="funnelChart" className="funnelData" ></div>
            </Card>
          </Col>
          </Row>
          <div id="saveImgAlert" className="alert" style={{display: showAlert}}>You have not selected a data image to save.</div>
          <Button variant="primary" className="m-auto" onClick={saveImage}>Save Selected Data Image</Button>
        </Card.Body>
      </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Dashboard;