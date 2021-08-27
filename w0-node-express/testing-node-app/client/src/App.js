import { Switch, Route } from "react-router";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
