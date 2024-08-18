import Button2 from "./Button2";
import SubHeading from "./SubHeading";
import { Button } from "@mui/material";

export default function General({ heading, para, btnText, img }) {
  return (
    <div
      className="flex flex-col-reverse md:flex-row justify-between my-20 mx-6 sm:mx-14"
      style={{ background: "#fef7f4" }}
    >
      <div
        className="flex flex-col justify-center gap-5 text-center md:text-left px-4 sm:px-16 md:pr-20 md:w-1/2 py-20 md:py-0"
        style={{ color: "#05073c" }}
      >
        <div className="lg:pr-48">
          <SubHeading>{heading}</SubHeading>
        </div>
        <p className="text-base fxont-normal" style={{ color: "#05073c" }}>
          {para}
        </p>
        {/* <Button2
          style={{ background: "var(--primary-500)" }}
          classes="mx-auto md:mx-0"
        >
          {btnText}
        </Button2> */}
        <Button
          variant="contained"
          className="mx-auto md:mx-0"
          style={{ background: "var(--primary-500)", width: "7rem" }}
        >
          {btnText}
        </Button>
      </div>
      <div className="md:w-1/2">
        <img src={img} alt="" />
      </div>
    </div>
  );
}
