import axios from "axios";

export default {
  /* User */
  // Gets all users
  getAllUsers: function() {
    return axios.get("localhost:3001/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("localhost:3001/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("localhost:3001/api/users/" + id);
  },
  /* Plan */
  // Get all plans with the given userID
  getAllPlans: function(userID) {
    return axios({
      method: 'get',
      url: "http://localhost:3001/api/plans",
      // withCredentials: true,
      params: {
        userID: userID
      }
    });
  },
  // Get the plan with the given id
  getPlan: function(id) {
    return axios.get("http://localhost:3001/api/plans/" + id );
  },
  // Create the plan with the given data
  createPlan: function(planData) {
    return axios.post("http://localhost:3001/api/plans", planData);
  },
  // Update the plan with the given id and data
  updatePlan: function(id, planData) {
    return axios.put("http://localhost:3001/api/plans/" + id, planData);
  },
  // Delete the plan witht he given id
  deletePlan: function(id) {
    return axios.delete("http://localhost:3001/api/plans/" + id);
  },
  /* Day */
  // Get all days with the given planID
  getAllDays: function(planID) {
    return axios({
      method: 'get',
      url: "http://localhost:3001/api/days",
      // withCredentials: true,
      params: {
        planID: planID
      }
    });
  },
  // Get the day with the given id
  getDay: function(id) {
    // return axios.get("http://localhost:3001/api/days/" + id );
    return axios({
      method: 'get',
      url: "http://localhost:3001/api/days/id",
      // withCredentials: true,
      params: {
        _id: id
      }
    });
  },
  // Get the last day of the plan
  getLastDay: function(planID) {
    return axios({
      method: 'get',
      url: "http://localhost:3001/api/days/last",
      // withCredentials: true,
      params: {
        planID: planID
      }
    });
  },
  // Create the day with the given data
  createDay: function(dayData) {
    return axios.post("http://localhost:3001/api/days", dayData);
  },
  // Update the day with the given id and data
  updateDay: function(id, dayData) {
    return axios.put("http://localhost:3001/api/days/" + id, dayData);
  },
  // Delete the day witht the given id
  deleteDay: function(id) {
    return axios.delete("http://localhost:3001/api/days/" + id);
  },
  /* Fitness */
  // Get all fitnesses with the given planID
  getAllFitnesses: function(planID) {
    return axios({
      method: 'get',
      url: "http://localhost:3001/api/fitnesses",
      params: {
        planID: planID
      }
    });
  },
  // Get all fitnesses with the given dayID
  getAllFitnessesByDay: function(dayID) {
    return axios({
      method: 'get',
      url: "http://localhost:3001/api/fitnesses/day",
      params: {
        dayID: dayID
      }
    });
  },
  // Get the fitness with the given id
  getFitness: function(id) {
    return axios.get("http://localhost:3001/api/fitnesses/" + id );
  },
  // Create the fitness with the given data
  createFitness: function(fitnessData) {
    return axios.post("http://localhost:3001/api/fitnesses", fitnessData);
  },
  // Update the fitness with the given id and data
  updateFitness: function(id, fitnessData) {
    return axios.put("http://localhost:3001/api/fitnesses/" + id, fitnessData);
  },
  // Delete the fitness witht the given id
  deleteFitness: function(id) {
    return axios.delete("http://localhost:3001/api/fitnesses/" + id);
  },
  /* Food */
  // Get all foods with the given dayID
  getAllFoods: function(planID) {
    return axios({
      method: 'get',
      url: "http://localhost:3001/api/foods",
      params: {
        planID: planID
      }
    });
  },
  // Get all fitnesses with the given dayID
  getAllFoodsByDay: function(dayID) {
    return axios({
      method: 'get',
      url: "http://localhost:3001/api/foods/day",
      params: {
        dayID: dayID
      }
    });
  },
  // Get the food with the given id
  getFood: function(id) {
    return axios.get("http://localhost:3001/api/foods/" + id );
  },
  // Create the food with the given data
  createFood: function(foodData) {
    return axios.post("http://localhost:3001/api/foods", foodData);
  },
  // Update the food with the given id and data
  updateFood: function(id, foodData) {
    return axios.put("http://localhost:3001/api/foods/" + id, foodData);
  },
  // Delete the food witht the given id
  deleteFood: function(id) {
    return axios.delete("http://localhost:3001/api/foods/" + id);
  },
};