import { NextPage } from "next";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const Signup: NextPage = () => {
  const signup = (body: { username: string; password: string }) => {
    fetch("/api/signup", { body: JSON.stringify(body), method: "POST" })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const passwordsDoNotMatch = () => toast.error("Passwords do not match");
  const usernameRequired = () => toast.error("Username required");

  return (
    <form>
      <Toaster />
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          ref={username}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="******************"
          ref={password}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="******************"
          ref={confirmPassword}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            if (!username.current?.value) {
              usernameRequired();
            } else if (
              password.current?.value != confirmPassword.current?.value
            ) {
              passwordsDoNotMatch();
            } else if (
              username.current?.value &&
              password.current?.value &&
              confirmPassword.current?.value &&
              password.current.value == confirmPassword.current.value
            ) {
              signup({
                username: username.current?.value,
                password: password.current?.value,
              });
            }
          }}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default Signup;
