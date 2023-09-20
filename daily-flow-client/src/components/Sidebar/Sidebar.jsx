import React, { useState } from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/icons/logo.png";
import XClose from "../../assets/icons/x-close.svg";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  // Showing the upgrade account popup state
  const [showUpgrade, setShowUpgrade] = useState(true);

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.menuContentWrapper}>
        <Link className={styles.NavbarLogoWrapper} to={"/"}>
          <img className={styles.NavbarLogo} src={LOGO} alt="Daily task logo" />
        </Link>

        <ul className={styles.navItemsWrapper}>
          <Link to={"/"} className={styles.navItems}>
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <g id="zap-fast">
                <path
                  id="Icon"
                  d="M9 18.4287H3.5M6.5 12.9287H2M9 7.42871H4M17 3.92871L10.4036 13.1637C10.1116 13.5725 9.96562 13.7768 9.97194 13.9472C9.97744 14.0956 10.0486 14.2338 10.1661 14.3245C10.3011 14.4287 10.5522 14.4287 11.0546 14.4287H16L15 21.9287L21.5964 12.6937C21.8884 12.285 22.0344 12.0806 22.0281 11.9102C22.0226 11.7618 21.9514 11.6236 21.8339 11.5329C21.6989 11.4287 21.4478 11.4287 20.9454 11.4287H16L17 3.92871Z"
                  stroke="#48505E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <span className={styles.navLinks}>Routine</span>
          </Link>
          <Link to={"/daily-task"} className={styles.navItems}>
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <g id="calendar-check-01">
                <path
                  id="Icon"
                  d="M21 10.9287H3M16 2.92871V6.92871M8 2.92871V6.92871M9 16.9287L11 18.9287L15.5 14.4287M7.8 22.9287H16.2C17.8802 22.9287 18.7202 22.9287 19.362 22.6017C19.9265 22.3141 20.3854 21.8552 20.673 21.2907C21 20.6489 21 19.8089 21 18.1287V9.72871C21 8.04855 21 7.20847 20.673 6.56674C20.3854 6.00225 19.9265 5.54331 19.362 5.25569C18.7202 4.92871 17.8802 4.92871 16.2 4.92871H7.8C6.11984 4.92871 5.27976 4.92871 4.63803 5.25569C4.07354 5.54331 3.6146 6.00225 3.32698 6.56674C3 7.20847 3 8.04855 3 9.72871V18.1287C3 19.8089 3 20.6489 3.32698 21.2907C3.6146 21.8552 4.07354 22.3141 4.63803 22.6017C5.27976 22.9287 6.11984 22.9287 7.8 22.9287Z"
                  stroke="#48505E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <span className={styles.navLinks}>Task</span>
          </Link>
          <Link to={"/personal-project"} className={styles.navItems}>
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <g id="hand">
                <path
                  id="Icon"
                  d="M6.9 12.3732V15.1509M6.9 12.3732V5.70649C6.9 4.78601 7.66112 4.03982 8.6 4.03982C9.53888 4.03982 10.3 4.78601 10.3 5.70649M6.9 12.3732C6.9 11.4527 6.13888 10.7065 5.2 10.7065C4.26112 10.7065 3.5 11.4527 3.5 12.3732V14.5954C3.5 19.1978 7.30558 22.9287 12 22.9287C16.6944 22.9287 20.5 19.1978 20.5 14.5954V9.03982C20.5 8.11935 19.7389 7.37316 18.8 7.37316C17.8611 7.37316 17.1 8.11935 17.1 9.03982M10.3 5.70649V11.8176M10.3 5.70649V4.59538C10.3 3.6749 11.0611 2.92871 12 2.92871C12.9389 2.92871 13.7 3.6749 13.7 4.59538V5.70649M13.7 5.70649V11.8176M13.7 5.70649C13.7 4.78601 14.4611 4.03982 15.4 4.03982C16.3389 4.03982 17.1 4.78601 17.1 5.70649V9.03982M17.1 9.03982V11.8176"
                  stroke="#48505E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <span className={styles.navLinks}>Projects</span>
          </Link>
          <Link to={"/notes"} className={styles.navItems}>
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <g id="file-05">
                <path
                  id="Icon"
                  d="M14 3.19824V7.32878C14 7.88883 14 8.16886 14.109 8.38277C14.2049 8.57093 14.3578 8.72392 14.546 8.81979C14.7599 8.92878 15.0399 8.92878 15.6 8.92878H19.7305M14 17.9287H8M16 13.9287H8M20 10.9169V18.1287C20 19.8089 20 20.6489 19.673 21.2907C19.3854 21.8552 18.9265 22.3141 18.362 22.6017C17.7202 22.9287 16.8802 22.9287 15.2 22.9287H8.8C7.11984 22.9287 6.27976 22.9287 5.63803 22.6017C5.07354 22.3141 4.6146 21.8552 4.32698 21.2907C4 20.6489 4 19.8089 4 18.1287V7.72871C4 6.04855 4 5.20847 4.32698 4.56674C4.6146 4.00225 5.07354 3.54331 5.63803 3.25569C6.27976 2.92871 7.11984 2.92871 8.8 2.92871H12.0118C12.7455 2.92871 13.1124 2.92871 13.4577 3.0116C13.7638 3.08509 14.0564 3.2063 14.3249 3.37079C14.6276 3.55632 14.887 3.81574 15.4059 4.3346L18.5941 7.52282C19.113 8.04168 19.3724 8.30111 19.5579 8.60386C19.7224 8.87227 19.8436 9.16491 19.9171 9.47102C20 9.81628 20 10.1832 20 10.9169Z"
                  stroke="#48505E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <span className={styles.navLinks}>Notes</span>
          </Link>
          <Link to={"/report"} className={styles.navItems}>
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <g id="pie-chart-01">
                <path
                  id="Icon"
                  d="M21.2104 16.8183C20.5742 18.3228 19.5792 19.6485 18.3123 20.6796C17.0454 21.7107 15.5452 22.4157 13.9428 22.7331C12.3405 23.0504 10.6848 22.9704 9.12055 22.5001C7.55627 22.0297 6.13103 21.1834 4.96942 20.0349C3.80782 18.8865 2.94522 17.471 2.45704 15.9122C1.96886 14.3534 1.86996 12.6988 2.169 11.0929C2.46804 9.48707 3.1559 7.97892 4.17245 6.70032C5.189 5.42172 6.50329 4.41161 8.0004 3.75829M21.2392 9.10146C21.6395 10.0679 21.8851 11.0897 21.9684 12.1291C21.989 12.3859 21.9993 12.5143 21.9483 12.63C21.9057 12.7266 21.8213 12.818 21.7284 12.8682C21.6172 12.9283 21.4783 12.9283 21.2004 12.9283H12.8004C12.5204 12.9283 12.3804 12.9283 12.2734 12.8738C12.1793 12.8259 12.1028 12.7494 12.0549 12.6553C12.0004 12.5483 12.0004 12.4083 12.0004 12.1283V3.72829C12.0004 3.45043 12.0004 3.31149 12.0605 3.20027C12.1107 3.10737 12.2021 3.02298 12.2987 2.98039C12.4144 2.92939 12.5428 2.93969 12.7996 2.96028C13.839 3.04361 14.8608 3.28917 15.8272 3.6895C17.0405 4.19204 18.1429 4.92864 19.0715 5.85722C20.0001 6.78581 20.7367 7.8882 21.2392 9.10146Z"
                  stroke="#48505E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <span className={styles.navLinks}>Report</span>
          </Link>
        </ul>
      </div>

      {showUpgrade && (
        <div className={styles.upgradePlanContent}>
          <div className={styles.innerUpgradeWrapper}>
            <img
              onClick={() => setShowUpgrade(!showUpgrade)}
              className={styles.CloseUpgradeBtn}
              src={XClose}
              alt=""
            />
            <div className={styles.circle}>
              <p className={styles.remainDays}>50%</p>
            </div>

            <div>
              <h5 className={styles.daysLeft}>15 days left</h5>
              <p className={styles.daysLeftDescription}>
                You have 15 days left to expire your trial period. Want to
                continue more?
              </p>
              <Link className={styles.upgradePlanBtn}>Upgrade plan</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
