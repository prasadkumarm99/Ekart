import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import validator from 'validator'

function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('re');
  const [status, setStatus] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  let is_admin;
  if (props.location.pathname.split("/")[2] === "true"){
    is_admin = true;
  }
  else {
    is_admin = false
  }

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (is_admin) {
      dispatch(register(name, email, password, is_admin));
    }
    else {
      dispatch(register(name, email, password));
    }
  }
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>{is_admin ? "Create Ekart Admin Account" :"Create Ekart Account"}</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="name">
            Name
          </label>
          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">
            Password
          </label>
          <input type="password" id="password" name="password" onChange={(e) => {
            const passcode = e.target.value
            if (validator.isStrongPassword(passcode)) {
              setRePassword("")
              setStatus("Password missmatch")
            } else {
              setStatus("Weak password") 
            }
            return setPassword(passcode)
          }}>
          </input>
        </li>
        {rePassword === "re" && status && <li>{status}</li>}
        <li>
          <label htmlFor="rePassword">
            Re-Enter Password
          </label>
          <input type="password" id="rePassword" name="rePassword" onChange={(e) => {
            const passcode = e.target.value
            if (password === passcode) {
              setStatus("matched")
            } else {
              setStatus("Password missmatch")
            }
            return setRePassword(passcode)
          }}>
          </input>
        </li>
        {status !== "matched" && <li>{status}</li>}
        <li>
          <button 
            type="submit" 
            className="button primary" 
            disabled={status !== "matched"}
          >
            Register
          </button>
        </li>
        {
          is_admin ? "" :
          (<li>
            Already have an account?
            <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >Signin to your Ekart account</Link>
          </li>)
        }
      </ul>
    </form>
  </div>
}
export default RegisterScreen;