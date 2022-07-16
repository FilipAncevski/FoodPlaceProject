import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "./Button";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

import "../css/Register.css";

export const Register = () => {
  const newAccInfo = {
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    password: "",
    repeatPassword: "",
  };

  const [newAccForm, setNewAccForm] = useState(newAccInfo);

  const [dataErrors, setDataErrors] = useState({});

  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    const regexPW = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    if (!values.firstName) {
      errors.firstName =
        "Username is required to be betweend 3 and 15 letters.";
    } else if (values.firstName.length < 4) {
      errors.firstName = "First name must be more than 4 characters";
    } else if (values.firstName.length >= 15) {
      errors.firstName = "First name cannot exceed more than 15 characters";
    }

    if (!values.lastName) {
      errors.lastName = "Lastname is required to be betweend 3 and 15 letters.";
    } else if (values.lastName.length < 4) {
      errors.lastName = "First name must be more than 4 characters";
    } else if (values.lastName.length >= 15) {
      errors.lastName = "First name cannot exceed more than 15 characters";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Please enter a valid email format!";
    }

    if (values.birthday === "") {
      errors.birthday = "Birthday is required";
    } else if (values.birthday >= "2010-01-01") {
      errors.birthday =
        "Your need to be at least 12 years old to register on our site";
    } else if (values.birthday > "2022-01-01") {
      errors.birthday = "Nice try";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (!regexPW.test(values.password)) {
      errors.password =
        "Password requires 1 capital letter, 1 number and 1 special character";
    }

    if (values.repeatPassword !== values.password) {
      errors.repeatPassword = "Password doesnt match";
    }

    return errors;
  };

  const inputChange = (e) => {
    setNewAccForm({
      ...newAccForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitNewAcc = async (e) => {
    e.preventDefault();

    try {
      setDataErrors(validate(newAccForm));

      console.log(newAccForm.birthday);

      const check = validate(newAccForm);

      if (Object.keys(check).length === 0) {
        newAccForm.birthday = new Date(newAccForm.birthday);

        const res = await fetch("/api/v1/auth/register", {
          method: "POST",
          body: JSON.stringify(newAccForm),
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await res.json();
        navigate("/login");
        return Promise.resolve(data);
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
              <form onSubmit={submitNewAcc}>
                <div className="row 1">
                  <div className="login-form">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      placeholder="Enter your First Name"
                      id="firstName"
                      name="firstName"
                      onChange={inputChange}
                    />
                    <span className="errors">{dataErrors.firstName}</span>
                  </div>
                  <div className="login-form">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      placeholder="Enter your Last Name"
                      id="lastName"
                      name="lastName"
                      onChange={inputChange}
                    />
                    <span className="errors">{dataErrors.lastName}</span>
                  </div>
                </div>
                <div className="row 2">
                  <div className="login-form">
                    <label htmlFor="email">Email</label>
                    <input
                      placeholder="Enter your Email"
                      id="email"
                      name="email"
                      onChange={inputChange}
                    />
                    <span className="errors">{dataErrors.email}</span>
                  </div>
                  <div className="login-form">
                    <label htmlFor="birthday">Birthday</label>
                    <input
                      placeholder="yyyy-MM-dd"
                      id="birthday"
                      name="birthday"
                      type="date"
                      onChange={inputChange}
                      value={newAccForm.birthday}
                    />
                    <span className="errors">{dataErrors.birthday}</span>
                  </div>
                </div>
                <div className="row 3">
                  <div className="login-form">
                    <label htmlFor="password">Password</label>
                    <input
                      placeholder="Enter your Password"
                      id="password"
                      name="password"
                      type={"password"}
                      onChange={inputChange}
                    />
                    <span className="errors password">
                      {dataErrors.password}
                    </span>
                  </div>
                  <div className="login-form">
                    <label htmlFor="repeat-password">Repeat password</label>
                    <input
                      placeholder="Confirm your Password"
                      id="repeatPassword"
                      name="repeatPassword"
                      type={"password"}
                      onChange={inputChange}
                    />
                    <span className="errors">{dataErrors.repeatPassword}</span>
                  </div>
                </div>
                <div className="form-btn">
                  <Button
                    type={"submit"}
                    buttonType="register-btn"
                    usageFor="CREATE ACCOUNT"
                  />
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
