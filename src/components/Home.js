import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { useEffect } from "react";
function Home() {
   const history = useHistory();
   //  const locationValue = useLocation();
   useEffect(() => {
      // console.log(locationValue);
   });
   return (
      <div
         style={{
            backgroundColor: "lightgrey",
            color: "black",
            width: "500px",
            height: "300px",
            textAlign: "center",
         }}
      >
         <h1>Home Page</h1>
         <div>
            <Button
               color="primary"
               onClick={() => {
                  history.push("/login-in");
               }}
               style={{ marginRight: "5px" }}
            >
               login
            </Button>
            <Button
               color="primary"
               onClick={() => {
                  history.push("/sign-up");
               }}
            >
               sign up
            </Button>
         </div>
      </div>
   );
}
export default Home;
