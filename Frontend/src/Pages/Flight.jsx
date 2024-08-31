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

const Flight = () => {
  const cards = [
    {
      heading: "Start Your Journey",
      text: "Fly to your dream destination with ease and comfort.",
      img: card_1,
    },
    {
      heading: "Discover Serenity",
      text: "Explore the tranquil beauty of nature’s finest lakes.",
      img: card_2,
    },
    {
      heading: "Adventure Awaits",
      text: "Embark on a journey to the world's most breathtaking peaks.",
      img: card_3,
    },
    {
      heading: "Road to Freedom",
      text: "Hit the open road and discover the wonders of the wild west.",
      img: card_4,
    },
  ];
  const questions = [
    {
      question: "How do I book a flight?",
      answer:
        "To book a flight, simply enter your departure and destination cities, select your travel dates, and choose from the available flights. Follow the prompts to complete your booking and payment.",
    },
    {
      question: "Can I cancel or change my booking?",
      answer:
        "Yes, you can cancel or change your booking. Please visit the Manage Booking section of our website, enter your booking details, and follow the instructions. Note that cancellation and change fees may apply depending on the airline's policy.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit and debit cards, including Visa, MasterCard, and American Express. You can also use PayPal for secure and convenient payment.",
    },
    {
      question: "How do I know if my booking is confirmed?",
      answer:
        "Once your booking is complete, you will receive a confirmation email with your booking reference number. You can also check the status of your booking in the Manage Booking section of our website.",
    },
  ];

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
      <CardSection cards={cards} />
      <TopFlights main={main} />
      <General
        img={card_4}
        btnText="Book Now"
        heading="Explore the Unseen"
        // para="Lorem ipsum dolor sit amet consectetur. Nisl ultrices et eleifend proin quisque feugiat."
        para={!contentLoading && content}
      />
      <Questions questions={questions} />
      {/* <Footer /> */}
    </>
  );
};

export default Flight;
