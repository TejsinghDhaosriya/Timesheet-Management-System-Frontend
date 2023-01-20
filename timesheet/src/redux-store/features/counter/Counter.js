import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Counter</h1>
      <h1>{count}</h1>
      <div>
        <button
          style={{ padding: "10px 20px", fontSize: "20px", margin: "10px" }}
          onClick={() => {
            dispatch(increment());
          }}
        >
          Add
        </button>
        <button
          style={{ padding: "10px 20px", fontSize: "20px", margin: "10px" }}
          onClick={() => {
            dispatch(decrement());
          }}
        >
          Subtract
        </button>
      </div>
    </>
  );
};

export default Counter;
