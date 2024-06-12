"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import css from "./ResetPassword.module.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();
    setMessage(data.message);
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
        {message && <p>{message}</p>}

        <form className={css.loginForm}>
          <label className={css.emailLabel}>
            <div>
              <p>
                New password <span className={css.requiredSymbol}>*</span>
              </p>
            </div>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              required
              value={newPassword}
              className={css.formInput}
              placeholder="Enter new password"
            />
          </label>

          <button className={css.loginBtn}>Reset password</button>
        </form>
      </section>
    </>
  );
}
