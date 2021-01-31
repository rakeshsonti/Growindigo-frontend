import { useEffect, useState } from "react";
import {
   Form,
   FormGroup,
   Label,
   Input,
   FormFeedback,
   Button,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "./Login.css";
function Login(props) {
   useEffect(() => {
      props.setHeading("Welcome to Login Page");
   }, [props]);
   const history = useHistory();
   const [isPhoneValid, setIsPhoneValid] = useState();
   const [isEmailValid, setIsEmailValid] = useState();
   const [email, setEmail] = useState();
   const [mobile, setMobile] = useState();
   const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
   const isNullOrUndefined = (value) => {
      return value === undefined || value == null ? true : false;
   };
   const submitHandler = (evt) => {
      evt.preventDefault();
      console.log("sign up succesfully", email, mobile);
      const url = "http://localhost:9999/optgenerate";
      fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            mobile: mobile,
         }),
         credentials: "include",
      }).then((r) => {
         console.log("result:", r);
      });
      history.push({
         pathname: "/otp-varification",
         state: {
            email,
            mobile,
            type: "login",
         },
      });
   };
   return (
      <div className="maincontainer">
         <Form onSubmit={submitHandler}>
            <FormGroup className="itemContainer">
               <Label for="Email" className="labelStyle">
                  Email
               </Label>
               <div className="inputStyle">
                  <Input
                     type="email"
                     name="email"
                     id="Email"
                     onChange={(evt) => {
                        const emailValue = evt.target.value;
                        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                        if (emailValue.match(mailformat)) {
                           setIsEmailValid(true);
                        } else {
                           setIsEmailValid(false);
                        }
                        setEmail(evt.target.value);
                     }}
                     valid={
                        isNullOrUndefined(isEmailValid) ? null : isEmailValid
                     }
                     invalid={
                        isNullOrUndefined(isEmailValid) ? null : !isEmailValid
                     }
                  />
                  <FormFeedback>Invalid Email!</FormFeedback>
               </div>
            </FormGroup>
            <FormGroup className="itemContainer">
               <Label for="MobileNumber" className="labelStyle">
                  Mobile Number
               </Label>
               <div className="inputStyle">
                  <Input
                     type="text"
                     name="mobileNumber"
                     id="MobileNumber"
                     onChange={(evt) => {
                        const phoneValue = evt.target.value.trim();
                        if (phoneValue.match(phoneno)) {
                           setIsPhoneValid(true);
                        } else {
                           setIsPhoneValid(false);
                        }
                        setMobile(evt.target.value);
                     }}
                     valid={
                        isNullOrUndefined(isPhoneValid) ? null : isPhoneValid
                     }
                     invalid={
                        isNullOrUndefined(isPhoneValid) ? null : !isPhoneValid
                     }
                  />
                  <FormFeedback>Invalid Mobile Number!</FormFeedback>
               </div>
            </FormGroup>
            <FormGroup>
               <div className="submitBtn">
                  <Button
                     color="primary"
                     style={{ marginRight: "5px" }}
                     type="submit"
                     disabled={!(isEmailValid && isPhoneValid)}
                  >
                     login
                  </Button>
                  <Button
                     color="primary"
                     onClick={() => {
                        history.push("/sign-up");
                        console.log("sign up");
                     }}
                  >
                     sign up
                  </Button>
               </div>
            </FormGroup>
         </Form>
      </div>
   );
}

export default Login;
