const Card = ({ bg, img, heading, text, br = 8 }) => {
  return (
    <div className="card flex flex-col flex-grow p-8 m-4 justify-evenly md:card-30">
      <div
        className="mx-auto w-16 p-2 m-4"
        style={{ background: bg, borderRadius: br }}
      >
        <img src={img} alt="" className="m-auto" />
      </div>
      <div
        className="mx-auto text-center font-semibold capitalize"
        style={{ fontSize: 20, color: "var(--neutral)" }}
      >
        {heading}
      </div>
      <div
        className="mx-auto text-center font-normal"
        style={{ fontSize: 16, color: "var(--stroke-tb)" }}
      >
        {text}
      </div>
    </div>
  );
};

export default Card;
