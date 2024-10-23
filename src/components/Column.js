import React from 'react';
import Card from './Card';

function Column({ status, tickets }) {
  return (
    <div className="column">
      <h2>{status}</h2>
      {tickets.map(ticket => (
        <Card key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}

export default Column;
