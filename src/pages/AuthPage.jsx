import SignUpForm from "../components/SignUpForm";
import LogInForm from "./LogInForm";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AuthPage({ setUser }) {
  const [showLogIn, setShowLogIn] = useState(false);

  return (
    <main>
      <h1>AuthPage</h1>
      <SignUpForm setUser={setUser} />

      {showLogIn ? (
        <LogInForm setUser={setUser} />
      ) : (
        <Link to="" onClick={() => setShowLogIn(!showLogIn)}>
          Have an account? Sign In
        </Link>
      )}
    </main>
  );
}
