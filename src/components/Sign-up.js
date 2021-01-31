import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
   Form,
   FormGroup,
   Label,
   Input,
   FormFeedback,
   Button,
} from "reactstrap";
import "./Sign-up.css";
function Signup(props) {
   useEffect(() => {
      props.setHeading("Welcome to Signup Page");
   }, [props]);
   const history = useHistory();
   const [isNameValid, setIsNameValid] = useState();
   const [isPhoneValid, setIsPhoneValid] = useState();
   const [isEmailValid, setIsEmailValid] = useState();
   const [name, setName] = useState();
   const [email, setEmail] = useState();
   const [mobile, setMobile] = useState();
   const letters = /^[A-Za-z]+$/;
   const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
   const isNullOrUndefined = (value) => {
      return value === undefined || value == null ? true : false;
   };
   const submitHandler = (evt) => {
      evt.preventDefault();
      console.log("sign up", name, email, mobile);
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
            name,
            email,
            mobile,
            type: "signup",
         },
      });
   };
   return (
      <div className="maincontainer">
         <Form onSubmit={submitHandler}>
            <FormGroup className="itemContainer">
               <Label for="Name" className="labelStyle">
                  Name
               </Label>
               <div className="inputStyle">
                  <Input
                     type="text"
                     name="name"
                     id="Name"
                     onChange={(evt) => {
                        const nameText = evt.target.value;
                        if (nameText.match(letters)) {
                           setIsNameValid(true);
                        } else {
                           setIsNameValid(false);
                        }
                        setName(evt.target.value);
                     }}
                     valid={isNullOrUndefined(isNameValid) ? null : isNameValid}
                     invalid={
                        isNullOrUndefined(isNameValid) ? null : !isNameValid
                     }
                  />
                  <FormFeedback>Invalid Name (only text)!</FormFeedback>
               </div>
            </FormGroup>
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
                     disabled={!(isEmailValid && isNameValid && isPhoneValid)}
                  >
                     sign up
                  </Button>
                  <Button
                     color="primary"
                     onClick={() => {
                        history.push("/login-in");
                        console.log("log in");
                     }}
                  >
                     login
                  </Button>
               </div>
            </FormGroup>
         </Form>
      </div>
   );
}

export default Signup;
