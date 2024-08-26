import CardSection from "../Components/Common/CardSection";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import General from "../Components/Common/General";
import Header from "../Components/Common/Header";
import Questions from "../Components/Common/Questions";
import header_img from "../assets/img/header-images/header-img-3.jpg";
import card_1 from "../assets/img/other-cards/flight-card-1.jpg";
import card_2 from "../assets/img/other-cards/flight-card-2.jpg";
import card_3 from "../assets/img/other-cards/flight-card-3.jpg";
import card_4 from "../assets/img/other-cards/flight-card-4.jpg";
import main_1 from "../assets/img/car-rental/car-main-1.jpg";
import main_2 from "../assets/img/car-rental/car-main-2.jpg";
import main_3 from "../assets/img/car-rental/car-main-3.jpg";
// import DynamicForm from "./../Components/Common/DynamicForm";
import { CarRentalForm, SearchForm } from "../Components/Common/SearchForm";
import TopCarRentals from "../Components/UnCommon/TopCarRentals";
import { APIS, useAPI } from "../api/config";
import { useEffect, useState } from "react";

const CarRental = () => {
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
      area: "Toronto",
      country: "Canada",
      cost: "80",
    },
    {
      img: main_2,
      area: "New York",
      country: "United States",
      cost: "110",
    },
    {
      img: main_3,
      area: "Vancouver",
      country: "Canada",
      cost: "70",
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
        headingStart="The best car deals"
        headingEnd="from anywhere, to everywhere"
        para="Lorem ipsum dolor sit amet consectetur. Nisl ultrices et eleifend proin quisque feugiat."
        img={header_img}
      >
        <SearchForm carRental="block" />
        {/* <CarRentalForm /> */}
      </Header>
      <CardSection cards={cards} />
      <TopCarRentals main={main} />
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

export default CarRental;
