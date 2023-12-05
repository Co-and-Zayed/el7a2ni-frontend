import { Input } from "antd";
import styles from "VirtualClinic/components/SideBar/SideBar.module.css";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNav } from "VirtualClinic/hooks/useNav";
import { useEffect, useState } from "react";
import {
  navLinksDoctor,
  navLinksPatient,
  navLinksAdmin,
  settingsPatient,
  settingsDoctor,
  settingsAdmin,
} from "VirtualClinic/utils/navigationLinks";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { logoutAction } from "VirtualClinic/redux/User/userAction";
import { CLEAR_TIMEOUTS } from "VirtualClinic/redux/User/loginTypes";
// import { DashboardIcon } from "VirtualClinic/assets/images";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { SettingsIcon, LogoutIcon } from "VirtualClinic/assets/IconComponents";
import * as Routes from "VirtualClinic/Routes/VirtualClinicRoutes/paths";
import Logo from "VirtualClinic/assets/images/Logo.svg";
import LogoText from "VirtualClinic/assets/icons/LogoText.svg";

interface SideBarProps {}

const SideBar: FC<SideBarProps> = () => {
  const dispatch: any = useDispatch();
  const navigate = useNav();

  const [currentLink, setCurrentLink] = useState(0);
  const [currentNavLinks, setCurrentNavLinks] = useState<any>(null);
  const [currentSettingsLinks, setCurrentSettingsLinks] = useState<any>(null);

  const { userData, userType, accessToken, refreshToken } = useSelector(
    (state: RootState) => state.userReducer
  );

  useEffect(() => {}, [userData]);

  const generateLink = (link: {
    name: any;
    icon: any;
    route: any;
    index: any;
    onClick?: any;
  }) => {
    return (
      <div
        className={`${styles.linkContainer} ${
          currentLink === link.index ? styles.activeLink : styles.nonActiveLink
        } flex items-center`}
        onClick={() => {
          navigate(link.route);
          if (link?.onClick) {
            link?.onClick();
          }
        }}
      >
        <div
          className={`${currentLink === link.index ? styles.isActive : ""}`}
        ></div>

        <div className={`${styles.icon}`}>{link.icon}</div>
        <li className={`${styles.linkName}`} key={link.index}>
          {link.name}
        </li>
      </div>
    );
  };

  useEffect(() => {
    if (userType === "DOCTOR") {
      if (userData?.status === "ACCEPTED") {
        setCurrentNavLinks(navLinksDoctor);
      } else {
        setCurrentNavLinks(navLinksDoctor.slice(0, 1));
      }
      setCurrentSettingsLinks(settingsDoctor);
    } else if (userType === "PATIENT") {
      setCurrentNavLinks(navLinksPatient);
      setCurrentSettingsLinks(settingsPatient);
    } else if (userType === "ADMIN") {
      setCurrentNavLinks(navLinksAdmin);
      setCurrentSettingsLinks(settingsAdmin);
    } else {
      navigate("/login");
    }
  }, [userType]);

  const handleLogoutClick = async () => {
    // loop on each element in allTimeouts and clear it
    await dispatch({
      type: CLEAR_TIMEOUTS,
    });

    await dispatch(logoutAction());
    navigate("/login");
  };

  useEffect(() => {}, [userData]);

  useEffect(() => {
    setCurrentLink(-1);
    for (let i = 0; i < currentNavLinks?.length; i++) {
      if (window.location.pathname.includes(currentNavLinks[i]?.route)) {
        setCurrentLink(i);
        return;
      }
    }

    if (window.location.pathname.includes(Routes.SETTINGS_PATH)) {
      setCurrentLink(currentNavLinks?.length + 1);
      return;
    }
  }, [window.location.pathname, currentNavLinks]);

  return (
    <div className={`${styles.sideBar} flex flex-col items-start gap-y-0`}>
      {/* LOGO */}
      <div className={`w-full ${styles.paddingContainer}`}>
        <div className="w-full flex items-center justify-center mb-16">
          <img className={`${styles.logoIcon}`} src={Logo} alt="logo" />
          <img className={`${styles.logoText}`} src={LogoText} alt="logoText" />
        </div>

        {/* WALLET */}
        <div className={`w-full flex flex-col items-start justify-center`}>
          {userType === "PATIENT" && (
            <a className="w-full text-center mb-2" href="/pharmacy/dashboard">
              Switch to Pharmacy
            </a>
          )}
          <div className={`${styles.walletText} mb-1`}>MY WALLET</div>
          <div className="flex items-end">
            <p className={`${styles.walletValue}`}>
              {userData?.wallet?.toLocaleString()}
            </p>
            <p className={`${styles.walletCurrency}`}>EGP</p>
          </div>
        </div>
      </div>

      <div className={`w-full ${styles.divider}`}></div>

      <div className={`w-full h-full ${styles.paddingContainer}`}>
        {/* NAVIGATION LINKS */}
        <ul className={`h-full flex flex-col justify-between`}>
          <div>
            {currentNavLinks?.map((link: any, index: any) =>
              generateLink({ ...link, index })
            )}
          </div>

          <div>
            {generateLink({
              name: "Settings",
              icon: <SettingsIcon />,
              route: currentSettingsLinks
                ? currentSettingsLinks[0]?.route
                : "/settings",
              index: currentNavLinks?.length + 1,
            })}

            {generateLink({
              name: "Logout",
              icon: <LogoutIcon />,
              route: window.location.pathname,
              index: currentNavLinks?.length + 2,
              onClick: handleLogoutClick,
            })}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
