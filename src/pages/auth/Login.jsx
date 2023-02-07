import React, { useState } from "react";
import Helmet from "../../components/Helmet";
import Section from "../../components/Section";
import styles from "./auth.module.scss";
import Card from "../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/images/login.png";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
// import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate;
  const loginUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // ...
        toast.success("Login Successful...");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Login Successful...");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <Helmet title={"Đăng nhập"}>
      <Section>
        <section className={` container ${styles.auth}`}>
          <div className={styles.img}>
            <img src={loginImg} alt="Login" width="400" />
          </div>
          <Card>
            <div className={styles.form}>
              <h2>Login</h2>
              <form onSubmit={loginUser}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="--btn --btn-primary --btn-block"
                >
                  Login
                </button>
                <div className={styles.links}>
                  <Link to="/reset">Forgot Password?</Link>
                </div>
                <p>-- or --</p>
              </form>
              <button
                type="submit"
                className="--btn --btn-block"
                onClick={signInWithGoogle}
              >
                <i className="bx bxl-google"></i>
                Login with Google
              </button>
              <span className={styles.register}>
                <p>
                  Don't have an account?{" "}
                  <Link to="/register">
                    <b>Register</b>
                  </Link>
                </p>
              </span>
            </div>
          </Card>
        </section>
      </Section>
    </Helmet>
  );
};

export default Login;
