import { Outlet } from "react-router-dom";
import Header from "./components/frame/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-body">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
