import React, { useEffect, useMemo, useState } from "react";
import { Button, TextBox } from "devextreme-react/text-box";
import logo from "../assets/logo.png";
import bg from "../assets/bg.webp";
import Validator, { RequiredRule, EmailRule } from "devextreme-react/validator";
import {Notification} from "../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/login/loginSlice";
import { LoadIndicator } from "devextreme-react";

const Login = () => {
  
  const {login} = useSelector(state => state)
  const dispatch = useDispatch()

  // for form validation
  const [val,setVal] = useState({userName:"",password:""});
  const handleChange = (name,value) => {
    setVal((prev) => ({ ...prev, [name]: value }))
  }
  const submitHandler = (e) => {
    e.preventDefault()
    if (val.password.trim() == "" || val.userName.trim() == "") {
      return Notification("Incomplete UserName or Password","error")
    }
    dispatch(userLogin(val))
  }

  // for showing notification either login or Not
  useEffect(() => {
    if (login.message) {
      Notification(login.message, login.navigate ? "success" : "error");
    }
  }, [login.message]);
  
  // for password eye icon
  const [passwordMode, setPasswordMode] = useState('password');
  const passwordButton = useMemo(
    () => ({
      icon: passwordMode === 'text'?"eyeopen":"eyeclose",
      stylingMode: 'text',
      onClick: () => {
        setPasswordMode(passwordMode === 'text' ? 'password' : 'text');
      },
    }),
    [passwordMode, setPasswordMode],
  );

  return (
    <div
    style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${bg}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="w-full h-screen flex justify-center items-center px-2"
      >
      <div className="w-full bg-white rounded shadow-md max-w-96 px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
          <img src={logo} width="80px" alt="" />
          <h1 className="text-3xl [text-shadow:_-10px_2px_4px_rgb(99_102_241_/_0.3)] font-bold text-center text-blue-500">Vertex-R</h1>
        </div>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <TextBox
            id="email"
            stylingMode="underlined"
            hoverStateEnabled={false}
            placeholder="Enter your Name"
            mode="text"
            spellCheck={true}
            showClearButton={true}
            className="!px-2"
            value={val.userName}
            onValueChange={(e) =>  handleChange("userName",e)}
          >
            <Validator>
            <RequiredRule message="UserName is required" />
            </Validator>
          </TextBox>
          <TextBox
            id="password"
            stylingMode="underlined"
            hoverStateEnabled={false}
            placeholder="Password"
            mode={passwordMode}
            showClearButton={true}
            className="!px-2"
            value={val.password}
            onValueChange={(e) =>  handleChange("password",e)}
          >
            <Validator>
            <RequiredRule message="password is required" />
            </Validator>
            <Button options={passwordButton} name="password"></Button>
          </TextBox>
          
          <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer">
            {login.isLoading ? <LoadIndicator width="20px" height="20px"/>:"Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
