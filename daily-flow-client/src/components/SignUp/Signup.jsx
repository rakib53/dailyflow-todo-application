import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Confirmation from "../../assets/images/Confirmation.svg";
import Password_Eye_Off from "../../assets/images/Icons/eye-off.svg";
import Password_Eye from "../../assets/images/Icons/eye.svg";
import FacebookIcon from "../../assets/images/Icons/facebook.svg";
import GoogleIcon from "../../assets/images/Icons/goole.svg";
import LOGO from "../../assets/images/logo.svg";
import SignUpImage from "../../assets/images/signupImage.svg";
import { useRegistrationMutation } from "../../features/auth/authApi";
import { getUserInfo, setToken } from "../../features/auth/authSlice";
import style from "./Signup.module.css";

const Signup = () => {
  const [isHide, setIsHide] = useState(false);
  const [eye, setEye] = useState(false);
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationError, setRegistrationError] = useState({
    isError: false,
    errorMessage: "",
  });
  const navigate = useNavigate();

  // redux state for signUp mutation
  const [
    registration,
    { data: registrationResponse, isLoading, isError, error, isSuccess },
  ] = useRegistrationMutation();
  // redux hook for dispatch actions
  const dispatch = useDispatch();

  // sending data to the server
  const handleSubmitData = (event) => {
    event.preventDefault();
    if (password.length >= 8) {
      const newUser = {
        userName,
        email,
        password,
      };
      registration(newUser);
    }
  };

  const onSuccess = (res) => {
    console.log("Successfully Login with google", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("Google login failed", res);
  };

  useEffect(() => {
    if (!isLoading && registrationResponse?.token) {
      dispatch(setToken(registrationResponse.token));
      dispatch(getUserInfo(registrationResponse?.user));
      setIsHide(true);
      navigate("/");
    }
    if (!isLoading && isError) {
      setRegistrationError({
        isError: true,
        errorMessage: error?.data?.message,
      });
    }
  }, [registrationResponse?.token, isLoading]);

  return (
    <div className={style.signUpPageWrapper}>
      <div className={style.singUpLeftImageWrapper}>
        <img className={style.singUpLeftImage} src={SignUpImage} alt="" />
      </div>

      {isHide ? (
        <div className={style.ConfirmationContent}>
          <img className={style.Logo} src={LOGO} alt="" />
          <img className={style.confirmationLogo} src={Confirmation} alt="" />
          <h1 className={style.accountSuccesText}>
            Your account has been created successfully
          </h1>
          <p className={style.letsTrackAcc}>
            Let's track your activity and be organized
          </p>

          <div className={style.getStartedBtnWrappers}>
            <Link className="primaryBtn" to={"/"}>
              Get Started
            </Link>
          </div>

          <div className={style.orWrapper}>
            <div className={style.leftLine}></div>
            <span className={style.orText}>or</span>
            <div className={style.rightLine}></div>
          </div>
          <div className={style.alreadyHaveAnAcc}>
            <p>Already have an account?</p>
            <Link className={style.Link} to={"/signin"}>
              Log in
            </Link>
          </div>
        </div>
      ) : (
        <div className={style.signUpContent}>
          <div className={style.signUpHeader}>
            <img className={style.Logo} src={LOGO} alt="" />
            <h1 className={style.createAnAccountText}>Create an account</h1>
            <p className={style.freeTrailText}>Start your 30-day free trial.</p>
          </div>

          <div className={style.formWrapper}>
            <form className={style.form} onSubmit={handleSubmitData}>
              <div className={style.inputFiled}>
                <label htmlFor="name">Name*</label>
                <input
                  className={style.input}
                  type="text"
                  name="userName"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className={style.inputFiled}>
                <label htmlFor="name">Email*</label>
                <input
                  className={style.input}
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                {registrationError.isError && (
                  <span className={style.errorMessage}>
                    {registrationError.errorMessage}
                  </span>
                )}
              </div>

              <div className={style.inputFiled}>
                <label htmlFor="name">Password*</label>
                <div className={style.passwordFiled}>
                  <input
                    className={`${style.input} ${
                      password.length > 0 &&
                      password.length < 8 &&
                      style.errorInputBorder
                    } ${style.password}`}
                    type={eye ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                <span
                  className={`${style.passwordMustBe8} ${
                    password.length > 0 &&
                    password.length < 8 &&
                    style.passwordError
                  }`}
                >
                  Must be at least 8 characters.
                </span>
              </div>

              <div className={style.getStartedBtnWrapper}>
                <button type="submit" className="primaryBtn">
                  Create account
                </button>
              </div>
            </form>

            <div className={style.orWrapper}>
              <div className={style.leftLine}></div>
              <span className={style.orText}>or</span>
              <div className={style.rightLine}></div>
            </div>

            <div className={style.socilSignIn}>
              <button className="social">
                <img src={GoogleIcon} alt="" />
                <span>Signin with google</span>
              </button>

              <button className="social">
                <img src={FacebookIcon} alt="" />
                <span>Signin with facebook</span>
              </button>
            </div>
          </div>

          <div className={style.alreadyHaveAnAcc}>
            <p>Already have an account?</p>
            <Link className={style.Link} to={"/signin"}>
              Log in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
