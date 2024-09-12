import React, { useState } from "react";
import { Display, Down } from "./svgassets";
import "./Body.css";
import Table from "./Table.js";

const Body = () => {
  const [isDrop, setIsDrop] = useState(false);
  const [groupBy, setGroupBy] = useState(
    sessionStorage.getItem("groupBy") === null
      ? "priority"
      : sessionStorage.getItem("groupBy")
  );
  const [orderBy, setOrderBy] = useState(
    sessionStorage.getItem("orderBy") === null
      ? "priority"
      : sessionStorage.getItem("orderBy")
  );

  const handleOnClick = () => {
    setIsDrop(!isDrop);
  };

  const handleGroupChange = (e) => {
    setGroupBy(e.target.value);
    sessionStorage.setItem("groupBy", e.target.value);
    console.log(sessionStorage.getItem("groupBy"));
  };

  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
    sessionStorage.setItem("orderBy", e.target.value);
    console.log(sessionStorage.getItem("orderBy"));
  };

  return (
    <>
      <div className="Header">
        <div className="display" onClick={handleOnClick}>
          <Display className="displayIcon" />
          <div className="dtext">Display</div>
          <Down className="downIcon" />
        </div>
      </div>
      {isDrop && (
        <div className="dropdown">
          <label className="groupingLabel">
            <h4>Grouping</h4>
            <select
              name="grouping"
              value={groupBy}
              onChange={handleGroupChange}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </label>
          <label className="orderingLabel">
            <h4>Ordering</h4>
            <select
              name="ordering"
              value={orderBy}
              onChange={handleOrderChange}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </label>
        </div>
      )}
      <div className="Body">
        <Table col={groupBy} row={orderBy} />
      </div>
    </>
  );
};

export default Body;
