// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
// import "../App.css";

// const Register = () => {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [error, setError] = useState("");
//   const [officialEmail, setOfficialEmail] = useState("");
//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setConfirmPasswordVisible(!confirmPasswordVisible);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, officialEmail, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Registration Successful!");
//         navigate("/login");
//       } else {
//         setError(data.message || "Registration failed");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   const handleConfirmPasswordChange = (e) => {
//     const value = e.target.value;
//     setConfirmPassword(value);
//     setError(value !== password ? "Passwords do not match!" : "");
//   };

//   return (
//     <div className="register-container">
//       <div className="register-card">
//         <h2 className="title">Register</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label>Name: </label>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//               <label>Official Email : </label>
//               <input
//                 type="email"
//                 // placeholder="e.g., yourname@gov.in"
//                 value={officialEmail}
//                 onChange={(e) => setOfficialEmail(e.target.value)}
//                 required
//               />
//             </div>

//           <div className="input-group">
//             <label>Email: </label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Password:</label>
//             <div style={{ position: 'relative' }}>
//               <input
//                 type={passwordVisible ? 'text' : 'password'}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 style={{ paddingRight: '30px' }}
//               />
//               <span
//                 onClick={togglePasswordVisibility}
//                 style={{
//                   position: 'absolute',
//                   right: '15px',
//                   top: '40%',
//                   transform: 'translateY(-50%)',
//                   cursor: 'pointer',
//                   fontSize: '20px',
//                 }}
//               >
//                 {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
//               </span>
//             </div>
//           </div>

//           <div className="input-group">
//             <label>Confirm Password:</label>
//             <div style={{ position: 'relative' }}>
//               <input
//                 type={confirmPasswordVisible ? 'text' : 'password'}
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChange={handleConfirmPasswordChange}
//                 required
//                 style={{ paddingRight: '30px' }}
//               />
//               <span
//                 onClick={toggleConfirmPasswordVisibility}
//                 style={{
//                   position: 'absolute',
//                   right: '15px',
//                   top: '40%',
//                   transform: 'translateY(-50%)',
//                   cursor: 'pointer',
//                   fontSize: '20px',
//                 }}
//               >
//                 {confirmPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
//               </span>
//             </div>
//           </div>

//           <p className="fplink">
//             Already have an account? <Link to="/login">Login</Link>
//           </p>

//           {error && <p className="error-message">{error}</p>}

//           <button type="submit" className="btn" disabled={error !== ""}>
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setError(value !== password ? "Passwords do not match!" : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const allowedDomains = ["safestreet.org"];
    const emailDomain = officialEmail.split("@")[1] || "";

    if (!allowedDomains.includes(emailDomain)) {
      setError("Only official emails domains are allowed.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, officialEmail, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login to continue.");
        navigate("/login");
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div style={styles.fullScreenWrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Register</h2>

        <div style={styles.inputGroup}>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Official Email:</label>
          <input
            type="email"
            placeholder="official Email"
            value={officialEmail}
            onChange={(e) => setOfficialEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Personal Email:</label>
          <input
            type="email"
            placeholder="Enter your personal email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Password:</label>
          <div style={styles.passwordWrapper}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.inputWithIcon}
            />
            <span onClick={togglePasswordVisibility} style={styles.icon}>
              {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label>Confirm Password:</label>
          <div style={styles.passwordWrapper}>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              style={styles.inputWithIcon}
            />
            <span onClick={toggleConfirmPasswordVisibility} style={styles.icon}>
              {confirmPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button} disabled={error !== ""}>
          Register
        </button>

        <p style={styles.link}>
          Already have an account?{" "}
          <Link to="/login" style={styles.inlineLink}>Login</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  fullScreenWrapper: {
    position: "fixed",
    inset: 0,
    zIndex: 10,
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  form: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: "40px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "450px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
    color: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2rem",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    fontSize: "1rem",
  },
  inputWithIcon: {
    width: "100%",
    padding: "10px 35px 10px 10px",
    borderRadius: "6px",
    border: "none",
    fontSize: "1rem",
  },
  passwordWrapper: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "20px",
    color: "#ccc",
  },
  error: {
    color: "#ff6b6b",
    fontSize: "0.9rem",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
  },
  link: {
    marginTop: "15px",
    fontSize: "0.9rem",
    textAlign: "center",
  },
  inlineLink: {
    color: "#ffc107",
    textDecoration: "none",
  },
};

export default Register;
