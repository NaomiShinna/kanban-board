import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages";
import { SignUp } from "./pages";
import { Home } from "./pages";
import { Missing } from "./pages";
import { RequireAuth } from "./pages";
import { KeepLogin } from "./pages";
import "./App.css";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<KeepLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Routes>
  );
}

export default App;
