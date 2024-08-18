const Button3 = ({
  children,
  style = {},
  disabled = false,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      className="text-white button-3 px-2 py-3 rounded-md font-semibold text-sm w-full"
      style={{ background: "var(--primary-500)", ...style }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button3;
