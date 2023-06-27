
import React from "react";
import { useState } from "react";

import { useNavigate } from 'react-router-dom'

export default function Login() {
  let navigate = useNavigate();//this is upgraded version of usehistory
  const [credential, setCredential] = useState({ email: "", password: "" });

  const change = (hagdiya) => {
    setCredential({
      ...credential,
      [hagdiya.target.name]: hagdiya.target.value,
    });
  };

  const host = "http://localhost:4000";

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        
      },

      body: JSON.stringify({email: credential.email, password: credential.password}), // body data type must match "Content-Type" header
    });
    if (!response.ok) {
      return alert("Error Occured , Please do Re-login") // Handle non-successful response
    }
    const token = await response.json(); // parses JSON response into native JavaScript objects 
    //we have created api in such a way that it will give 2 objects , one success:true and other auth-token
    console.log(token);
    if (token.success){ 
      // Save the auth token and redirect
      localStorage.setItem('token', token.authtoken);  //we will taken auth tken part from response nad store in the local storage , so that it can be used again whenever user wants his own notes
      navigate('/');  //it will redirect to homepage of user

    }
  else{
      alert("Invalid credentials");
  }
  };

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

              <form onSubmit={handleLogin}>
                <div className="divider d-flex align-items-center my-4"></div>

                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    onChange={change}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    onChange={change}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a href="/signup" className="link-danger">
                      Register
                    </a>
                    
                  </p>
                </div>
              </form>

            </div>
          </div>
        </div>
        <footer className="fixed-bottom">
          <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
            {/* Copyright */}
            <div className="text-white mb-3 mb-md-0">
              Copyright © 2023. All rights reserved.
            </div>
            {/* Copyright */}

            {/* Right */}
            <div>
              <a
                href="https://www.facebook.com/amaan.ahmad.5030"
                target="_blank"
                className="text-white me-4"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#!" className="text-white me-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#!" className="text-white me-4">
                <i className="fab fa-google"></i>
              </a>
              <a href="#!" className="text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            {/* Right */}
          </div>
        </footer>
      </section>



    

    </>
  );
}
