import React from "react";

const ImagePreloader = ({ imageUrls }) => {
  return (
    <>
      {imageUrls.map((imageUrl, index) => (
        <link key={index} rel="preload" href={imageUrl} as="image" />
      ))}
    </>
  );
};

export default ImagePreloader;
