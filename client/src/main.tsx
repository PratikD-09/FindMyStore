import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Loader from "./Loader.tsx"; // <--- Import your loader component

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app load (API/auth check etc.)
    setTimeout(() => {
      setLoading(false);
    }, 1200); 
  }, []);

  return loading ? <Loader /> : <App />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
