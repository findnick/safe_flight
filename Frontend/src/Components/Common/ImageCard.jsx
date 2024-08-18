export default function ImageCard({ img, heading, text }) {
  return (
    <div
      className="card flex flex-col flex-grow px-2 md:px-4 lg:px-8 py-4 justify-end sm:w-4/12 md:w-2/12"
      style={{
        background: `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6) ), url(${img})`,
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
        height: 200,
      }}
    >
      <h6
        className="text-center font-semibold text-2xl"
        style={{ color: "white" }}
      >
        {heading}
      </h6>
      <p
        className="text-center font-normal text-base"
        style={{ color: "#d7d6d6" }}
      >
        {text}
      </p>
    </div>
  );
}
