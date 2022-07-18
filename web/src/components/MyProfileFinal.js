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

  const [dataErrors, setDataErrors] = useState({});

  const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName =
        "First name is required to be betweend 3 and 15 letters.";
    } else if (values.firstName.length < 4) {
      errors.firstName = "First name must be more than 4 characters";
    } else if (values.firstName.length >= 15) {
      errors.firstName = "First name cannot exceed more than 15 characters";
    }

    if (!values.lastName) {
      errors.lastName = "Lastname is required to be betweend 3 and 15 letters.";
    } else if (values.lastName.length < 4) {
      errors.lastName = "First name must be more than 4 characters";
    } else if (values.lastName.length >= 20) {
      errors.lastName = "First name cannot exceed more than 20 characters";
    }

    if (values.birthday === "") {
      errors.birthday = "Birthday is required";
    } else if (values.birthday > "2011-01-01") {
      errors.birthday = "Nice try";
    } else if (values.birthday < "1923-01-01") {
      errors.birthday =
        "Wow you are 100 years old?\nThank you for using our site";
    }

    return errors;
  };

  const changeInput = (e) => {
    setAccInfo({
      ...accInfo,
      [e.target.name]: e.target.value,
    });
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
      setDataErrors(validate(accInfo));

      const check = validate(accInfo);

      if (Object.keys(check).length === 0) {
        let res = await swal(
          "Are you sure that you want to update your acount?",
          {
            buttons: {
              cancel: "Cancel",
              Yes: {
                text: "Yes",
                value: "accept",
              },
            },
          }
        ).then((value) => {
          // eslint-disable-next-line
          switch (value) {
            case "accept":
              return swal("Please enter your password", {
                content: {
                  element: "input",
                  attributes: {
                    placeholder: "Enter your password",
                    type: "password",
                  },
                },
              });

            case null:
              return swal("Canceled!");
          }
        });

        if (selectedFile === undefined) {
          let image = accInfo.picture;

          if (res === true) {
            return swal({
              title: "Nothing was changed",
              button: "Close",
            });
          }

          let profile = await updateAcc(e, image, res);

          if (profile.status === 500) {
            swal({
              title: "Wrong password, try again!",
              icon: "error",
              button: "Close",
            });
          }
          if (profile.status === 200) {
            swal({
              title: "Accoung updated!",
              icon: "success",
              button: "Close",
            });
          }
        }

        if (selectedFile !== undefined) {
          if (res === true) {
            return swal({
              title: "Nothing was changed",
              button: "Close",
            });
          }
          let image = await updateImage(e);
          let profile = await updateAcc(e, image, res);

          if (profile.status === 500) {
            // swal("Wrong password, try again!");
            swal({
              title: "Wrong password, try again!",
              icon: "error",
              button: "Close",
            });
          }
          if (profile.status === 200) {
            swal({
              title: "Accoung updated!",
              icon: "success",
              button: "Close",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const trimData = (object) => {
    return Object.keys(object).map(
      (k) =>
        (object[k] =
          typeof object[k] == "string" ? object[k].trim() : object[k])
    );
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

  const updateAcc = async (e, image, password) => {
    e.preventDefault(e);

    try {
      let data = { ...accInfo, picture: image };

      data = { ...data, password: password };

      trimData(data);

      setAccInfo(data);

      const res = await fetch("/api/v1/auth/updateInfo", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
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
      data.birthday = getBirthday(data.birthday);
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
            </div>
            <div className="line-container" id="my-prof"></div>
          </div>
          <div className="section-container">
            <div className="column one theOne">
              <div className="img-container">
                {accInfo.picture === "" ? (
                  <img
                    src="https://cdn.shopify.com/s/files/1/0246/4622/1903/products/legostarwars-display_300x300.png?v=1578179637"
                    alt="/"
                  />
                ) : (
                  <img src={`/api/v1/storage/${accInfo.picture}`} alt="/" />
                )}
              </div>
              <form encType="multipart/form-data">
                <div className="btn-container">
                  <button onClick={getInput}>CHANGE AVATAR</button>
                  <input
                    type="file"
                    id="getFile"
                    style={{ display: "none" }}
                    onChange={changeHandler}
                  />
                </div>
              </form>
            </div>
            <div className="column two myprof">
              <label htmlFor="firstName">First Name</label>
              <input
                // placeholder={accInfo.firstName}
                value={accInfo.firstName}
                id="firstName"
                name="firstName"
                onChange={changeInput}
              />
              <span className="errors">{dataErrors.firstName}</span>
              <label htmlFor="email">Email</label>
              <input
                disabled
                placeholder={accInfo.email}
                id="email"
                name="email"
                onChange={changeInput}
                value={accInfo.email}
              />
              <button onClick={updateProfile}>SAVE</button>
            </div>
            <div className="column three myprof">
              <label htmlFor="lastName">Last Name</label>
              <input
                placeholder={accInfo.lastName}
                id="lastName"
                name="lastName"
                onChange={changeInput}
                value={accInfo.lastName}
              />
              <span className="errors">{dataErrors.lastName}</span>
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
              <span className="errors">{dataErrors.birthday}</span>
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
