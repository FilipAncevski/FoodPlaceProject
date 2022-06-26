import React, { useState, useEffect } from "react";

import { Button } from "./Button";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

import "../css/MyProfile.css";

export const MyProfile = () => {
  const accoutInfo = {
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    password: "",
  };
  const [accInfo, setAccInfo] = useState(accoutInfo);

  // const getBirthday = () => {
  //   console.log(accInfo.birthday);
  //   const year = accInfo.birthday.slice(0, 4);
  //   console.log(year);
  //   const month = accInfo.birthday.slice(5, 7);
  //   console.log(month);
  //   const day = accInfo.birthday.slice(8, 10);
  //   console.log(day);
  //   console.log(`${month}/${day}/${year}`);
  //   return `${year}/${month}/${day}`;
  // };

  const getData = async () => {
    try {
      let res = await fetch("/api/v1/auth/accs-info", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      let data = await res.json();
      let acc = data.find(
        (person) => person.email === localStorage.getItem("email")
      );
      // acc.birthday = getBirthday();
      console.log(acc);
      setAccInfo(acc);
    } catch (error) {
      console.log(error);
    }
  };

  const changeInput = (e) => {
    setAccInfo({
      ...accInfo,
      [e.target.name]: e.target.value,
    });
  };

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
                    <input
                      // placeholder={accInfo.firstName}
                      value={accInfo.firstName}
                      id="firstName"
                      name="firstName"
                      onChange={changeInput}
                    />
                  </div>
                  <div className="login-form">
                    <label htmlFor="email">Email</label>
                    <input
                      placeholder={accInfo.email}
                      id="email"
                      name="email"
                      onChange={changeInput}
                      value={accInfo.email}
                    />
                  </div>
                  <div className="login-form">
                    <label htmlFor="password">Password</label>
                    <input
                      placeholder="******"
                      id="password"
                      name="password"
                      onChange={changeInput}
                      type={"password"}
                      value={accInfo.password}
                    />
                  </div>
                  <div className="form-btn">
                    <Button usageFor={"SAVE"} buttonType={"register-btn"} />
                  </div>
                </div>
                <div className="column">
                  <div className="login-form">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      placeholder={accInfo.lastName}
                      id="lastName"
                      name="lastName"
                      onChange={changeInput}
                      value={accInfo.lastName}
                    />
                  </div>
                  <div className="login-form">
                    <label htmlFor="birthday">Birthday</label>
                    <input
                      placeholder="dd-mm-yyyy"
                      id="birthday"
                      name="birthday"
                      onChange={changeInput}
                      type="date"
                      max="2010-01-07"
                      min="1922-0-0"
                      value={accInfo.birthday}
                    />
                  </div>
                  <div className="login-form">
                    <label htmlFor="repeat-password">Repeat password</label>
                    <input
                      placeholder="******"
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
