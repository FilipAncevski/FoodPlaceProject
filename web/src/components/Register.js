import React from "react";

import { Button } from "./Button";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

import "../css/Register.css";

export const Register = () => {
  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <main>
        <div className="register-container">
          <div className="heading-line-container">
            <div className="heading">
              <h1>Create Account</h1>
            </div>
            <div className="line-container"></div>
          </div>
          <div className="section-container">
            <div className="section-create-acc">
              <h2>
                <span className="orange">Create your</span>
                <br />
                <span className="grey"> account</span>
              </h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
                incidunt delectus minima culpa beatae blanditiis, quasi natus
                quas exercitationem dolore, molestiae ipsam. Minus debitis vel
                explicabo nihil id, obcaecati laborum totam nam accusantium,
                repudiandae perspiciatis blanditiis veritatis fuga error in
                dicta accusamus facilis tenetur, at ad quas. Vel suscipit quam
                perspiciatis hic distinctio commodi, molestias nostrum totam
                dicta, accusamus praesentium? Alias saepe sequi facere soluta
                numquam?
              </p>
            </div>
            <div className="register-form-container">
              <form>
                <div className="row 1">
                  <div className="login-form">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      placeholder="Enter your First Name"
                      id="first_name"
                      name="account[first_name]"
                    />
                  </div>
                  <div className="login-form">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      placeholder="Enter your Last Name"
                      id="last_name"
                      name="account[last_name]"
                    />
                  </div>
                </div>
                <div className="row 2">
                  <div className="login-form">
                    <label htmlFor="email">Email</label>
                    <input
                      placeholder="Enter your Email"
                      id="email"
                      name="account[email]"
                    />
                  </div>
                  <div className="login-form">
                    <label htmlFor="birthday">Birthday</label>
                    <input
                      placeholder="dd-mm-yyyy"
                      id="birthday"
                      name="account[birthday]"
                      type="date"
                    />
                  </div>
                </div>
                <div className="row 3">
                  <div className="login-form">
                    <label htmlFor="password">Password</label>
                    <input
                      placeholder="Enter your Password"
                      id="password"
                      name="account[password]"
                      type={"password"}
                    />
                  </div>
                  <div className="login-form">
                    <label htmlFor="repeat-password">Repeat password</label>
                    <input
                      placeholder="Enter your First Name"
                      id="repeat-password"
                      type={"password"}
                    />
                  </div>
                </div>
                <div className="form-btn">
                  <Button buttonType="register-btn" usageFor="CREATE ACCOUNT" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
