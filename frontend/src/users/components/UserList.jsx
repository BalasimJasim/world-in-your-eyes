import React from "react";
import "./UserList.css";
import UserItems from "./UserItems.jsx";
import Card from "../../shared/components/UIElements/Card.jsx";
export const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItems
          key={user._id}
          id={user._id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};
