import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "../../assets/icons/NavbarIcons/avatar.webp";
import BellIcon from "../../assets/icons/NavbarIcons/bell-01.svg";
import CalenderICon from "../../assets/icons/NavbarIcons/calendar-date.svg";
import MoonStarIcon from "../../assets/icons/NavbarIcons/moon-star.svg";
import { logut } from "../../features/auth/authSlice";
import InviteColleaguesIcon from "../SVG/InviteColleaguesIcon";
import KeyboardShortCutIcon from "../SVG/KeyboardShortCutIcon";
import LogoutIcon from "../SVG/LogoutIcon";
import SettingIcon from "../SVG/SettingIcon";
import SupportIcon from "../SVG/SupportIcon";
import TeamIcon from "../SVG/TeamIcon";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [expandMenu, setExpandMenu] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [time, setTime] = useState(new Date());
  const expandUserMenuRef = useRef(null);
  const navigate = useNavigate();
  // getting the userInfomation
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Logging out the user
  const handleLogOut = () => {
    dispatch(logut());
    setIsLoading(true);
    setRedirect(true);
  };

  // Use useEffect to handle the redirection after 2 seconds
  useEffect(() => {
    if (redirect) {
      const timeout = setTimeout(() => {
        // Replace '/signin' with the actual URL of your sign-in page
        navigate("/signin");
      }, 2000);

      // Clear the timeout if the component is unmounted before the redirection
      return () => clearTimeout(timeout);
    }
  }, [redirect]);

  // Time is updating after 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // checking if the user click outside of the
  useEffect(() => {
    function handleClickOutSide(event) {
      if (
        expandUserMenuRef.current &&
        !expandUserMenuRef.current.contains(event.target)
      ) {
        setExpandMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [expandUserMenuRef, expandMenu]);

  return (
    <div className={styles.navbarWrapper}>
      <h2 className={styles.taskName}>{`Hello ${user?.userName}`}</h2>
      <div className={styles.dateTimeAndNotificationAvatarWrapper}>
        <div className={styles.dateAndTimeWrapper}>
          <div className={styles.dateWrapper}>
            <img className={styles.dateIcon} src={CalenderICon} alt="" />
            <span className={styles.date}>
              {time.getDate()} {months[time.getMonth()]}, {time.getFullYear()}
            </span>
          </div>
          <div className={styles.timeWrapper}>
            <img className={styles.timeIcon} src={MoonStarIcon} alt="" />
            <span className={styles.time}>{time.toLocaleTimeString()}</span>
          </div>
        </div>
        <div className={styles.NotificationAndAvatarWrapper}>
          <div className={styles.notificationWrapper}>
            <img className={styles.notificationIcon} src={BellIcon} alt="" />
          </div>
          <div className={styles.avatarWrapper} ref={expandUserMenuRef}>
            {user?.avatar ? (
              <img
                className={styles.avatar}
                src={Avatar}
                alt=""
                onClick={() => setExpandMenu(!expandMenu)}
              />
            ) : (
              <button
                className={styles.headerAvatar}
                onClick={() => setExpandMenu(!expandMenu)}
              >
                {user?.userName?.slice(0, 1)}
              </button>
            )}

            {expandMenu && (
              <div
                className={`${styles.menu} ${expandMenu && styles.expandMenu}`}
              >
                <div className={styles.profileInfo}>
                  <div className={styles.avatarText}>
                    {user?.userName?.slice(0, 1)}
                  </div>
                  <div>
                    <p className={styles.name}>
                      {user?.userName?.length > 13
                        ? user?.userName?.slice(0, 13) + "."
                        : user?.userName}
                    </p>

                    <p className={styles.gmail}>
                      {user?.email?.length > 16
                        ? user?.email?.slice(0, 16) + "..."
                        : user?.email}
                    </p>
                  </div>
                </div>
                <div className={styles.menuItemWrapper}>
                  <div className={styles.menuItem}>
                    <div className={styles.menuLink}>
                      <SettingIcon />
                      <span>Settings</span>
                    </div>

                    <div className={styles.menuLink}>
                      <KeyboardShortCutIcon />
                      <span>Keyboard shortcuts</span>
                    </div>
                  </div>
                  <div className={styles.menuItem}>
                    <div className={styles.menuLink}>
                      <TeamIcon />
                      <span>Team</span>
                    </div>

                    <div className={styles.menuLink}>
                      <InviteColleaguesIcon />
                      <span>Invite Colleagues</span>
                    </div>
                  </div>

                  <div className={styles.menuItem}>
                    <div className={styles.menuLink}>
                      <SupportIcon />
                      <span>Support</span>
                    </div>
                  </div>

                  <div className={styles.menuItem}>
                    <div
                      className={styles.menuLink}
                      onClick={() => handleLogOut()}
                    >
                      <LogoutIcon />
                      <span>Logut</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
