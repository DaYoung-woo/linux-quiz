import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <div className="app-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
