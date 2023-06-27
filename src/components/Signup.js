
import React from "react";
import { useState } from "react";

import { useNavigate } from 'react-router-dom'

export default function Signup() {
 
  let navigate = useNavigate();//this is upgraded version of usehistory
  const [credential, setCredential] = useState({name:"", email: "", password: "",cpassword:"" });

  const change = (hagdiya) => {
    setCredential({
      ...credential,
      [hagdiya.target.name]: hagdiya.target.value,
    });
  };

  const host = "http://localhost:4000";

  const handlesignup = async (e) => {
    e.preventDefault();
    if(credential.cpassword!==credential.password){
      setCredential({name:"", email: "", password: "",cpassword:"" })
      return alert("Passwords doesn`t match!");

    }
    const url = `${host}/api/auth/createuser`;
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        
      },

      body: JSON.stringify({name:credential.name,email: credential.email, password: credential.password}), // body data type must match "Content-Type" header
    });
    if (!response.ok) {
      throw new Error("Error updating notes"); // Handle non-successful response
    }
    const token = await response.json(); // parses JSON response into native JavaScript objects
    console.log(token);
    if (token.success){
      // Save the auth token and redirect
      localStorage.setItem('token', token.authtoken); 
      navigate('/');  //it will redirect to homepage of user

    }
  else{
      alert("Invalid credentials");
  }
  };

  return (
    <>
     <section className="vh-100" style={{ backgroundColor: '#eee' }}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{ borderRadius: '25px' }}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4" onSubmit={handlesignup}>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="name" name="name" className="form-control" value={credential.name} minLength={3}  onChange={change}/>
                      <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="email" name='email' className="form-control" value={credential.email} onChange={change} />
                      <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="password" name='password' className="form-control" value={credential.password} onChange={change}/>
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="cpassword" name='cpassword' className="form-control" value={credential.cpassword} onChange={change}/>
                      <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}


// task-->create a user profile detail page