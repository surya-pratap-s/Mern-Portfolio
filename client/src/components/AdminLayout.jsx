import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProfileApi } from "../api/useApi";

const menuData = [
  { title: "Dashboard", link: "/admin/dashboard", icon: "bi-speedometer2" },
  {
    title: "Account",
    link: "#Account",
    icon: "bi-person-gear",
    collapse: true,
    subMenu: [
      { title: "Change Password", link: "/admin/change-password", icon: "bi-eye-fill" },
      { title: "Logout", icon: "bi-box-arrow-right" }
    ]
  },
  { title: "Basic Details", link: "/admin/basic-details", icon: "bi-person-badge" },
  { title: "Academics", link: "/admin/academics", icon: "bi-mortarboard" },
  { title: "Projects", link: "/admin/projects", icon: "bi-code-slash" },
  { title: "Experience", link: "/admin/experience", icon: "bi-briefcase" },
  { title: "Certificate", link: "/admin/certificate", icon: "bi-patch-check" }
];

const AdminLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const { profile } = useProfileApi();

  const [dateTime, setDateTime] = useState(new Date());
  const isActive = (link) => link && location.pathname === link;
  const [isIcon, setIsIcon] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dateOptions = { month: "short", day: "numeric" };
  const formattedDate = dateTime.toLocaleDateString("en-US", dateOptions);
  const formattedTime = dateTime.toLocaleTimeString("en-US", { hour12: true, });

  useEffect(() => {
    const body = document.body;

    if (isIcon) { body.classList.add('sidebar-icon-only'); }
    else { body.classList.remove('sidebar-icon-only'); }

    return () => {
      body.classList.remove('sidebar-icon-only');
    };
  }, [isIcon]);


  const handleClickIcon = () => setIsIcon(prev => !prev);
  const handleClickSidebar = () => setIsSidebar(prev => !prev);


  return (
    <div className="container-scroller">
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex justify-content-center">

          <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
            <a className="navbar-brand brand-logo">
              <img src="/assets/img/admin-icon.png" alt="logo" />
              <span>Portfolio</span>
            </a>
            <span onClick={handleClickIcon} className="navbar-toggler navbar-toggler align-self-center" type="button">
              <span className="typcn typcn-th-menu"></span>
            </span>
          </div>
        </div>

        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <ul className="navbar-nav me-lg-2">
            <li className="nav-item nav-profile dropdown">
              <span className="nav-link" data-bs-toggle="dropdown" id="profileDropdown">
                <img src={profile?.profileImage || "/assets/img/face.jpg"} alt="profile" />
                <span className="nav-profile-name">{profile?.fullName || "Developer"}</span>
              </span>
              <div onClick={logout} className="dropdown-menu dropdown-menu-right navbar-dropdown py-0" aria-labelledby="profileDropdown">
                <a className="dropdown-item"><i className="typcn typcn-eject text-primary" />Logout</a>
              </div>
            </li>
          </ul>

          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-date dropdown">
              <a className="nav-link d-flex justify-content-center align-items-center">
                <h6 className="date mb-0">Today : {formattedDate}</h6>
                <i className="typcn typcn-calendar" />
              </a>
            </li>
            <li className="nav-item nav-date dropdown">
              <a className="nav-link d-flex justify-content-center align-items-center">
                <h6 className="date mb-0">Time : {formattedTime}</h6>
                <i className="typcn typcn-calendar" />
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="#" data-bs-toggle="dropdown">
                <i className="typcn typcn-mail mx-0" />
                <span className="count" />
              </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                <p className="mb-0 fw-normal float-start dropdown-header">Messages</p>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img src="/assets/img/face.jpg" alt="image" className="profile-pic" />
                  </div>
                  <div className="preview-item-content flex-grow">
                    <h6 className="preview-subject ellipsis fw-normal">David Grey</h6>
                    <p className="fw-light small-text text-muted mb-0">The meeting is cancelled</p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img src="/assets/img/face.jpg" alt="image" className="profile-pic" />
                  </div>
                  <div className="preview-item-content flex-grow">
                    <h6 className="preview-subject ellipsis fw-normal"> Johnson</h6>
                    <p className="fw-light small-text text-muted mb-0">Upcoming board meeting</p>
                  </div>
                </a>
              </div>
            </li>
          </ul>

          <button onClick={handleClickSidebar} className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="typcn typcn-th-menu" />
          </button>
        </div>
      </nav>

      <div className="container-fluid page-body-wrapper" style={{ overflow: "hidden" }}>
        <nav className={`sidebar sidebar-offcanvas ${isSidebar ? 'active' : ''}`} id="sidebar">
          <ul className={`nav ${isIcon ? "px-1" : ""}`}>
            {menuData.map((item, index) => {
              const hasActiveSub = item.subMenu?.some(sub => isActive(sub.link));
              const isItemActive = isActive(item.link) || hasActiveSub;

              return (
                <li key={index} className={`nav-item mb-2 rounded-2 border-0 overflow-hidden ${isItemActive ? "active shadow-lg" : ""} ${isIcon ? "" : "card"}`}>
                  {!item.collapse ? (
                    <a className="nav-link" href={item.link}>
                      <i className={`bi ${item.icon} menu-icon`} />
                      <span className="menu-title">{item.title}</span>
                    </a>
                  ) : (<>
                    <Link className="nav-link" data-bs-toggle="collapse" to={item.link} aria-expanded={hasActiveSub ? "true" : "false"} aria-controls={item.title}>
                      <i className={`bi ${item.icon} menu-icon`} />
                      <span className="menu-title">{item.title}</span>
                      <i className="menu-arrow" />
                    </Link>
                    <div className={`collapse ${hasActiveSub ? "show" : ""}`} id={item.title}>
                      <div className="nav flex-column sub-menu">
                        {item.subMenu.map((sub, i) => (
                          sub.title === "Logout" ? (
                            <span key={i} onClick={logout} className="nav-item justify-content-start gap-2 rounded-0 text-start w-100 text-black" >
                              <i className={`bi ${sub.icon} menu-icon `} />
                              <span>{sub.title}</span>
                            </span>
                          ) : (
                            <Link key={i} to={sub.link} className={`nav-item justify-content-start text-black gap-2 ${isActive(sub.link) ? "active" : ""}`}>
                              <i className={`bi ${sub.icon} menu-icon`} />
                              <span>{sub.title}</span>
                            </Link>
                          )
                        ))}

                      </div>
                    </div>
                  </>)}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="main-panel">
          <div className="content-wrapper" style={{ overflow: "auto" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
