// src/components/Navigation.tsx
import React from "react";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/wishlist"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Wishlist
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
