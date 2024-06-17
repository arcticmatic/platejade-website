"use client";

import { InfinitySpin } from "react-loader-spinner";
import css from "../app/loading.css";

export default function Loading() {
  return (
    <>
      <div className={css.loaderContainer}>
        <InfinitySpin
          className={css.loaderContainer}
          visible={true}
          width="200"
          color="#000000"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    </>
  );
}
