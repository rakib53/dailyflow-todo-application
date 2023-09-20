import { useSelector } from "react-redux";

const useAuth = () => {
  const { user, token } = useSelector((state) => state.authSlice);

  if (!user._id || !token) {
    // Redirect to the login page if there's no user data
    return false;
  }

  // If the api call success then call the user info slice
  if (token && user?._id) {
    return true;
  }
};

export default useAuth;
