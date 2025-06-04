// // MainLayout.jsx
// import React from "react";
// import "../App.css"; // Correct relative path from assets/ to src/
//  // App-wide styles only used when this layout is active
// import Header from "./header";
// import Sidebar from "./sidebar";

// import { useLocation } from "react-router-dom";

// const MainLayout = ({ children, openSidebarToggle, toggleSidebar, isMobile }) => {
//   const location = useLocation();
//   const hideLayoutRoutes = ["/", "/login", "/register", "/otp","/forgotpassword"];
//   const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

//   return (
//     <div className="grid-container">
//       {!shouldHideLayout && (
//         <>
//           <Header openSidebar={toggleSidebar} />
//           {isMobile && (
//             <button className="hamburger-button" onClick={toggleSidebar}>
//               <div className="bar"></div>
//               <div className="bar"></div>
//               <div className="bar"></div>
//             </button>
//           )}
//           <Sidebar
//             openSidebarToggle={openSidebarToggle}
//             toggleSidebar={toggleSidebar}
//           />
//         </>
//       )}
//       <main className="main-content">{children}</main>
//     </div>
//   );
// };

// export default MainLayout;
// MainLayout.jsx
// import React from "react";
// import "../App.css"; // Ensure global styles are applied
// import Header from "./header";
// import Sidebar from "./sidebar";
// import { useLocation } from "react-router-dom";

// const MainLayout = ({ children, openSidebarToggle, toggleSidebar, isMobile }) => {
//   const location = useLocation();
//   const hideLayoutRoutes = ["/", "/login", "/register", "/otp", "/forgotpassword"];
//   const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

//   return (
//     <div className={shouldHideLayout ? "" : "grid-container"}>
//       {!shouldHideLayout && (
//         <>
//           <Header openSidebar={toggleSidebar} />
//           {isMobile && (
//             <button className="hamburger-button" onClick={toggleSidebar}>
//               <div className="bar"></div>
//               <div className="bar"></div>
//               <div className="bar"></div>
//             </button>
//           )}
//           <Sidebar
//             openSidebarToggle={openSidebarToggle}
//             toggleSidebar={toggleSidebar}
//           />
//         </>
//       )}

//       <main className={`main-content ${shouldHideLayout ? "center-layout" : ""}`}>
//         {children}
//       </main>
//     </div>
//   );
// };
// export default MainLayout;
import React from "react";
import "../App.css"; // Ensure global styles are applied
import Header from "./header";
import Sidebar from "./sidebar";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children, openSidebarToggle, toggleSidebar, isMobile }) => {
  const location = useLocation();
  const hideLayoutRoutes = ["/", "/login", "/register", "/otp", "/forgotpassword"];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className={shouldHideLayout ? "" : "layout-container"}>
      {!shouldHideLayout && (
        <>
          <Header openSidebar={toggleSidebar} />
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            toggleSidebar={toggleSidebar}
          />
        </>
      )}

      <main
        className={`main-content ${shouldHideLayout ? "center-layout" : ""}`}
        style={{
          marginLeft:
            !shouldHideLayout && !isMobile && openSidebarToggle ? "200px" : "0",
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
