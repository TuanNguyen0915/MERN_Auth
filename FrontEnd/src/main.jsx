import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/store.js";
import {Provider} from 'react-redux'
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={2000}
        pauseOnHover={false}
        closeOnClick
      />
      <App />
    </BrowserRouter>
  </Provider>,
);
