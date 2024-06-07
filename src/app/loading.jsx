"use client";

import { InfinitySpin } from "react-loader-spinner";
import css from "../app/globals.css";

export default function Loading() {
  return (
    <>
      <div>
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
