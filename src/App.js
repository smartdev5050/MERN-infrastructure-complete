import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NewOrderPage from "./pages/NewOrderPage";
import AuthPage from "./pages/AuthPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import NavBar from "./components/NavBar";

function App() {
  // set state for user
  // To avoid having to continually update the userstate using React Developer Tools, let's temporarily initialize userto an empty object instead of null:
  // Change to null to see the auth page
  const [user, setUser] = useState(null);
  return (
    <main className="App">
      {user ? (
        //  if there is user show routes else show auth page
        <>
          <NavBar />
          <Routes>
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/orders/new" element={<NewOrderPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage />
      )}
    </main>
  );
}

export default App;
