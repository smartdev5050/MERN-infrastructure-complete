import React from "react";
import * as usersService from "../utilities/users-service";

const handleCheckToken = (evt) => {
  evt.preventDefault();
  console.log(usersService.getTime());
};
export default function OrderHistoryPage() {
  return (
    <div>
      <h1>OrderHistoryPage</h1>
      <button onClick={handleCheckToken}>Check my log in</button>
    </div>
  );
}
