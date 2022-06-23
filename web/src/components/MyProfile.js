import React, { useState, useEffect } from "react";

import { Button } from "./Button";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

import "../css/MyProfile.css";

export const MyProfile = () => {
  const [accLogged, setAccLogged] = useState([]);

  const getData = async () => {
    try {
      let res = await fetch("/api/v1/auth/accs-info", {
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      let data = await res.json();
      setAccLogged(data);
    } catch (error) {
      console.log(error);
    }
  };

  const user = accLogged.find(
    (acc) => acc.email === localStorage.getItem("email")
  );

  const [accInfo, setAccInfo] = useState(user);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <main>
        <div className="container my-profile">
          <div className="heading-line-container">
            <div className="heading">
              <h1>My Profile</h1>
            </div>
            <div className="line-container"></div>
          </div>
          <div className="section-container">
            <div className="section-edit-profile">
              <form>
                <div className="section-avatar column">
                  <div className="img-container">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0246/4622/1903/products/legostarwars-display_300x300.png?v=1578179637"
                      alt="/"
                    />
                  </div>
                  <div className="btn-container">
                    <Button
                      usageFor={"CHANGE AVATAR"}
                      buttonType={"login-btn"}
                    />
                  </div>
                </div>
                <div className="column">
                  <div className="login-form">
                    <label htmlFor="firstName">First Name</label>
                    <input placeholder="" id="firstName" name="firstName" />
                  </div>
                  <div className="login-form">
                    <label htmlFor="email">Email</label>
                    <input
                      placeholder="Enter your Email"
                      id="email"
                      name="account[email]"
                    />
                  </div>
                  <div className="login-form">
                    <label htmlFor="password">Password</label>
                    <input
                      placeholder="Enter your Password"
                      id="password"
                      name="account[password]"
                      type={"password"}
                    />
                  </div>
                  <div className="form-btn">
                    <Button usageFor={"SAVE"} buttonType={"register-btn"} />
                  </div>
                </div>
                <div className="column">
                  <div className="login-form">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      placeholder="Enter your Last Name"
                      id="last_name"
                      name="account[last_name]"
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
                  <div className="login-form">
                    <label htmlFor="repeat-password">Repeat password</label>
                    <input
                      placeholder=""
                      id="repeat-password"
                      type={"password"}
                    />
                  </div>
                </div>
                <div className="column"></div>
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
