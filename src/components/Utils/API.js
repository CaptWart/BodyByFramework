import axios from "axios";

const testServer = "http://ec2-3-13-138-147.us-east-2.compute.amazonaws.com";
// const localHost = "http://localhost:3001";

export default {
  /* User */
  // Gets all users
  getAllUsers: function() {
    return axios.get(testServer + "/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get(testServer + "/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete(testServer + "/api/users/" + id);
  },
  /* Plan */
  // Get all plans with the given userID
  getAllPlans: function(userID) {
    return axios({
      method: 'get',
      url: testServer + "/api/plans",
      // withCredentials: true,
      params: {
        userID: userID
      }
    });
  },
  // Get the plan with the given id
  getPlan: function(id) {
    return axios.get(testServer + "/api/plans/" + id );
  },
  // Create the plan with the given data
  createPlan: function(planData) {
    return axios.post(testServer + "/api/plans", planData);
  },
  // Update the plan with the given id and data
  updatePlan: function(id, planData) {
    return axios.put(testServer + "/api/plans/" + id, planData);
  },
  // Delete the plan witht he given id
  deletePlan: function(id) {
    return axios.delete(testServer + "/api/plans/" + id);
  },
  /* Day */
  // Get all days with the given planID
  getAllDays: function(planID) {
    return axios({
      method: 'get',
      url: testServer + "/api/days",
      params: {
        planID: planID
      }
    });
  },
  // Get the day with the given id
  getDay: function(id) {
    return axios({
      method: 'get',
      url: testServer + "/api/days/id",
      params: {
        _id: id
      }
    });
  },
  // Get the last day of the plan
  getLastDay: function(planID) {
    return axios({
      method: 'get',
      url: testServer + "/api/days/last",
      params: {
        planID: planID
      }
    });
  },
  // Create the day with the given data
  createDay: function(dayData) {
    return axios.post(testServer + "/api/days", dayData);
  },
  // Update the day with the given id and data
  updateDay: function(id, dayData) {
    return axios.put(testServer + "/api/days/" + id, dayData);
  },
  // Delete the day witht the given id
  deleteDay: function(id) {
    return axios.delete(testServer + "/api/days/" + id);
  },
  /* Fitness */
  // Get all fitnesses with the given planID
  getAllFitnesses: function(planID) {
    return axios({
      method: 'get',
      url: testServer + "/api/fitnesses",
      params: {
        planID: planID
      }
    });
  },
  // Get all fitnesses with the given dayID
  getAllFitnessesByDay: function(dayID) {
    return axios({
      method: 'get',
      url: testServer + "/api/fitnesses/day",
      params: {
        dayID: dayID
      }
    });
  },
  // Get the fitness with the given id
  getFitness: function(id) {
    return axios.get(testServer + "/api/fitnesses/" + id );
  },
  // Create the fitness with the given data
  createFitness: function(fitnessData) {
    return axios.post(testServer + "/api/fitnesses", fitnessData);
  },
  // Update the fitness with the given id and data
  updateFitness: function(id, fitnessData) {
    return axios.put(testServer + "/api/fitnesses/" + id, fitnessData);
  },
  // Delete the fitness witht the given id
  deleteFitness: function(id) {
    return axios.delete(testServer + "/api/fitnesses/" + id);
  },
  /* Food */
  // Get all foods with the given dayID
  getAllFoods: function(planID) {
    return axios({
      method: 'get',
      url: testServer + "/api/foods",
      params: {
        planID: planID
      }
    });
  },
  // Get all fitnesses with the given dayID
  getAllFoodsByDay: function(dayID) {
    return axios({
      method: 'get',
      url: testServer + "/api/foods/day",
      params: {
        dayID: dayID
      }
    });
  },
  // Get the food with the given id
  getFood: function(id) {
    return axios.get(testServer + "/api/foods/" + id );
  },
  // Create the food with the given data
  createFood: function(foodData) {
    return axios.post(testServer + "/api/foods", foodData);
  },
  // Update the food with the given id and data
  updateFood: function(id, foodData) {
    return axios.put(testServer + "/api/foods/" + id, foodData);
  },
  // Delete the food witht the given id
  deleteFood: function(id) {
    return axios.delete(testServer + "/api/foods/" + id);
  },
};