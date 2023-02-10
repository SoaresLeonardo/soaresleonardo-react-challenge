import { useState } from "react";
import "./App.css";
import { AiOutlineUndo, AiOutlineRedo } from "react-icons/ai";

export default function App() {
  const [list, setList] = useState([]);
  const [deleteHistory, setDeletedHistory] = useState([]);

  const handleClick = (event) => {
    const spanPosition = {
      clientX: event.clientX,
      clientY: event.clientY,
      timeStamp: event.timeStamp,
    };

    setList((prev) => [...prev, spanPosition]);
  };

  const handleUndo = (event) => {
    event.stopPropagation();

    if (list.length < 1) return;

    const lastItem = list[list.length - 1];
    setDeletedHistory((prev) => [...prev, lastItem]);

    setList((prev) => {
      const newList = [...prev].slice(0, -1);
      return newList;
    });
  };

  const handleRedo = (event) => {
    event.stopPropagation();

    if (deleteHistory.length < 1) return;

    const deletehistory = deleteHistory[deleteHistory.length - 1];
    setDeletedHistory((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });

    setList((prev) => [...prev, deletehistory]);
  };

  return (
    <>
      <div className="container" onClick={handleClick}>
        <div className="btn">
          <button disabled={list < 1} onClick={handleUndo}>
            <AiOutlineUndo />
          </button>
          <button disabled={deleteHistory < 1} onClick={handleRedo}>
            <AiOutlineRedo />
          </button>
        </div>
        {list.map((span) => (
          <span
            key={span.timeStamp}
            className="span"
            style={{ top: span.clientY, left: span.clientX }}
          />
        ))}
      </div>
    </>
  );
}
