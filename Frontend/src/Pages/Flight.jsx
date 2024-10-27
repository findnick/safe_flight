import CardSection from "../Components/Common/CardSection";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import General from "../Components/Common/General";
import Header from "../Components/Common/Header";
import Questions from "../Components/Common/Questions";
import header_img from "../assets/img/header-images/header-img-1.jpg";
import card_1 from "../assets/img/other-cards/flight-card-1.jpg";
import card_2 from "../assets/img/other-cards/flight-card-2.jpg";
import card_3 from "../assets/img/other-cards/flight-card-3.jpg";
import card_4 from "../assets/img/other-cards/flight-card-4.jpg";
// import DynamicForm from "./../Components/Common/DynamicForm";
import { FlightForm, SearchForm } from "../Components/Common/SearchForm";
import demoAirline from "../assets/img/flight/demo-airline-icon.png";
import TopFlights from "../Components/UnCommon/TopFlights";
import { APIS, useAPI } from "../api/config";
import { useEffect, useState } from "react";
import { FAQ } from "./Footer_Links";
import Campaign from "../Components/Common/Campaign";

const Flight = () => {
  const main = [
    {
      img: "https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=1518&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      area: "Vancouver",
      country: "Canada",
      cabin: "Business",
      bags: 2,
      suggestion: [
        {
          departure: "Wed, Apr 24",
          from: "YEG",
          to: "YVR",
          airline: "West Jet",
          icon: demoAirline,
          stops: 0,
        },
        {
          departure: "Sat, Apr 27",
          from: "YXX",
          to: "YEG",
          airline: "West Jet",
          icon: demoAirline,
          stops: 1,
        },
      ],
      cost: "540",
    },
    {
      img: "https://images.unsplash.com/photo-1626474686930-f1e496b62f5b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      area: "Sal Salvador",
      country: "El Salvador",
      cabin: "Business",
      bags: 2,
      suggestion: [
        {
          departure: "Wed, Apr 24",
          from: "YEG",
          to: "YVR",
          airline: "West Jet",
          icon: demoAirline,
          stops: 0,
        },
        {
          departure: "Sat, Apr 27",
          from: "YXX",
          to: "YEG",
          airline: "West Jet",
          icon: demoAirline,
          stops: 1,
        },
      ],
      cost: "470",
    },
    {
      img: "https://images.unsplash.com/photo-1465353471565-b77e538f34c9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      area: "Reykjavik",
      country: "Iceland",
      cabin: "Business",
      bags: 2,
      suggestion: [
        {
          departure: "Wed, Apr 24",
          from: "YEG",
          to: "YVR",
          airline: "West Jet",
          icon: demoAirline,
          stops: 0,
        },
        {
          departure: "Sat, Apr 27",
          from: "YXX",
          to: "YEG",
          airline: "West Jet",
          icon: demoAirline,
          stops: 1,
        },
      ],
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
        headingStart="The best flight deals"
        headingEnd="from anywhere, to everywhere"
        para="Best Deals from 400+ Airlines Await - Book Your Flight Now!"
        img={header_img}
      >
        <SearchForm flight="block" />
        {/* <FlightForm /> */}
      </Header>
      {/* <CardSection cards={cards} /> */}
      <Campaign />
      <TopFlights main={main} />
      <General
        img={card_4}
        btnText="Book Now"
        heading="Explore the Unseen"
        // para="Lorem ipsum dolor sit amet consectetur. Nisl ultrices et eleifend proin quisque feugiat."
        para={!contentLoading && content}
      />
      <FAQ />
      {/* <Questions questions={questions} /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Flight;
