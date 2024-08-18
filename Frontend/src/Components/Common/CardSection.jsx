import ImageCard from "./ImageCard";

const CardSection = ({ cards }) => {
  return (
    <div className="flex flex-row mx-6 sm:mx-14 flex-wrap my-20 gap-4">
      {cards.map((card, i) => {
        return (
          <ImageCard
            key={i}
            heading={card.heading}
            text={card.text}
            img={card.img}
          />
        );
      })}
    </div>
  );
};

export default CardSection;
