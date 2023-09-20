import { Route, Routes, useLocation } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Sidebar from "./components/Sidebar/Sidebar";
import SignIn from "./components/SignIn/SignIn";
import Signup from "./components/SignUp/Signup";
import useAuthCheck from "./hook/useAuthCheck";
import DailyRoutine from "./pages/DailyRoutine/DailyRoutine";
import DailyTask from "./pages/DailyTask/DailyTask";
import Notes from "./pages/Notes/Notes";
import PersonalProject from "./pages/PersonalProject/PersonalProject";
import Report from "./pages/Report/Report";

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/signin";
  const isAuth = useAuthCheck();

  return !isAuth ? (
    <Loading />
  ) : (
    <>
      {isAuthPage && (
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      )}

      {!isAuthPage && (
        <div className="homeLayout">
          <Sidebar />
          <div className="NavbarAndContentWrapper">
            <Navbar />
            <div className="contentWrapper">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <DailyRoutine />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/daily-task"
                  element={
                    <PrivateRoute>
                      <DailyTask />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/personal-project"
                  element={
                    <PrivateRoute>
                      <PersonalProject />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/notes"
                  element={
                    <PrivateRoute>
                      <Notes />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/report"
                  element={
                    <PrivateRoute>
                      <Report />
                    </PrivateRoute>
                  }
                ></Route>
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
