import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "./Button";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

import "../css/Login.css";

export const Login = () => {
  const accoutInfo = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const [accountForm, setAccountForm] = useState(accoutInfo);

  const [dataErrors, setDataErrors] = useState({});

  // const [isSubmit, setIsSubmit] = useState(false);

  const inputChange = (e) => {
    setAccountForm({
      ...accountForm,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (values) => {
    const errors = {};

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    const regexPW = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Please enter a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (!regexPW.test(values.password)) {
      errors.password =
        "Password requires 1 capital letter, 1 number and 1 special character";
    }

    return errors;
  };

  const submitData = async (e) => {
    e.preventDefault();

    try {
      setDataErrors(validate(accountForm));

      // setIsSubmit(true);

      const check = validate(accountForm);

      if (Object.keys(check).length === 0) {
        const res = await fetch("/api/v1/auth/login", {
          method: "POST",
          body: JSON.stringify(accountForm),
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await res.json();
        localStorage.setItem("token", data.token);
        navigate("/myprofile");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>

      <div className="login-container">
        <div className="heading-line-container">
          <div className="heading">
            <h1>Log In</h1>
          </div>
          <div className="line-container"></div>
        </div>
        <div className="section-container">
          <div className="section-welcome">
            <h2>
              <span className="orange">Welcome to</span>
              <span className="grey"> Baby's</span>
            </h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
              incidunt delectus minima culpa beatae blanditiis, quasi natus quas
              exercitationem dolore, molestiae ipsam. Minus debitis vel
              explicabo nihil id, obcaecati laborum totam nam accusantium,
              repudiandae perspiciatis blanditiis veritatis fuga error in dicta
              accusamus facilis tenetur, at ad quas. Vel suscipit quam
              perspiciatis hic distinctio commodi, molestias nostrum totam
              dicta, accusamus praesentium? Alias saepe sequi facere soluta
              numquam?
            </p>
          </div>
          <div className="login-form-container">
            <form onSubmit={submitData}>
              <div className="login-form">
                <label htmlFor="email">Email</label>
                <input
                  type={"email"}
                  placeholder="Enter your email"
                  id="email"
                  name="email"
                  onChange={inputChange}
                />
                <span className="errors">{dataErrors.email}</span>
              </div>
              <div className="login-form">
                <label htmlFor="password">Password</label>
                <input
                  type={"password"}
                  placeholder="Enter your password"
                  id="password"
                  name="password"
                  onChange={inputChange}
                />
                <span className="errors">{dataErrors.password}</span>
              </div>
              <div className="form-btn">
                <Button
                  type={"submit"}
                  buttonType="register-btn"
                  usageFor="LOG IN"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
