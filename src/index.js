import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { AuthProvider } from "./Context-authentication/AuthContext";
import { AnimatePresence } from "framer-motion";
import "./index.css";

ReactDOM.render(
  <AuthProvider>
    <AnimatePresence>
      <App />
    </AnimatePresence>
  </AuthProvider>,
  document.getElementById("root")
);
