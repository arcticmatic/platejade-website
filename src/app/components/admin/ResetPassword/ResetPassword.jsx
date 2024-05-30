import css from "./ResetPassword.module.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ResetPassword() {
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
        <form className={css.loginForm}>
          <label className={css.emailLabel}>
            <div>
              <p>
                E-mail <span className={css.requiredSymbol}>*</span>
              </p>
            </div>
            <input className={css.formInput} placeholder="email@gmail.com" />
          </label>

          <button className={css.loginBtn}>Reset password</button>
        </form>
      </section>{" "}
    </>
  );
}
