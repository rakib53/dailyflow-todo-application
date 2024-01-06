import React, { useEffect } from "react";
import style from "../Authentication.module.css";
import { useLoginWithGoogleMutation } from "@features/auth/authApi";
import GoogleIcon from "@assets/images/Icons/goole.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfo, setToken } from "@features/auth/authSlice";

export default function SigninWithGoogle() {
  const [googleLogin, { data: googleLoginUserData, isLoading, isSuccess }] =
    useLoginWithGoogleMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (!isLoading && googleLoginUserData?.token) {
      dispatch(setToken(googleLoginUserData.token));
      dispatch(getUserInfo(googleLoginUserData?.user));
      if (googleLoginUserData?.user) {
        navigate("/");
      }
    }
  }, [googleLoginUserData, isLoading, isSuccess]);

  return (
    <button
      className={style.social}
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <img src={GoogleIcon} alt="" />
          <span>Signin with google</span>
        </>
      )}
    </button>
  );
}
