import "./App.css";
import React, { useReducer, createContext } from "react";
import Budget from "./component/Budget";
import { v4 as uuidv4 } from "uuid";

const init = {
  item: "",
  cost: "",
  budget: 2000,
  spentSoFar: 0,
  remaining: 2000,
  list: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ITEM":
      return { ...state, item: action.payload };
    case "COST":
      return { ...state, cost: action.payload };
    case "ADD_ITEM":
      const newItem = {
        id: uuidv4(),
        item: state.item,
        cost: state.cost,
      };
      const newList = [...state.list, newItem];
      const newCost = newList.reduce(
        (total, item) => total + Number(item.cost),
        0
      );
      const remainingBalance = state.budget - newCost;

      return {
        ...state,
        list: newList,
        item: "",
        cost: "",
        spentSoFar: newCost,
        remaining: remainingBalance,
      };
    case "REMOVE_ITEM":
      const updatedList = state.list.filter(
        (item) => item.id !== action.payload
      );
      const updatedCost = updatedList.reduce(
        (total, item) => total + Number(item.cost),
        0
      );
      const updatedRemaining = state.budget - updatedCost;

      return {
        ...state,
        list: updatedList,
        spentSoFar: updatedCost,
        remaining: updatedRemaining,
      };
    default:
      throw new Error("Invalid action type");
  }
};

export const context = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, init);

  const sendData = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_ITEM" });
  };

  return (
    <div className="container">
      <context.Provider value={{ ...state, dispatch }}>
        <Budget />
      </context.Provider>

      <h1 className="text-2xl font-bold mb-5 mt-5">Add Expenses</h1>
      <div>
        <form
          onSubmit={sendData}
          className="flex justify-between items-center w-full"
        >
          <input
            type="text"
            className="border border-black border-solid w-1/2 m-3 h-8 rounded p-2"
            placeholder="Enter Item"
            value={state.item}
            onChange={(e) =>
              dispatch({ type: "ITEM", payload: e.target.value })
            }
          />
          <input
            type="number"
            className="border border-black border-solid w-1/2 m-3 h-8 rounded p-2"
            placeholder="Enter Cost"
            value={state.cost}
            onChange={(e) =>
              dispatch({ type: "COST", payload: e.target.value })
            }
          />
          <button className="button" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
