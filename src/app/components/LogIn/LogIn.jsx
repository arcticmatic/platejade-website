"use client";

import css from "./LogIn.module.css";
import { useState } from "react";
import { Poppins } from "next/font/google";
import EyeIcon from "../images/EyeIcon.svg";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <section className={css.loginSection}>
        <h2 className={css.loginTitle}>Login to Administration </h2>

        <p className={css.loginDetails}>
          <span className={poppins.className}>
            Please enter your details to continue
          </span>
        </p>
        <form className={css.loginForm}>
          <label className={css.emailLabel}>
            <div>
              <p>
                E-mail <span className={css.requiredSymbol}>*</span>
              </p>
            </div>
            <input className={css.formInput} placeholder="email@gmail.com" />
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
              />
              {showPassword ? (
                <Image
                  className={css.passwordIcon}
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                  src={EyeIcon}
                />
              ) : (
                <Image
                  className={css.passwordIcon}
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                  src={EyeIcon}
                />
              )}
            </span>
          </label>

          <button className={css.loginBtn}>Login</button>
        </form>
        <Link href="/admin/reset" className={css.forgotPasswordText}>
          Forgot password?
        </Link>
      </section>
    </>
  );
}
