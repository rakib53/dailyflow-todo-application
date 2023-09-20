import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetUserInfoQuery } from "../features/auth/authApi";
import { getUserInfo } from "../features/auth/authSlice";

const useAuthCheck = () => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const { data: userData, isLoading, isError } = useGetUserInfoQuery();
  const { token } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if ((!isLoading && isError) || !token) {
      navigate("/signin");
      setIsAuth(true);
    }

    if (!isLoading && !isError && userData?.user?._id) {
      dispatch(getUserInfo(userData?.user));
      setIsAuth(true);
    }
  }, [isError, isLoading, userData]);

  return isAuth;
};

export default useAuthCheck;
