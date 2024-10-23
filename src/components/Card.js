import React from 'react';

function Card({ ticket }) {
  return (
    <div className="card">
      <h3>{ticket.title}</h3>
      <p>Priority: {ticket.priority}</p>
      <p>Assigned to: {ticket.userName}</p>
      <p>Assigned to: {ticket.status}</p>
    </div>
  );
}

export default Card;
