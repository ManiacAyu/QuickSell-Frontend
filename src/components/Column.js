import React, { useState } from "react";
import Card from "./Card";
import "./Column.css";
import {
  NoPriority,
  LowPriority,
  MediumPriority,
  HighPriority,
  UrgentPriority,
  Todo,
  Done,
  LightGrayDot,
  UrgentPriorityC,
  Add,
  DotThree,
  Backlog,
  InProgress,
  Cancelled,
} from "../components/svgassets.js";

const Column = ({ orderBy, groupBy, users, columns }) => {
  const isAvailable = {};
  const userMap = users.reduce((map, user) => {
    console.log(user.id);
    map[user.id] = user;
    isAvailable[user.name] = user.available;
    return map;
  }, {});

  const iconMapping = {
    "No priority": <NoPriority />,
    "Medium": <MediumPriority />,
    "Urgent": <UrgentPriorityC />,
    "Low": <LowPriority />,
    "High": <HighPriority />,
    "Backlog": <Backlog />,
    "Todo": <Todo />,
    "In progress": <InProgress />,
    "Done": <Done />,
    "Cancelled": <Cancelled />,
  };

  const [wantTick, setWantTick] = useState(true);
  const [wantPhoto, setWantPhoto] = useState(true);
  const [wantPriority, setWantPriority] = useState(true);

  if (groupBy === "priority") {
    if (!wantTick) setWantTick(true);
    if (!wantPhoto) setWantPhoto(true);
    if (wantPriority) setWantPriority(false);
  } else if (groupBy === "status") {
    if (wantTick) setWantTick(false);
    if (!wantPhoto) setWantPhoto(true);
    if (!wantPriority) setWantPriority(true);
  } else {
    if (wantPhoto) setWantPhoto(false);
    if (!wantTick) setWantTick(true);
    if (!wantPriority) setWantPriority(true);
  }

  return (
    <div className="columns-container">
      {Object.keys(columns).map((columnKey) => (
        <div key={columnKey} className="column">
          <div className="whole-column">
            <div className="column-essentials">
              {(groupBy === "status" || groupBy === "priority") && (
                <div className="column-icon">{iconMapping[columnKey]}</div>
              )}
              {groupBy === "user" && (
                <div className="initials-container">
                  {(() => {
                    let initials = columnKey[0] || "";
                    for (let i = 1; i < columnKey.length - 1; i++) {
                      if (columnKey[i] === " ") {
                        initials += columnKey[i + 1] || "";
                        break;
                      }
                    }
                    return initials.toUpperCase();
                  })()}
                  {isAvailable[columnKey] && (
                    <div className="status-icon"></div>
                  )}
                </div>
              )}
              <h2 className="column-title">{columnKey}</h2>
              <h2 className="column-number">{columns[columnKey].length}</h2>
            </div>
            <div className="addanddot">
              <div className="add">
                <Add />
              </div>
              <div className="dot">
                <DotThree />
              </div>
            </div>
          </div>
          {columns[columnKey].map((ticket) => (
            <Card
              key={ticket.id}
              dataT={ticket}
              dataP={userMap[ticket.userId]}
              wantTick={wantTick}
              wantPhoto={wantPhoto}
              wantPriority={wantPriority}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Column;
