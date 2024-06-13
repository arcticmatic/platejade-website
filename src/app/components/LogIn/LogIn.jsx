"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import css from "./LogIn.module.css";
import EyeIcon from "../images/EyeIcon.svg";
import ClosedEye from "../images/ClosedEye.svg";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LogIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    console.log("sess stat", sessionStatus);

    if (sessionStatus === "authenticated") {
      router.replace("/admin/home");
    }
  }, [sessionStatus, router]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.url) {
      // console.log("res:", res);
      console.log("inside redirect");
      router.replace("/admin/home");
      console.log("ok");
    } else if (res?.error) {
      console.log("Invalid email or password");
    } else {
      console.log("res:", res);
      // setError("");
    }
  };

  return (
    <>
      <section className={css.loginSection}>
        <h2 className={css.loginTitle}>Login to Administration </h2>

        <p className={css.loginDetails}>
          <span className={poppins.className}>
            Please enter your details to continue
          </span>
        </p>
        <form className={css.loginForm} onSubmit={handleSubmit}>
          <label className={css.emailLabel}>
            <div>
              <p>
                E-mail <span className={css.requiredSymbol}>*</span>
              </p>
            </div>
            <input
              className={css.formInput}
              placeholder="email@gmail.com"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <label className={css.emailLabel}>
            <div>
              <p>
                Password <span className={css.requiredSymbol}>*</span>
              </p>
            </div>
            <span className={css.inputIcon}>
              <input
                className={css.formInput}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Image
                className={css.passwordIcon}
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
                src={!showPassword ? EyeIcon : ClosedEye}
                alt="Toggle password visibility"
              />
            </span>
          </label>

          <button className={css.loginBtn} type="submit">
            Login
          </button>
        </form>
        <Link href="/admin/forgot-password" className={css.forgotPasswordText}>
          Forgot password?
        </Link>
      </section>
    </>
  );
}
