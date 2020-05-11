import React from "react";

function Fitness(props) {
  return (
    <div>
      <table className="table table-bordered table-responsive-md table-striped text-center">
      <thead>
          <tr>
            <th className="text-center">Workout</th>
            <th className="text-center">Weight</th>
            <th className="text-center">Sets</th>
            <th className="text-center">Reps</th>
            <th className="text-center">Time(mins)</th>
          </tr>
      </thead>
      <tbody id="fitnessTable">
        {props.fitnesses.map(fitness => 
          <tr>
            <td>{fitness.workout}</td>
            <td>{fitness.weight}</td>
            <td>{fitness.sets}</td>
            <td>{fitness.reps}</td>
            <td>{fitness.time}</td>
          </tr>
        )}
        <tr>
          <td contentEditable="true"></td>
          <td contentEditable="true"></td>
          <td contentEditable="true"></td>
          <td contentEditable="true"></td>
          <td contentEditable="true"></td>
        </tr>
      </tbody>
      </table>
    </div>
  );
}

export default Fitness;