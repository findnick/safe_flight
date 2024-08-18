import Button1 from "../Common/Button1";

const IndexSection = ({
  style = {},
  sectionClass = "",
  headingClass = "",
  headingStyle = {},
  miniHeading,
  mainHeading,
  para,
  paraElements = null,
  paraStyle = {},
  paraClass = "",
  button = false,
  buttonText = "Read More",
  buttonStyle = {},
  buttonDivClass = "",
  buttonPara = null,
  containerClass = "",
  containerStyle = {},
  children,
}) => {
  return (
    <div
      className={"section px-4 md:px-16 lg:px-24 mt-24 flex " + sectionClass}
      style={style}
    >
      <div className={"section-heading " + headingClass} style={headingStyle}>
        <div className="mini-heading uppercase font-medium">{miniHeading}</div>
        <div className="main-heading capitalize font-bold">{mainHeading}</div>
        {para ? (
          <div className="main-para capitalize font-normal mt-2 mb-6">
            <p className={paraClass} style={paraStyle}>
              {para}
            </p>
            {paraElements ? paraElements() : null}
          </div>
        ) : null}
        {button ? (
          <div className={buttonDivClass}>
            {buttonPara ? (
              <p className="font-medium text-lg text-black">{buttonPara}</p>
            ) : null}
            <Button1 bg="var(--primary-500)" style={buttonStyle}>
              {buttonText}
            </Button1>
          </div>
        ) : null}
      </div>
      <div
        className={"section-container my-6 " + containerClass}
        style={containerStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default IndexSection;
