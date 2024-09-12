import React from "react";
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
import "./Card.css";
const Card = ({ dataT, dataP, wantTick, wantPhoto, wantPriority }) => {
  const priority = [
    <NoPriority />,
    <LowPriority />,
    <MediumPriority />,
    <HighPriority />,
    <UrgentPriority />,
  ];
  const iconMapping = {
    "No priority": <NoPriority />,
    Medium: <MediumPriority />,
    Urgent: <UrgentPriorityC />,
    Low: <LowPriority />,
    High: <HighPriority />,
    Backlog: <Backlog />,
    Todo: <Todo />,
    "In progress": <InProgress />,
    Done: <Done />,
    Cancelled: <Cancelled />,
  };

  let st = dataP.name[0] + "";
  let i = 1;
  for (; i < dataP.name.length; i++) {
    if (dataP.name[i] === " ") break;
  }
  if (i !== dataP.name.length) st += dataP.name[i + 1];
  st = st.toUpperCase();

  return (
    <div className="card">
      <div className="firstRow">
        <div className="id">{dataT.id}</div>
        {wantPhoto === true && (
          <div class="initials-container">
            <div class="initials">{st}</div>
            {dataP.available === true && <div className="status-icon"></div>}
          </div>
        )}
      </div>
      <div className="secondRow">
        {wantTick && <div>{iconMapping[dataT.status] }</div>}
        <div className="title">{dataT.title}</div>
      </div>
      <div className="thirdRow">
        {wantPriority === true && (
          <div className="priority">
            <div className="priorityImg">{priority[dataT.priority]}</div>
          </div>
        )}
        {dataP.available === true && (
          <div className="on">
            <div className="onImg">{<LightGrayDot />}</div>
            <div className="tag">{dataT.tag[0]}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
