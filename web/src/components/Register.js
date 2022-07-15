import React, { useEffect, useState } from "react";

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
  };

  const [newAccForm, setNewAccForm] = useState(newAccInfo);

  const [dataErrors, setDataErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstName) {
      errors.firstName =
        "Username is required to be betweend 3 and 20 letters.";
    }

    if (!values.lastName) {
      errors.lastName = "Lastname is required to be betweend 3 and 20 letters.";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Please enter a valid email format!";
    }

    if (values.birthday === false) {
      errors.birthday = "Birthday is required";
    }
    console.log(!values.birthday === false);
    // else if (values.birthday.getFullYear() >= 2011) {
    //   errors.birthday =
    //     "Your must be at least 12 years old to register on our site";
    // }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    return errors;
  };

  const repeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
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
      newAccForm.birthday = new Date(newAccForm.birthday);

      setDataErrors(validate(newAccForm));

      setIsSubmit(true);

      console.log(newAccForm.birthday);

      const check = validate(newAccForm);

      if (Object.keys(check).length === 0) {
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
      // if (newAccForm.birthday.getFullYear() >= 2011) {
      //   // eslint-disable-next-line
      //   throw "Your must be at least 12 years old to register on our site";
      // }

      // if (newAccForm.password.toString() !== repeatPassword.toString()) {
      //   // eslint-disable-next-line
      //   throw "Your password doesnt match, try again";
      // }

      // if (Object.keys(dataErrors).length === 0) {

      //   const res = await fetch("/api/v1/auth/register", {
      //     method: "POST",
      //     body: JSON.stringify(newAccForm),
      //     headers: {
      //       "content-type": "application/json",
      //     },
      //   });
      //   const data = await res.json();
      //   if (res.status === 201) {
      //     navigate("/login");
      //   }

      //   console.log(data);
      // }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    console.log(Object.keys(dataErrors).length);
    console.log(dataErrors);
  }, [dataErrors]);

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
                      placeholder="dd-mm-yyyy"
                      id="birthday"
                      name="birthday"
                      type="date"
                      onChange={inputChange}
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
                    <span className="errors">{dataErrors.password}</span>
                  </div>
                  <div className="login-form">
                    <label htmlFor="repeat-password">Repeat password</label>
                    <input
                      placeholder="Confirm your Password"
                      id="repeat-password"
                      type={"password"}
                      onChange={repeatPasswordChange}
                    />
                    <span className="errors">{dataErrors.password}</span>
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
