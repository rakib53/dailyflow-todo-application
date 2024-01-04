import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Password_Eye_Off from "../../assets/images/Icons/eye-off.svg";
import Password_Eye from "../../assets/images/Icons/eye.svg";
import FacebookIcon from "../../assets/images/Icons/facebook.svg";
import GoogleIcon from "../../assets/images/Icons/goole.svg";
import LOGO from "../../assets/images/logo.svg";
import SignInImage from "../../assets/images/signinimage.svg";
import {
  useLoginWithGoogleMutation,
  useSignInMutation,
} from "../../features/auth/authApi";
import { getUserInfo, setToken } from "../../features/auth/authSlice";
import style from "../SignUp/Signup.module.css";

const SignIn = () => {
  // hide or show password
  const [eye, setEye] = useState(false);
  // user data form field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IsRemember, setIsRemember] = useState(false);
  const [signInError, setSignInError] = useState({
    isError: false,
    errorMessage: "",
  });
  // Navigate the user
  const navigate = useNavigate();
  // dispatch the Action
  const dispatch = useDispatch();

  // login API
  const [
    signIn,
    { data: signInResponse, isLoading, isError, isSuccess, error },
  ] = useSignInMutation();
  const [
    googleLogin,
    { data: googleLoginUserData, isLoading: googleLoginLoading },
  ] = useLoginWithGoogleMutation();

  // Send data to server
  const handleSubmitDataa = (event) => {
    event.preventDefault();
    const loginFormData = {
      email,
      password,
      IsRemember,
    };
    signIn(loginFormData);
  };

  const handleGoogleLogin = async () => {
    var SCOPES =
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
    const client = window.google.accounts.oauth2.initCodeClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: SCOPES,
      ux_mode: "popup",
      callback: async (response) => {
        try {
          if (response?.code) {
            googleLogin({ code: response.code });
          } else {
            return;
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
    client.requestCode();
  };

  // sate managment after getting the user data of error
  useEffect(() => {
    if (!isLoading && signInResponse?.token) {
      dispatch(setToken(signInResponse.token));
      dispatch(getUserInfo(signInResponse?.user));
      if (signInResponse?.user) {
        navigate("/");
      }
    }
    if (!isLoading && isError) {
      setSignInError({
        isError: true,
        errorMessage: error?.data?.message,
      });
    }
  }, [signInResponse, isLoading, isError, error, isSuccess]);

  return (
    <div className={style.signUpPageWrapper}>
      <div className={style.singUpLeftImageWrapper}>
        <img className={style.singUpLeftImage} src={SignInImage} alt="" />
      </div>

      <div className={style.signUpContent}>
        <div className={style.signUpHeader}>
          <img className={style.Logo} src={LOGO} alt="" />
          <h1 className={style.createAnAccountText}>Log in to your account</h1>
          <p className={style.freeTrailText}>
            Welcome back! Please enter your details.
          </p>
        </div>

        <div className={style.formWrapper}>
          <form className={style.form} onSubmit={handleSubmitDataa}>
            <div className={style.inputFiled}>
              <label htmlFor="name">Email*</label>
              <input
                className={style.input}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={style.inputFiled}>
              <label htmlFor="name">Password*</label>
              <div className={style.passwordFiled}>
                <input
                  className={`${style.input} ${
                    signInError.isError && style.errorInputBorder
                  } ${style.password}`}
                  type={eye ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setSignInError({ isError: false })}
                  placeholder="Create a password"
                />
                {eye ? (
                  <img
                    className={style.password_Eye_Off}
                    src={Password_Eye_Off}
                    alt=""
                    onClick={() => setEye(!eye)}
                  />
                ) : (
                  <img
                    className={style.password_Eye}
                    src={Password_Eye}
                    alt=""
                    onClick={() => setEye(!eye)}
                  />
                )}
              </div>

              {signInError.isError && (
                <span className={style.errorMessage}>
                  {signInError.errorMessage}
                </span>
              )}

              <div className={style.rememberAndForgetPassWrapper}>
                <div className={style.rememberPassword}>
                  <input
                    type="checkbox"
                    name=""
                    id="passwordRemember"
                    value={IsRemember}
                    onChange={(e) => setIsRemember(e.target.checked)}
                    className="custom-checkbox"
                  />
                  <label htmlFor="passwordRemember">Remember for 30 days</label>
                </div>
                <p className={style.forgetPassText}>Forgot password?</p>
              </div>
            </div>

            <div className={style.getStartedBtnWrapper}>
              <button type="submit" className="primaryBtn" disabled={isLoading}>
                {
                  isLoading ? "Loading...": "Sign In"
                }
              </button>
            </div>
          </form>

          <div className={style.orWrapper}>
            <div className={style.leftLine}></div>
            <span className={style.orText}>or</span>
            <div className={style.rightLine}></div>
          </div>

          <div className={style.socilSignIn}>
            <button
              className="social"
              onClick={handleGoogleLogin}
              disabled={googleLoginLoading}
            >
              {googleLoginLoading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <img src={GoogleIcon} alt="" />
                  <span>Signin with google</span>
                </>
              )}
            </button>

            <button className="social">
              <img src={FacebookIcon} alt="" />
              <span>Signin with facebook</span>
            </button>
          </div>
        </div>

        <div className={style.alreadyHaveAnAcc}>
          <p>Don't have an account?</p>
          <Link className={style.Link} to={"/signup"}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
