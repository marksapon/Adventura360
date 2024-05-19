import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decrypt } from "./aes.mjs";
import Cookies from "js-cookie";
import axios from "axios";
import { CiUser, CiLock } from "react-icons/ci";
import usersldb from "../database/Adventura360.users.json";

function Login({ BACKEND_URL, setLoginType }) {
  const [users, setUsers] = useState([]); // Registered Users
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const navigate = useNavigate();

  /* AES-256 Decryption */
  const key = import.meta.env.VITE_AES_KEY;

  /* Check if user is already logged in and fetch users from the database */
  useEffect(() => {
    const loginType = Cookies.get("loginType");
    if (loginType) {
      setIsLoginSuccessful(true);
      setLoginType(loginType);
    } else {
      axios
        .get(`${BACKEND_URL}/getUsers`)
        .then((users) => {
          setUsers(users.data);
        })
        .catch((err) => {
          console.log("Login Error:", err.message);
          setUsers(usersldb);
        });
    }
    // window.onbeforeunload = () => {
    //   Cookies.remove("loginType");
    // };
  }, []);

  /* Handle login success */
  useEffect(() => {
    if (isLoginSuccessful) {
      const redirectPath = sessionStorage.getItem("redirectPath");
      navigate(redirectPath || "/app");
    }
  }, [isLoginSuccessful]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Wait for the users data to be loaded before proceeding
    await new Promise((resolve) => {
      const checkData = setInterval(() => {
        if (users.length > 0) {
          clearInterval(checkData);
          resolve();
        }
      }, 100);
    });

    const account = users.find(
      (account) =>
        decrypt(account.username, key) === username &&
        decrypt(account.password, key) === password,
    );

    if (account) {
      // login successful
      setLoginMessage("Successfully logged in");
      setIsLoginSuccessful(true);
      setLoginType("account");

      // Set a cookie
      Cookies.set("loginType", "account");
    } else {
      // login failed
      setLoginMessage("Invalid username or password");
      setIsLoginSuccessful(false);
    }
  };

  const handleGuestLogin = (e) => {
    e.preventDefault();

    setIsLoginSuccessful(true);
    setLoginType("guest");

    // Set a cookie
    Cookies.set("loginType", "guest");

    const redirectPath = sessionStorage.getItem("redirectPath");
    navigate(redirectPath || "/app");
  };

  return (
    <div className="relative flex h-screen w-full px-4">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("/assets/Login%20Module/cvsu.webp")` }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      <div className="z-50 m-auto grid h-[550px] w-[450px] grid-cols-1 shadow-lg shadow-gray-900 sm:max-w-[900px] md:w-full md:grid-cols-2">
        <div
          className="hidden w-full items-center justify-center md:block"
          style={{
            backgroundImage: `url("/assets/Login Module/login logo img2.webp")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="flex flex-col justify-between bg-white px-8 py-4 shadow-lg shadow-gray-900">
          <div className="mt-4 flex w-full flex-col items-center justify-center text-center">
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="text-sm text-gray-500">
              Explore{" "}
              <span className="font-semibold text-green-600">
                Adventura 360°
              </span>{" "}
              as{" "}
              <span className="font-semibold text-orange-600">
                administrator
              </span>
              .
            </p>
          </div>

          <div>
            <form id="loginForm" onSubmit={handleLogin}>
              {loginMessage && (
                <p
                  className={`mb-1 w-full text-sm ${isLoginSuccessful ? "font-bold text-green-600" : "font-bold text-red-500"}`}
                >
                  {loginMessage}
                </p>
              )}

              <div className="flex flex-col gap-2">
                <h1 className="text-sm font-semibold text-gray-500">
                  Username
                </h1>
                <div className="relative mr-2">
                  <CiUser className="absolute left-3 top-1/2 -translate-y-1/2 transform" />
                  <input
                    className="w-full rounded-lg border p-2 pl-8 text-sm shadow-lg"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <h1 className="text-sm font-semibold text-gray-500">
                  Password
                </h1>
                <div className="relative mr-2">
                  <CiLock className="absolute left-3 top-1/2 -translate-y-1/2 transform" />
                  <input
                    className="w-full rounded-lg border p-2 pl-8 text-sm shadow-lg"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
          <div>
            <button
              className="my-4 w-full rounded-lg border border-gray-300 py-2 text-black shadow-lg hover:border-green-600 hover:bg-slate-100"
              form="loginForm"
            >
              Login as administrator
            </button>
            <div className="flex items-center space-x-2">
              <hr className="flex-grow border-t-2 border-gray-500" />
              <p className="text-sm font-semibold text-gray-500">or</p>
              <hr className="flex-grow border-t-2 border-gray-500" />
            </div>
            <button
              className="box-shadow my-4 w-full rounded-lg border border-gray-500 bg-green-600 py-2 font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:border-gray-700 hover:bg-green-500"
              onClick={handleGuestLogin}
            >
              Continue as Guest
            </button>
          </div>
          <h1 className="flex w-full items-center justify-center text-xs font-thin text-gray-500">
            Adventura 360° · 2024
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
