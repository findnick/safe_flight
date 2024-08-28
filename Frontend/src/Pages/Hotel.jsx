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
      question: "How do I book a hotel room?",
      answer:
        "To book a hotel room, enter your destination, select your travel dates, and choose from the available hotels. Follow the prompts to complete your booking and payment.",
    },
    {
      question: "Can I cancel or modify my hotel reservation?",
      answer:
        "Yes, you can cancel or modify your reservation. Please check the cancellation policy of the hotel before booking. To make changes, go to the Manage Booking section of our website.",
    },
    {
      question: "What payment methods are accepted for hotel bookings?",
      answer:
        "We accept all major credit and debit cards, including Visa, MasterCard, and American Express. Some hotels may also accept PayPal or other forms of payment.",
    },
    {
      question: "Will I receive a booking confirmation?",
      answer:
        "Yes, after completing your booking, you will receive a confirmation email with your reservation details. You can also view your booking in the Manage Booking section of our website.",
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
        btnText="Book Now"
        heading="Explore the Unseen"
        para={!contentLoading && content}
      />
      <Questions questions={questions} />
      {/* <Footer /> */}
    </>
  );
};

export default Hotel;
