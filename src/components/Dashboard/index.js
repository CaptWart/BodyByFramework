import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import domtoimage from "dom-to-image";
import { saveAs } from 'file-saver';
import API from "../Utils/API";
import "./style.css";

am4core.useTheme(am4themes_animated);

function Dashboard(props) {
  const imgCount = 0;
  const [allFitnesses, setAllFitnesses] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [totalWeightMoved, setTotalWeightMoved] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalMoneySpent, setTotalMoneySpent] = useState(0);

  const slicedChartData = [{
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

  const forceDirectedTreeData =  [{
    name: "Core",
    children: [
      {
        name: "Weight",
        children: [
          { name: "Moved", value: totalWeightMoved },
          { name: "Lost", value: 60 },
          { name: "Gained", value: 60 }
        ]
      },
      {
        name: "Food",
        children: [
          { name: "Calories", value: totalCalories },
          { name: "Money", value: totalMoneySpent }
        ]
      }
    ]
  }];

  const createXYChartData = data => {
    const daysData = data.map(day => {
      return {day:day.day, bodyWeight: day.bodyWeight};
    });
    return daysData;
  }

  const xyChartData = createXYChartData(props.days);

  const createPieChartData = data => {
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

  const pieChartData = createPieChartData(allFitnesses);

  let iconPath = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z";

  useEffect(() => {
    loadAllFoods(props.planID);
    loadAllFitnesses(props.planID);
  }, [props.planID, props.fitnesses, props.foods]);

  useEffect(() => {
    getTotalWeightMoved(allFitnesses);
  }, [allFitnesses]);

  useEffect(() => {
    getTotalCaloriesAndMoney(allFoods);
  }, [allFoods]);

  useEffect(() => {
    createFunnelChart(slicedChartData);
    createPictorialStackedChart(slicedChartData);
    return () => {
      am4core.disposeAllCharts();
    }
  }, [slicedChartData]);

  useEffect(() => {
    createForceDirectedTree(forceDirectedTreeData);
    return () => {
      am4core.disposeAllCharts();
    }
  }, [forceDirectedTreeData]);

  useEffect(() => {
    createXYChart(xyChartData);
    return () => {
      am4core.disposeAllCharts();
    }
  }, [xyChartData]);

  useEffect(() => {
    createPieChart(pieChartData);
    return () => {
      am4core.disposeAllCharts();
    }
  }, [pieChartData]);

  const createFunnelChart = data => {
    let chart = am4core.create("funnelChart", am4charts.SlicedChart);
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
  }

  const createForceDirectedTree = data => {
    let chart = am4core.create("forceDirectedTree", am4plugins_forceDirected.ForceDirectedTree);
    let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
    
    chart.data = data;
    
    networkSeries.dataFields.value = "value";
    networkSeries.dataFields.name = "name";
    networkSeries.dataFields.children = "children";
    networkSeries.nodes.template.tooltipText = "{name}:{value}";
    networkSeries.nodes.template.fillOpacity = 1;
    
    networkSeries.nodes.template.label.text = "{name}"
    networkSeries.fontSize = 10;
    
    networkSeries.links.template.strokeWidth = 1;
    
    let hoverState = networkSeries.links.template.states.create("hover");
    hoverState.properties.strokeWidth = 3;
    hoverState.properties.strokeOpacity = 1;
    
    networkSeries.nodes.template.events.on("over", function(event) {
      event.target.dataItem.childLinks.each(function(link) {
        link.isHover = true;
      })
      if (event.target.dataItem.parentLink) {
        event.target.dataItem.parentLink.isHover = true;
      }
    })
    
    networkSeries.nodes.template.events.on("out", function(event) {
      event.target.dataItem.childLinks.each(function(link) {
        link.isHover = false;
      })
      if (event.target.dataItem.parentLink) {
        event.target.dataItem.parentLink.isHover = false;
      }
    })    
  }

  const createPictorialStackedChart = data => {
    let chart = am4core.create("pictorialStackedChart", am4charts.SlicedChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
    
    chart.data = data;
    
    let series = chart.series.push(new am4charts.PictorialStackedSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "name";
    series.alignLabels = true;
    
    series.maskSprite.path = iconPath;
    series.ticks.template.locationX = 1;
    series.ticks.template.locationY = 0.5;
    
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

    // Add simple bullet
    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    let image = bullet.createChild(am4core.Image);
    // image.href = "https://www.amcharts.com/lib/images/star.svg";
    image.href = "/star.png";
    image.width = 30;
    image.height = 30;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
  }

  const createPieChart = data => {
    let chart = am4core.create("pieChart", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = data;

    chart.innerRadius = am4core.percent(40);
    chart.depth = 120;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "nums";
    series.dataFields.depthValue = "nums";
    series.dataFields.category = "workout";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;
  }

  const loadAllFitnesses = planID => {
    API.getAllFitnesses(planID)
    .then(res => {
      setAllFitnesses(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  const loadAllFoods = planID => {
    API.getAllFoods(planID)
    .then(res => {
      setAllFoods(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // Calculate total weight moved
  const getTotalWeightMoved = data => {
    let total = 0;
    if(data.length) {
      const weights = data.map(fitness => {
        let weight;
        if(fitness.weight > 0) weight = fitness.weight;
        else weight = 1;
        return weight * fitness.sets * fitness.reps;
      });
      total = weights.reduce((acc, cur) => acc + cur);
    }
    setTotalWeightMoved(total);
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
    setTotalMoneySpent(totalPrice);
  }

  // Chart checkbox event handling
  const handleChartSelect = e => {
    console.log("e.target.checked: ", e.target.checked);
    const chartID = e.target.getAttribute("data-id");
    const chartImg = document.getElementById(chartID);
    const saveImage = document.getElementById("imageToSave");
    
    if(e.target.checked) {
      domtoimage.toPng(chartImg)
      .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          img.setAttribute("id", `${chartID}-img`);
          saveImage.appendChild(img);
          console.log("saveImage: ", document.getElementById('imageToSave'));
      })
      .catch(err => {
          console.error('oops, something went wrong!', err);
      });
    } else {
      saveImage.removeChild(document.getElementById(`${chartID}-img`));
    }
  }

  // Save(download) the image(png) of selected charts
  const saveImage = e => {
    const finalImg = document.getElementById('imageToSave');

    domtoimage.toBlob(finalImg)
    .then(function (blob) {
        saveAs(blob, 'chartImage.png');
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <Card className="containerCard">
      <h2>Dashboard</h2>
      <Button variant="primary" size="small" onClick={saveImage}>Save Chart Image</Button>
      <Card id="imageToSave"></Card>
      <Row>
      <Col sm={12} lg={6}>
        <Card>
          <Row>
          <Col xsm={10}><h3>Everything Chart</h3></Col>
          <Col xsm={2} className="text-right"><input data-id="funnelChart" type="checkbox" onClick={handleChartSelect}></input></Col>
          </Row>
          <div id="funnelChart" class="chart" ></div>
        </Card>
      </Col>
      <Col sm={12} lg={6}>
        <Card>
          <Row>
            <Col xsm={10}><h3>Everything Tree</h3></Col>
            <Col xsm={2} className="text-right"><input data-id="forceDirectedTree" type="checkbox" onClick={handleChartSelect}></input></Col>
          </Row>
          <div id="forceDirectedTree" class="chart" ></div>
        </Card>
      </Col>
      <Col sm={12} lg={6}>
        <Card>
          <Row>
            <Col xsm={10}><h3>What You Are</h3></Col>
            <Col xsm={2} className="text-right"><input data-id="pictorialStackedChart" type="checkbox" onClick={handleChartSelect}></input></Col>
          </Row>
          <div id="pictorialStackedChart" class="chart" ></div>
        </Card>
      </Col>
      <Col sm={12} lg={6}>
        <Card>
          <Row>
            <Col xsm={10}><h3>Body Weight by Day</h3></Col>
            <Col xsm={2} className="text-right"><input data-id="xyChart" type="checkbox" onClick={handleChartSelect}></input></Col>
          </Row>
          <div id="xyChart" class="chart" ></div>
        </Card>
      </Col>
      <Col sm={12} lg={6}>
        <Card>
          <Row>
            <Col xsm={10}><h3>Fitness Pie Chart</h3></Col>
            <Col xsm={2} className="text-right"><input data-id="pieChart" type="checkbox" onClick={handleChartSelect}></input></Col>
          </Row>
          <div id="pieChart" class="chart" ></div>
        </Card>
      </Col>
      <Col sm={12} lg={6}>
        <Card>
          <Row>
            <Col xsm={10}><h3>Data Summary</h3></Col>
            <Col xsm={2} className="text-right"><input data-id="dataSummary" type="checkbox" onClick={handleChartSelect}></input></Col>
          </Row>
          <div id="dataSummary" class="chart" >
            <h3>Total Calories: <span className="calcResult">{totalCalories} cal</span></h3>
            <h3>Total Money Spent: <span className="calcResult">$ {totalMoneySpent}</span></h3>
            <h3>Total Weight Moved: <span className="calcResult">{totalWeightMoved} lbs</span></h3>
          </div>
        </Card>
      </Col>
      </Row>
    </Card>
  );
}

export default Dashboard;