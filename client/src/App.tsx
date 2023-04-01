import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { UserProvider } from "./context/userContext";
import Router from "./Router";

const App = () => {
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </UserProvider>
  );
};

export default App;
