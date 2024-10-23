import React from 'react';
import Column from './Column';

function Board({ tickets, users, sortOption }) {
  if (!tickets || !Array.isArray(tickets) || !users || !Array.isArray(users)) {
    return <p>No tickets or users available or data is still loading.</p>;
  }

  const userMap = users.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {});

  // Function to group and sort tickets by different properties
  const groupTickets = () => {
    let grouped = {};
    if (sortOption === 'user') {
      grouped = tickets.reduce((groups, ticket) => {
        const userName = userMap[ticket.userId] || 'Unassigned';
        (groups[userName] = groups[userName] || []).push(ticket);
        return groups;
      }, {});
    } else if (sortOption === 'priority') {
      grouped = tickets.reduce((groups, ticket) => {
        const priorityName = `Priority ${ticket.priority}`;
        (groups[priorityName] = groups[priorityName] || []).push(ticket);
        return groups;
      }, {});
      // Sort groups by priority
      grouped = Object.keys(grouped).sort((a, b) => b.split(' ')[1] - a.split(' ')[1])
                                   .reduce((sortedGroups, key) => {
                                     sortedGroups[key] = grouped[key];
                                     return sortedGroups;
                                   }, {});
    } else { // default to status
      grouped = tickets.reduce((groups, ticket) => {
        const group = groups[ticket.status] || [];
        group.push({...ticket, userName: userMap[ticket.userId]});
        groups[ticket.status] = group;
        return groups;
      }, {});
    }

    // Sort tickets within each group by title
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => a.title.localeCompare(b.title));
    });

    return grouped;
  };

  const groupedTickets = groupTickets();

  return (
    <div className="board">
      {Object.keys(groupedTickets).map(group => (
        <Column key={group} status={group} tickets={groupedTickets[group]} />
      ))}
    </div>
  );
}

export default Board;
