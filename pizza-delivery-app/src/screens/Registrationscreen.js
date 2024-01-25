import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from "../action/userAction";
import Loading from "../components/Loading";
import Success from "../components/Success";
import Error from "../components/Error";

export default function Registrationscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const registerstate = useSelector(state =>state.registerUserReducer)
  const {error , loading ,succes}= registerstate
  const dispatch = useDispatch()

    function register(){
        if (password!==cpassword)
        
        {
            alert("password not matched")
        }
        else{
            const user ={
                name,
                email,
                password
            }
            console.log(user);
            dispatch(registerUser(user))
        }
    }

  return (
  <form>
    <div className="  row justify-content-center mt-5">
      <div className=" register col-md-5 mt-5 text-start shadow-lg p-3 mb-5 rounded">

        <h3
          className="text-center m-2"
          style={{ fontSize: "30px", color: "white" }}
          >
          Registration Page
        </h3>
              {loading && (<Loading/>)}
              {succes && (<Success success={"User Registered Succesfully !!"}/>)}
              {error && (<Error error={"Email Already Registered"} />)}
        <div>
          <input type="text" placeholder="name" className="form-control" value={name}onChange={(e)=>{setname(e.target.value)}} required />
          <input required type="email" placeholder="email" className="form-control"  value={email}onChange={(e)=>{setemail(e.target.value)}}/>
          <input required type="text" placeholder="password" className="form-control" value={password}onChange={(e)=>{setpassword(e.target.value)}} />
          <input required
            type="password"
            placeholder="confirm password"
            className="form-control"
            value={cpassword}onChange={(e)=>{setcpassword(e.target.value)}}
          />

          <button onClick={register} className="btn mt-3 mb-3">Register</button>
          <br/>
          <a style={{color:'white', textDecoration:'none'}} href="/login"> Click Here To Login</a>
        </div>
      </div>
    </div>
    </form>
  );
}
