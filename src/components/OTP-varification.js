import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useLocation, useHistory } from "react-router-dom";
function Varification(props) {
   const [otp, setOTP] = useState();
   const [obj, setObj] = useState({});
   const locationValue = useLocation();
   const [isActiveSubmit, setIsActiveSubmit] = useState(true);
   const [error, setError] = useState();
   const history = useHistory();
   useEffect(() => {
      props.setHeading("Welcome to Authentication Page");
      setObj({ ...locationValue.state });
   }, [locationValue, props]);
   const optHandler = (evt) => {
      evt.preventDefault();
      if (evt.target.value.length === 6) {
         setIsActiveSubmit(false);
      } else {
         setIsActiveSubmit(true);
      }
      setOTP(evt.target.value);
   };
   const submitHandler = () => {
      console.log(otp, obj);
      if (obj.type === "login") {
         //for login a user
         fetch("http://localhost:9999/loginOTPMatch", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               mobile: obj.mobile,
               otp: otp,
               email: obj.email,
            }),
            credentials: "include",
         })
            .then((r) => r.json())
            .then((r) => {
               console.log(r);
               console.log("1login successfully");
               if (r.success) {
                  history.push("/home");
                  console.log("login successfully");
                  setError("");
               }
               if (r.error) {
                  setError(r.error);
               }
            });
      } else {
         // for sign up a user
         fetch("http://localhost:9999/signupOTPMatch", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               mobile: obj.mobile,
               name: obj.name,
               email: obj.email,
               otp: otp,
            }),
            credentials: "include",
         })
            .then((r) => r.json())
            .then((r) => {
               console.log("oyye", r);
               if (r.success) {
                  history.push("/login-in");
                  console.log("sign up succesfully");
                  setError();
               }
               if (r.error) {
                  setError(r.error);
                  console.log("my error:", r);
               }
            });
      }
   };
   return (
      <div>
         <p
            style={{ color: "green" }}
         >{`OPT has sent to your mobile : +91${obj.mobile}`}</p>
         <div>
            <p style={{ fontWeight: "bold", color: "green" }}>
               Enter 6 digit otp below
            </p>
         </div>
         <label style={{ fontWeight: "bold", marginRight: "5px" }}>OTP </label>
         <input type="number" onChange={optHandler}></input>
         <div>
            <p style={{ color: "red", fontWeight: "bold" }}>
               {error === null || error === undefined ? null : error}
            </p>
         </div>
         <div>
            <Button
               style={{ margin: "30px" }}
               color="primary"
               onClick={submitHandler}
               size="sm"
               disabled={isActiveSubmit}
            >
               submit
            </Button>
         </div>
         <div>
            <Button
               style={{ margin: "10px" }}
               color="primary"
               onClick={() => {
                  history.push("/login-in");
               }}
               size="sm"
            >
               login
            </Button>
            <Button
               style={{ margin: "10px" }}
               color="primary"
               onClick={() => {
                  history.push("/sign-up");
               }}
               size="sm"
            >
               signup
            </Button>
         </div>
      </div>
   );
}
export default Varification;
