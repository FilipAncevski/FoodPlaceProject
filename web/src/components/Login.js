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

  const inputChange = (e) => {
    setAccountForm({
      ...accountForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(accountForm),
        headers: {
          "content-type": "application/json",
        },
      });
      if (accountForm.email === "" || accountForm.password === "") {
        // eslint-disable-next-line
        throw "Please fill in your account and password";
      }
      if (!res.ok) {
        // eslint-disable-next-line
        throw "There was a error while you were logging in";
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/myprofile");
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
