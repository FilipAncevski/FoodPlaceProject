import React, { useState, useEffect } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import swal from "sweetalert";
import "../css/MyProfileFinal.css";

export const MyProfileFinal = () => {
  const accoutInfo = {
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    password: "",
    picture: "",
  };

  const [accInfo, setAccInfo] = useState(accoutInfo);

  const [selectedFile, setSelectedFile] = useState();
  // eslint-disable-next-line
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
    setIsSelected(true);
  };

  const getInput = (e) => {
    e.preventDefault();
    document.getElementById("getFile").click();
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      let image = accInfo.picture !== "" ? accInfo.picture : "";

      if (selectedFile) {
        image = await updateImage(e);
      }
      let profile = await updateAcc(e, image);

      console.log(typeof profile.status);

      if (profile.status === 500) {
        swal("Wrong password, try again!");
      }
      if (profile.status === 200) {
        swal("Good job!", "You clicked the button!", "success");
        // swal("Profile updated succesfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("File", selectedFile);

    try {
      const res = await fetch("/api/v1/storage", {
        method: "POST",
        body: formData,
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      return Promise.resolve(data.file_name);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const updateAcc = async (e, image) => {
    e.preventDefault(e);

    try {
      if (accInfo.password !== repeatPW) {
        swal("Wrong password, try again!");
        // eslint-disable-next-line
        // throw "Password doesnt match, try again";
      }
      const data = { ...accInfo, picture: image };

      setAccInfo({ ...accInfo, picture: image });

      const res = await fetch("/api/v1/auth/updateInfo", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
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
      data.password = "";
      // console.log(data.birthday);
      //ne povlekuvaj pw
      setAccInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <main>
        <div className="container">
          <div className="heading-line-container">
            <div className="heading">
              <h1>My Profile</h1>
              {/* <button onClick={getImageAsync}>Test </button> */}
            </div>
            <div className="line-container"></div>
          </div>
          <div className="section-container">
            <div className="column one">
              <div className="img-container">
                {accInfo.picture === "" ? (
                  <img
                    src="https://cdn.shopify.com/s/files/1/0246/4622/1903/products/legostarwars-display_300x300.png?v=1578179637"
                    alt="/"
                  />
                ) : (
                  <img
                    // src={require(`../images/${accInfo.picture}`)}
                    src={require(`../images//${accInfo.picture}`)}
                    // src={
                    //   require(`../../../uploads/user_${accInfo._id}/${accInfo.picture}`)
                    //     .default
                    // }
                    // src={`/api/v1/storage/${accInfo.picture}`}
                    alt="/"
                  />
                )}
              </div>
              <form encType="multipart/form-data">
                <div className="btn-container">
                  <button
                    //eslint-disable-next-line
                    // style={{
                    //   display: "block",
                    //   widht: "120px",
                    //   height: "30px",
                    // }}
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
            </div>
            <div className="column two">
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
              <button onClick={updateProfile}>Save</button>
            </div>
            <div className="column three">
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
                id="repeat-password"
                type={"password"}
                onChange={changeInputPW}
              />
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
