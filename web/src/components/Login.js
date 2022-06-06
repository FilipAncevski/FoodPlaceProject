import React from "react";
import "../css/Login.css";
import { Button } from "./Button";

export const Login = () => {
  return (
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
            exercitationem dolore, molestiae ipsam. Minus debitis vel explicabo
            nihil id, obcaecati laborum totam nam accusantium, repudiandae
            perspiciatis blanditiis veritatis fuga error in dicta accusamus
            facilis tenetur, at ad quas. Vel suscipit quam perspiciatis hic
            distinctio commodi, molestias nostrum totam dicta, accusamus
            praesentium? Alias saepe sequi facere soluta numquam?
          </p>
        </div>
        <div className="login-form-container">
          <form>
            <div className="login-form">
              <label htmlFor="email">Email</label>
              <input
                placeholder="Enter your email"
                id="email"
                name="account[email]"
              />
            </div>
            <div className="login-form">
              <label htmlFor="password">Password</label>
              <input
                placeholder="Enter your password"
                id="password"
                name="account[password]"
              />
            </div>
            <div className="form-btn">
              <Button buttonType="register-btn" usageFor="LOG IN" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
