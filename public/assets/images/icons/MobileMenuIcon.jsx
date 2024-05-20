export const MobileMenuIcon = ({
  width,
  height,
  fill,
  className = "",
  onClick,
}) => {
  const initialParamsProps = {
    width: width ?? "21",
    height: height ?? "22",
    fill: fill ?? "#F4D553",
  };

  return (
    <svg
      onClick={onClick}
      className={className}
      width="48"
      height="49"
      viewBox="0 0 48 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42 12.5742H6"
        stroke="#10101C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 24.5742H18"
        stroke="#10101C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 36.5742H14"
        stroke="#10101C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
