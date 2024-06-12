"use client";

import { useState, useEffect } from "react";
import css from "./ResetPassword.module.css";
import { Poppins } from "next/font/google";
import EyeIcon from "../../images/EyeIcon.svg";
import ClosedEye from "../../images/ClosedEye.svg";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ResetPassword() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    setToken(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setPasswordMessage("");

    if (newPassword !== confirmPassword) {
      setPasswordMessage("Passwords do not match");
      console.log(passwordMessage);
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();
    if (data.success) {
      window.location.href = "/admin/reset-success";
    }
    setMessage(data);
  };

  return (
    <>
      <section className={css.loginSection}>
        <h2 className={css.loginTitle}>Forgot your password? </h2>

        <p className={css.loginDetails}>
          <span className={poppins.className}>Please enter a new password</span>
        </p>

        <form onSubmit={handleSubmit} className={css.loginForm}>
          <label className={css.emailLabel}>
            <div>
              <p>
                New password <span className={css.requiredSymbol}>*</span>
              </p>
            </div>
            <span className={css.inputIcon}>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                required
                type={newPasswordVisible ? "text" : "password"}
                value={newPassword}
                className={css.formInput}
                placeholder="Enter new password"
              />
              <Image
                className={css.passwordIcon}
                onClick={() => setNewPasswordVisible((prev) => !prev)}
                src={newPasswordVisible ? ClosedEye : EyeIcon}
                alt="Toggle password visibility"
              />
            </span>
          </label>
          <label className={css.emailLabel}>
            <div>
              <p>
                Confirm password <span className={css.requiredSymbol}>*</span>
              </p>
            </div>
            <span className={css.inputIcon}>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                type={confirmPasswordVisible ? "text" : "password"}
                value={confirmPassword}
                className={css.formInput}
                placeholder="Confirm new password"
              />
              <Image
                className={css.passwordIcon}
                onClick={() => setConfirmPasswordVisible((prev) => !prev)}
                src={confirmPasswordVisible ? ClosedEye : EyeIcon}
                alt="Toggle password visibility"
              />
            </span>
          </label>
          <button className={css.loginBtn}>Reset password</button>
        </form>
        {passwordMessage && (
          <p className={css.resetResultError}>{passwordMessage}</p>
        )}

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
