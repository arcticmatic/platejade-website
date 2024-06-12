"use client";

import { useState } from "react";

import css from "./ForgotPassword.module.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data);
  };

  return (
    <>
      <section className={css.loginSection}>
        <h2 className={css.loginTitle}>Forgot your password? </h2>

        <p className={css.loginDetails}>
          <span className={poppins.className}>
            Don’t worry. We will reset your password and send you a link to
            create a new one
          </span>
        </p>

        <form onSubmit={handleSubmit} className={css.loginForm}>
          <label className={css.emailLabel}>
            <div>
              <p>
                E-mail <span className={css.requiredSymbol}>*</span>
              </p>
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={css.formInput}
              placeholder="email@gmail.com"
            />
          </label>

          <button type="submit" className={css.loginBtn}>
            Send reset link
          </button>
        </form>
        {message.message && (
          <p
            className={
              message.success ? css.resetResultSuccess : css.resetResultError
            }
          >
            {message.message}
          </p>
        )}
      </section>
    </>
  );
}
