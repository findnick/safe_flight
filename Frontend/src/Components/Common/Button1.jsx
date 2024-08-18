const Button1 = ({
  border = "",
  bg = "",
  classes = "",
  children,
  style = {},
}) => {
  return (
    <button
      className={classes + " px-4 py-2 text-white"}
      style={{
        background: bg,
        border: border,
        borderRadius: 20,
        minWidth: "8rem",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button1;
