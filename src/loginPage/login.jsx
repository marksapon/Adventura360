import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decrypt } from "./aes.mjs";
import Cookies from "js-cookie";
import axios from "axios";

function Login({ BACKEND_URL, setLoginType }) {
  const [users, setUsers] = useState([]); // Registered Users
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const navigate = useNavigate();

  /* AES-256 Decryption */
  // DO NOT LOSE THE KEY OR YOU WILL GENERATE A NEW ONE AND RE ENCRYPT THE USERS DATABASE

  const key =
    "08f810783d07d71f570b34ef3bbbdb98715799ae41a0d9a2f538ba216673ed55";

  /* Fetch Users from the Database */
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/getUsers`)
      .then((users) => {
        setUsers(users.data);
      })
      .catch((err) => {
        console.log("Login Error:", err.message);
      });

    // console.log("Key:", generateKey()); // Generate a new key
    // encrypt(key); // Encrypt the users database

    if (isLoginSuccessful) {
      const redirectPath = sessionStorage.getItem("redirectPath");
      navigate(redirectPath || "/app");
    }
  }, [isLoginSuccessful]);

  const handleLogin = (e) => {
    e.preventDefault();

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

      const redirectPath = sessionStorage.getItem("redirectPath");
      navigate(redirectPath || "/app");
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
    <div className="flex h-screen w-full">
      <div className="m-auto grid h-[550px] grid-cols-1 shadow-lg shadow-gray-600 sm:max-w-[900px] md:grid-cols-2">
        <div className="hidden h-[550px] w-full md:block">
          <img
            className="h-full w-full"
            src="/assets/Login Module/trees.jpg"
            alt="Trees"
          />
        </div>

        <div className="flex flex-col justify-around p-4">
          <form onSubmit={handleLogin}>
            {loginMessage && (
              <p
                className={`mb-4 ${isLoginSuccessful ? "font-bold text-green-600" : "font-bold text-red-500"}`}
              >
                {loginMessage}
              </p>
            )}
            <input
              className="mr-2 w-full border p-2"
              type="text"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              className="w-full border p-2"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="my-4 w-full bg-green-700 py-2 text-white hover:bg-green-600">
              Sign In
            </button>
            <p>
              <input type="checkbox" className="mr-2" />
              Remember me
            </p>
          </form>
          <button
            className="my-4 w-full bg-green-700 py-2 text-white hover:bg-green-600"
            onClick={handleGuestLogin} // Modify this line
          >
            Continue as Guest
          </button>
          <p className="text-center">Forgot Username or Password?</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
