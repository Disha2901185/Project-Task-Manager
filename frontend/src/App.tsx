import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";

import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import store from "./redux/store";
import Signup from "./components/Signup";
import ProjectList from "./components/ProjectList";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProjectList />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
