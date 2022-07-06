import React, { useState, useEffect } from "react";

import { Button } from "./Button";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

import "../css/MyProfile.css";

export const MyProfileMust = () => {
  const accoutInfo = {
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    password: "",
  };

  const [accInfo, setAccInfo] = useState(accoutInfo);

  const [selectedFile, setSelectedFile] = useState();

  const [isSeleced, setIsSelected] = useState(false);

  const [repeatPW, setRepeatPW] = useState("********");

  const changeInput = (e) => {
    setAccInfo({
      ...accInfo,
      [e.target.name]: e.target.value,
    });
  };

  const changeInputPW = (e) => {
    setRepeatPW(e.target.value);
  };

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
    setIsSelected(true);
  };

  const getInput = (e) => {
    e.preventDefault();
    document.getElementById("getFile").click();
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const picture = await updateImage(e);
      const profile = await updateAcc(e);
      console.log(picture);
      console.log(profile);
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

  const updateAcc = async (e) => {
    e.preventDefault(e);

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
      console.log(res);
      return Promise.resolve(res);
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <main>
        <div className="container">
          <form encType="multipart/form-data">
            <div className="btn-container">
              <button
                //eslint-disable-next-line
                style={{
                  display: "block",
                  widht: "120px",
                  height: "30px",
                }}
                onClick={getInput}
              >
                Your text here
              </button>
              <input
                type="file"
                id="getFile"
                style={{ display: "none" }}
                onChange={changeHandler}
              />
            </div>
          </form>
          <label htmlFor="firstName">First Name</label>
          <input
            // placeholder={accInfo.firstName}
            value={accInfo.firstName}
            id="firstName"
            name="firstName"
            onChange={changeInput}
          />
          <label htmlFor="email">Email</label>
          <input
            placeholder={accInfo.email}
            id="email"
            name="email"
            onChange={changeInput}
            value={accInfo.email}
          />
          <label htmlFor="password">Password</label>
          <input
            placeholder="******"
            id="password"
            name="password"
            onChange={changeInput}
            type={"password"}
            value={accInfo.password}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            placeholder={accInfo.lastName}
            id="lastName"
            name="lastName"
            onChange={changeInput}
            value={accInfo.lastName}
          />
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
          <label htmlFor="repeat-password">Repeat password</label>
          <input
            placeholder="******"
            value={repeatPW}
            id="repeat-password"
            type={"password"}
            onChange={changeInputPW}
          />
          <button onClick={updateProfile}>Save</button>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
