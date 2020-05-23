import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import API from "../Utils/API";
import "./style.css";

am4core.useTheme(am4themes_animated);

function Dashboard(props) {
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

  const createXYChartData = (data) => {
    const daysData = data.map(day => {
      return {day:day.day, bodyWeight: day.bodyWeight};
    });
    return daysData;
  }

  const xyChartData = createXYChartData(props.days);

  let iconPath = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z";

  useEffect(() => {
    getTotalCaloriesAndMoney(props.planID);
    getTotalWeightMoved(props.planID);
  }, [props.planID, props.fitnesses, props.foods]);

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
  }, [xyChartData])

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
    
    // series.orientation = "horizontal";
    //series.bottomRatio = 1;

    // chart.legend = new am4charts.Legend();
    // chart.legend.position = "left";
    // chart.legend.valign = "bottom";
    // chart.legend.margin(5,5,5,5);
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
    
    // chart.legend = new am4charts.Legend();
    // chart.legend.position = "left";
    // chart.legend.valign = "bottom";
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
    image.href = "https://www.amcharts.com/lib/images/star.svg";
    image.width = 30;
    image.height = 30;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
  }

  const getTotalWeightMoved = planID => {
    API.getAllFitnesses(planID)
    .then(res => {
      const fitnessData = res.data;
      let total = 0;
      if(fitnessData.length) {
        const weights = fitnessData.map(fitness => {
          let weight;
          if(fitness.weight > 0) weight = fitness.weight;
          else weight = 1;
          return weight * fitness.sets * fitness.reps;
        });
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
      <Row>
      <Col sm={12} lg={6}>
        <Card>
          <h3>Everything Chart</h3>
          <div id="funnelChart"></div>
        </Card>
      </Col>
      <Col sm={12} lg={6}>
        <Card>
          <h3>Everything Tree</h3>
          <div id="forceDirectedTree"></div>
        </Card>
      </Col>
      <Col sm={12} lg={6}>
        <Card>
          <h3>What You Are</h3>
          <div id="pictorialStackedChart"></div>
        </Card>
      </Col>
      <Col sm={12} lg={6}>
        <Card>
          <h3>Body Weight by Day</h3>
          <div id="xyChart"></div>
        </Card>
      </Col>
      <Col sm={12} lg={6}>
        <Card id="dataSummary">
          <h3>Total Calories: <span className="calcResult">{totalCalories} cal</span></h3>
          <h3>Total Money Spent: <span className="calcResult">$ {totalMoneySpent}</span></h3>
          <h3>Total Weight Moved: <span className="calcResult">{totalWeightMoved} lbs</span></h3>
        </Card>
      </Col>
      </Row>
    </Card>
  );
}

export default Dashboard;