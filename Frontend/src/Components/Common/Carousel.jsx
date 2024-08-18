import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({
  data,
  dots = true,
  infinite = true,
  slides = 1,
  children,
  minSlides = 1,
  maxSlides = 3,
}) => {
  var settings = {
    dots: dots,
    infinite: infinite,
    speed: 500,
    slidesToShow: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      ? minSlides
      : maxSlides,
    slidesToScroll: slides,
  };
  return (
    <Slider {...settings}>
      {children ? (
        <>{children}</>
      ) : (
        data.map((ele, i) => {
          return (
            <div key={i}>
              <img src={ele.img} alt="" />
            </div>
          );
        })
      )}
    </Slider>
  );
};

export default Carousel;
