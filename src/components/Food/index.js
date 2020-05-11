import React from "react";

function Food(props) {
  return (
    <div>
      <table className="table table-bordered table-responsive-md table-striped text-center">
      <thead>
          <tr>
            <th className="text-center">Item</th>
            <th className="text-center">Calories</th>
            <th className="text-center">Price</th>
          </tr>
      </thead>
      <tbody id="foodTable">
        {props.foods.map(food => 
          <tr>
            <td>{food.item}</td>
            <td>{food.calories}</td>
            <td>{food.price}</td>
          </tr>
        )}
        <tr>
          <td contentEditable="true"></td>
          <td contentEditable="true"></td>
          <td contentEditable="true"></td>
        </tr>
      </tbody>
      </table>
    </div>
  );
}

export default Food;