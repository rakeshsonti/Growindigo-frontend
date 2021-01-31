import { useState, lazy, Suspense } from "react";
import { Spinner } from "reactstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
// import Signup from "./components/Sign-up";
const Signup = lazy(() => import("./components/Sign-up"));
const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./components/Home"));
const Varification = lazy(() => import("./components/OTP-varification"));
function App() {
   const [appHeading, setAppHeading] = useState("Welcome to Growindigo App");
   //  const prm = useParams();
   return (
      <div className="App">
         <Suspense
            fallback={
               <div className="fallback">
                  {" "}
                  <Spinner color="primary" />
                  Loading............
               </div>
            }
         >
            <h3>{appHeading}</h3>
            <Router>
               <Switch>
                  <Route exact path="/sign-up">
                     <Signup setHeading={setAppHeading} />
                  </Route>
                  <Route exact path="/login-in">
                     <Login setHeading={setAppHeading} />
                  </Route>
                  <Route exact path="/home">
                     <Home />
                  </Route>
                  <Route exact path="/">
                     <Login setHeading={setAppHeading} />
                  </Route>
                  <Route exact path="/otp-varification/:email/:mobile/:name">
                     <Varification setHeading={setAppHeading} />
                  </Route>
                  <Route exact path="/otp-varification">
                     <Varification setHeading={setAppHeading} />
                  </Route>
               </Switch>
            </Router>
         </Suspense>
      </div>
   );
}

export default App;
