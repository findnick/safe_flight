import CardSection from "../Components/Common/CardSection";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import General from "../Components/Common/General";
import Header from "../Components/Common/Header";
import Questions from "../Components/Common/Questions";
import header_img from "../assets/img/header-images/header-img-2.jpg";
import card_1 from "../assets/img/other-cards/flight-card-1.jpg";
import card_2 from "../assets/img/other-cards/flight-card-2.jpg";
import card_3 from "../assets/img/other-cards/flight-card-3.jpg";
import card_4 from "../assets/img/other-cards/flight-card-4.jpg";
// import DynamicForm from "./../Components/Common/DynamicForm";
import { HotelForm, SearchForm } from "../Components/Common/SearchForm";
import main_1 from "../assets/img/hotel/hotel-img-1.jpg";
import main_2 from "../assets/img/hotel/hotel-img-2.jpg";
import main_3 from "../assets/img/header-images/header-img-2.jpg";
import TopHotels from "../Components/UnCommon/TopHotels";
import { APIS, useAPI } from "../api/config";
import { useEffect, useState } from "react";

const Hotel = () => {
  const cards = [
    {
      heading: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet consectetur.",
      img: card_1,
    },
    {
      heading: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet consectetur.",
      img: card_2,
    },
    {
      heading: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet consectetur.",
      img: card_3,
    },
    {
      heading: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet consectetur.",
      img: card_4,
    },
  ];
  const questions = [
    {
      question: "Lorem ipsum dolor sit amet consectetur?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. In arcu gravida ut libero donec maecenas. Viverra volutpat nulla nisi tortor tortor elementum. Magna in semper egestas et ut nunc a posuere. Vulputate vitae placerat dui porttitor interdum condimentum morbi id magna in semper egestas et ut libero donec maecenas.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. In arcu gravida ut libero donec maecenas. Viverra volutpat nulla nisi tortor tortor elementum. Magna in semper egestas et ut nunc a posuere. Vulputate vitae placerat dui porttitor interdum condimentum morbi id magna in semper egestas et ut libero donec maecenas.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. In arcu gravida ut libero donec maecenas. Viverra volutpat nulla nisi tortor tortor elementum. Magna in semper egestas et ut nunc a posuere. Vulputate vitae placerat dui porttitor interdum condimentum morbi id magna in semper egestas et ut libero donec maecenas.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. In arcu gravida ut libero donec maecenas. Viverra volutpat nulla nisi tortor tortor elementum. Magna in semper egestas et ut nunc a posuere. Vulputate vitae placerat dui porttitor interdum condimentum morbi id magna in semper egestas et ut libero donec maecenas.",
    },
  ];

  const main = [
    {
      img: main_1,
      name: "Paradox Hotel Vancouver",
      area: "Toronto",
      distance: "2.92 km",
      rating: 4.7,
      totalReviews: 650,
      cost: "540",
    },
    {
      img: main_2,
      name: "William Gray by Gray Collection",
      area: "Montreal",
      distance: "0.16 km",
      rating: 4.8,
      totalReviews: 1280,
      cost: "470",
    },
    {
      img: main_3,
      name: "Great Wolf Lodge Waterpark Resort",
      area: "Calgary",
      distance: "3.63 km",
      rating: 4.2,
      totalReviews: 1020,
      cost: "890",
    },
  ];

  const [getContent, contentLoading] = useAPI(APIS.fetchContent);
  const [content, setContent] = useState("");

  useEffect(() => {
    getContent().then((res) => {
      if (res?.data) setContent(res.data[0].home);
    });
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <Header
        headingStart="The best hotel deals"
        headingEnd="from anywhere, to everywhere"
        para="Lorem ipsum dolor sit amet consectetur. Nisl ultrices et eleifend proin quisque feugiat."
        img={header_img}
      >
        <SearchForm hotel="block" />
        {/* <HotelForm /> */}
      </Header>
      <CardSection cards={cards} />
      <TopHotels main={main} />
      <General
        img={card_4}
        btnText="Book now"
        heading="Lorem ipsum dolor sit amet consectetur ac quis sed."
        para={!contentLoading && content}
      />
      <Questions questions={questions} />
      {/* <Footer /> */}
    </>
  );
};

export default Hotel;
