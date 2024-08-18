const Button2 = ({
  border = "",
  bg = "",
  classes = "",
  children,
  style = {},
  width = "7rem",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={classes + " px-4 py-2 text-white"}
      style={{
        background: bg,
        border: border,
        borderRadius: 11,
        width: width,
        ...style,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button2;
