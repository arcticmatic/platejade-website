"use client";

import css from "./ResetSuccess.module.css";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ResetSuccess() {
  return (
    <>
      <section className={css.successSection}>
        <div className={css.successThumb}>
          <p className={css.successText}>Success!</p>
          <p className={css.successDescription}>
            <span className={poppins.className}>
              Your password has been updated. Please, log in to your account to
              continue.
            </span>
          </p>
          <Link href="/admin">
            <button className={css.loginBtn} type="submit">
              Login
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
