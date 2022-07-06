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

  const [repeatPW, setRepeatPW] = useState("********");

  const [selectedFile, setSelectedFile] = useState();

  const [isSeleced, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
    setIsSelected(true);
  };

  const getInput = () => {
    document.getElementById("getFile").click();
  };

  const preventDefaultBehavior = (e) => {
    e.preventDefault();
  };

  const updateAccountInfo = async (e) => {
    // preventDefaultBehavior(e);
    e.preventDefault();
    try {
      const image = await updateImage(e);
      const account = await updateAcc(e);
      console.log(image);
      console.log(account);
    } catch (error) {
      console.log(error);
    }
  };

  const updateImage = async (e) => {
    // preventDefaultBehavior(e);
    e.preventDefault();

    const formData = new FormData();

    formData.append("File", selectedFile);

    try {
      const res = await fetch("/api/v1/storage", {
        method: "POST",
        body: formData,
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
          // "content-type": "multipart/form-data",
        },
      });
      let data = await res.json();
      console.log(data);
      return Promise.resolve(data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const getBirthday = (birthday) => {
    let date = new Date(birthday);
    let day = date.getDate();
    if (day <= 9) {
      day = `0${day}`;
    }
    let month = date.getMonth() + 1;
    if (month <= 9) {
      month = `0${month}`;
    }
    let year = date.getFullYear();
    let yyyyMmDd = `${year}-${month}-${day}`;
    return yyyyMmDd;
  };

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
      // console.log(data.birthday);
      data.birthday = getBirthday(data.birthday);
      data.password = "********";
      // console.log(data.birthday);
      //ne povlekuvaj pw
      setAccInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAcc = async (e) => {
    preventDefaultBehavior(e);

    try {
      if (accInfo.password === "********" && repeatPW === "********") {
        // eslint-disable-next-line
        throw "Please enter a valid password";
      }

      if (accInfo.password !== repeatPW) {
        // eslint-disable-next-line
        throw "Password doesnt match, try again";
      }

      const res = await fetch("/api/v1/auth/updateInfo", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(accInfo),
      });

      // window.location.reload();
      console.log(res);
      return Promise.resolve(res);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const changeInput = (e) => {
    setAccInfo({
      ...accInfo,
      [e.target.name]: e.target.value,
    });
  };

  const changeInputPW = (e) => {
    setRepeatPW(e.target.value);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [isSeleced, setIsSelected]);
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
              <form onSubmit={updateAccountInfo} encType="multipart/form-data">
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
                      // eslint-disable-next-line
                      // style={{
                      //   display: "block",
                      //   widht: "120px",
                      //   height: "30px",
                      // }}
                      // style="display:block;width:120px; height:30px;"
                      onClick={getInput}
                      type={"none"}
                    />
                    <input
                      type="file"
                      id="getFile"
                      name="file"
                      // eslint-disable-next-line
                      style={{ display: "none" }}
                      onChange={changeHandler}
                      // style="display:none"
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
                      min="1922-01-01"
                      value={accInfo.birthday}
                    />
                  </div>
                  <div className="login-form">
                    <label htmlFor="repeat-password">Repeat password</label>
                    <input
                      placeholder="******"
                      value={repeatPW}
                      id="repeat-password"
                      type={"password"}
                      onChange={changeInputPW}
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
