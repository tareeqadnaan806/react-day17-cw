import React, { useContext } from "react";
import { context } from "../App";
import { MdDelete } from "react-icons/md";

const Budget = () => {
  const { spentSoFar, remaining, list, dispatch } = useContext(context);

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-5">My Budget Planner</h1>
        <div className="flex justify-around items-center details">
          <span>Budget: {2000}</span>
          <span>Remaining: {remaining}</span>
          <span>Spent so far: {spentSoFar}</span>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-5 mt-5">Expenses</h1>
        <div className="border border-black p-3 rounded flex justify-between flex-col w-full">
          <div>
            {list.map(({ id, item, cost }) => {
              return (
                <div key={id} className="flex justify-between items-center ">
                  <div>{item}</div>
                  <div>{cost}</div>
                  <button onClick={() => removeItem(id)}>
                    <MdDelete />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
