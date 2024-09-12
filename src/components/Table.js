import React, { useEffect, useState } from "react";
import Card from "./Card";
import Column from "./Column";

const Table = ({ col, row }) => {
  const [tickets, setTickets] = useState([]);
  const [users, selectUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      "https://api.quicksell.co/v1/internal/frontend-assignment"
    );
    const data = await res.json();
    setTickets(data.tickets);
    selectUsers(data.users);
  };

  if (tickets.length === 0) {
    return <div>Loading...</div>;
  }

  const statusOrder = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];
  const priorityOrder = ["No priority", "Urgent", "High", "Medium", "Low"];

  const userMap = users.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {});
  const sortTickets = (tickets, order) => {
    return tickets.sort((a, b) => {
      if (order === "priority") {
        return a.priority - b.priority;
      } else{
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        return nameA.localeCompare(nameB);
      }
    });
  };
  const organizeTickets = (tickets, orderBy, order) => {
    let sortedTickets = sortTickets(tickets, order);
    let columns = {};

    if (orderBy === "user") {
      users.forEach((user) => {
        columns[user.name] = [];
      });

      sortedTickets.forEach((ticket) => {
        columns[userMap[ticket.userId]].push(ticket);
      });
    } else if (orderBy === "priority") {
      priorityOrder.forEach((priority) => {
        columns[priority] = [];
      });

      sortedTickets.forEach((ticket) => {
        columns[priorityOrder[ticket.priority]].push(ticket);
      });
    } else {
      statusOrder.forEach((statusOrder) => {
        columns[statusOrder] = [];
      });
      sortedTickets.forEach((ticket) => {
        columns[ticket.status].push(ticket);
      });
    }
    return columns;
  };

  const columns = organizeTickets(tickets, col, row);

    return <>{<Column orderBy={row} groupBy={col} users={users} columns={columns} />}</>;
};

export default Table;
