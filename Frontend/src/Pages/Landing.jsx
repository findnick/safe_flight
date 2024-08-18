import headerImage from "../assets/img/header-images/landing-header-image.jpg";
import Curve from "../assets/svg/landingCurve.svg";
import Button1 from "../Components/Common/Button1";
import Card from "../Components/UnCommon/Card";
import IndexSection from "../Components/UnCommon/IndexSection";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Carousel from "../Components/Common/Carousel";
import card1 from "../assets/img/index-cards/card-img-1.png";
import card2 from "../assets/img/index-cards/card-img-2.png";
import card3 from "../assets/img/index-cards/card-img-3.png";
import sec2_1 from "../assets/img/index-sections/section-2-img-1.jpg";
import sec2_2 from "../assets/img/index-sections/section-2-img-2.jpg";
import sec2_3 from "../assets/img/index-sections/section-2-img-3.jpg";
import sec3 from "../assets/img/index-sections/section-3-img.jpg";
import sec4_1 from "../assets/img/index-sections/section-4-img-1.jpg";
import sec4_2 from "../assets/img/index-sections/section-4-img-2.jpg";
import sec5_1 from "../assets/img/index-sections/section-5-img-1.png";
import sec5_2 from "../assets/img/index-sections/section-5-img-2.png";
import sec5_3 from "../assets/img/index-sections/section-5-img-3.png";
import sec5_4 from "../assets/img/index-sections/section-5-img-4.png";
import sec6_1 from "../assets/img/index-sections/section-6-img-1.png";
import sec6_2 from "../assets/img/index-sections/section-6-img-2.png";
import sec6_3 from "../assets/img/index-sections/section-6-img-3.png";
import sec7 from "../assets/img/index-sections/section-7-img.jpg";
import sec8 from "../assets/img/index-sections/section-8-img.png";
import Footer from "../Components/Common/Footer";
import Navbar from "../Components/Common/Navbar";

import { Button } from "@mui/material";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Landing = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const section_6 = [
    {
      img: sec6_1,
    },
    {
      img: sec6_2,
    },
    {
      img: sec6_3,
    },
  ];
  return (
    <>
      {/* <Navbar /> */}
      <div className="header mx-auto">
        <div className="flex flex-col" style={{ background: "var(--white)" }}>
          {/* Header */}
          <div
            className="bg-no-repeat"
            style={{
              color: "var(--white)",
              background: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${headerImage})`,
              backgroundPosition: "center",
              backgroundSize: "100% 100%",
            }}
          >
            <h1
              className="text-center pt-32 p-2 mx-auto w-4/5 sm:text-7xl font-bold"
              style={{ lineHeight: "normal" }}
            >
              Never Stop Exploring The World
            </h1>
            <p
              className="text-center my-4 mx-auto w-3/5"
              style={{ fontSize: "1.5rem", color: "#ffffff" }}
            >
              Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
              consectetur.{" "}
            </p>
            <div className="flex flex-col sm:flex-row mx-auto items-center justify-center gap-3 sm:gap-0">
              {/* <Button
                variant="contained"
                classes="mx-2" bg="var(--primary-500)"
              >
                Get Started
              </Button> */}
              <Button1 classes="mx-2" bg="var(--primary-500)">
                Get Started
              </Button1>
              <Button1 classes="mx-2" border="1px solid #ffffff">
                Watch Video
              </Button1>
            </div>
            <img src={Curve} alt="  " />
          </div>

          {/* Index Section 1 */}
          <IndexSection
            sectionClass="flex-col"
            headingClass={"text-center"}
            miniHeading="PROIN BLANDIT"
            mainHeading="Lorem ipsum dolor sit amet consectetur."
          >
            <div className="flex flex-row flex-wrap flex-shrink justify-center">
              <Card
                bg="var(--primary-100)"
                img={card1}
                heading="Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet consectetur. Felis aliquam amet augue gravida adipiscing cursus phasellus."
              />
              <Card
                bg="var(--light-orange)"
                img={card2}
                heading="Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet consectetur. Felis aliquam amet augue gravida adipiscing cursus phasellus."
              />
              <Card
                bg="var(--light-purple)"
                img={card3}
                heading="Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet consectetur. Felis aliquam amet augue gravida adipiscing cursus phasellus."
              />
            </div>
          </IndexSection>

          {/* Index Section 2 */}
          <IndexSection
            sectionClass="flex-col md:flex-row items-center gap-8"
            headingClass={"text-left md:w-1/2"}
            miniHeading="PROIN BLANDIT"
            mainHeading="Lorem ipsum dolor sit amet consectetur."
            button={true}
            para="Lorem ipsum dolor sit amet consectetur. Scelerisque tellus elementum lorem neque volutpat amet. Justo et id urna ornare dignissim dictumst. Lectus eu morbi vitae dolor scelerisque mattis. Facilisis arcu aenean maecenas lectus lectus.Lorem ipsum dolor sit amet consectetur. Arcu integer vivamus enim phasellus duis sit. At pellentesque ultrices aenean gravida lorem. Non id id turpis habitant nunc ac phasellus et risus."
            // paraShadow={true}
            paraStyle={{ textShadow: "2px 2px 4px" }}
            containerClass="flex-shrink md:w-1/2"
          >
            <div className="grid grid-col-3 md:grid-rows-2 grid-flow-col gap-4 items-center">
              <div
                className="col-span-1 md:row-span-1 md:self-end w-full"
                style={{
                  height: 284,
                  overflow: "hidden",
                  borderRadius: 14,
                }}
              >
                <img
                  src={sec2_1}
                  alt=""
                  style={{
                    width: "25rem",
                    height: "100%",
                    maxWidth: "none",
                    marginLeft: "-61px",
                  }}
                />
              </div>
              <div
                className="col-span-1 md:row-span-1 md:self-start w-full"
                style={{
                  // height: 284,
                  overflow: "hidden",
                  borderRadius: 14,
                }}
              >
                <img
                  src={sec2_2}
                  alt=""
                // style={{ marginTop: "-75px", borderRadius: 14 }}
                />
              </div>
              <div
                className="col-span-1 md:row-span-2 w-full"
                style={{
                  borderRadius: 14,
                }}
              >
                <img
                  src={sec2_3}
                  alt=""
                  style={{
                    borderRadius: 14,
                  }}
                />
              </div>
            </div>
          </IndexSection>

          {/* Index Section 3 */}
          <IndexSection
            sectionClass="flex-col-reverse md:flex-row-reverse items-center gap-8 py-20"
            style={{ background: "var(--bg-light)" }}
            headingClass={"text-left md:w-1/2 py-10"}
            miniHeading="PROIN BLANDIT"
            mainHeading="Lorem ipsum dolor sit amet consectetur."
            para="Lorem ipsum dolor sit amet consectetur. Ut orci diam dignissim amet quam odio sed ac. Facilisis velit enim egestas tortor a et nam. Maecenas diam adipiscing lectus feugiat ullamcorper pellentesque lorem cursus. Faucibus bibendum pretium vestibulum in varius. Augue etiam nunc posuere porttitor et. Lectus neque elementum ut ridiculus erat neque hac tincidunt sollicitudin."
            paraElements={() => (
              <div className="flex flex-row flex-wrap sm:flex-nowrap gap-5 sm:gap-12">
                <div className="flex flex-col">
                  <h2>200+</h2>
                  <p>Lectus Lectus</p>
                </div>
                <div className="flex flex-col">
                  <h2>1000+</h2>
                  <p>Lectus Lectus</p>
                </div>
                <div className="flex flex-col">
                  <h2>50+</h2>
                  <p>Lectus Lectus</p>
                </div>
              </div>
            )}
            containerClass="flex-shrink md:w-1/2"
          >
            <div
              className="m-auto"
              style={{
                maxWidth: "29rem",
                borderRadius: "64px 21px 64px 21px",
                boxShadow: "-63px 46px 2px #2664b7",
              }}
            >
              <img
                src={sec3}
                alt=""
                className="w-full"
                style={{ borderRadius: 21, borderBottomLeftRadius: 6 }}
              />
            </div>

            {/* <img
              src={abs1}
              alt=""
              style={{
                width: "4rem",
                position: "absolute",
                right: 0,
                marginTop: -14,
              }}
            /> */}
          </IndexSection>

          {/* Index Section 4 */}
          <IndexSection
            sectionClass="flex-col sm:flex-row gap-8 pb-10"
            headingClass={"text-left sm:w-1/2"}
            miniHeading="PROIN BLANDIT"
            mainHeading="Lorem ipsum dolor sit amet consectetur."
            button={true}
            buttonStyle={{
              background: "transparent",
              color: "var(--primary-500)",
              fontWeight: "500",
              border: "1px solid var(--blue)",
            }}
            para="Lorem ipsum dolor sit amet consectetur. Scelerisque tellus elementum lorem neque volutpat amet. Justo et id urna ornare dignissim dictumst. Lectus eu morbi vitae dolor scelerisque mattis. Facilisis arcu aenean maecenas lectus lectus.Lorem ipsum dolor sit amet consectetur. Arcu integer vivamus enim phasellus duis sit. At pellentesque ultrices aenean gravida lorem. Non id id turpis habitant nunc ac phasellus et risus."
            containerClass="flex flex-row flex-shrink sm:flex-wrap self-start items-center justify-center mx-auto gap-6 sm:w-1/2 mt-0"
            containerStyle={{ height: "30rem" }}
          >
            <div
              className="h-2/3 sm:w-48 p-2"
              style={{ boxShadow: "0px 0px 4px 4px #d5d5d5", borderRadius: 9 }}
            >
              <img
                src={sec4_1}
                alt=""
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 9,
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              className="self-start p-2 h-2/3 sm:w-48"
              style={{ boxShadow: "0px 0px 4px 4px #d5d5d5", borderRadius: 9 }}
            >
              <img
                src={sec4_2}
                alt=""
                style={{ height: "100%", width: "100%", borderRadius: 9 }}
              />
            </div>

            {/* <img
              src={abs2}
              alt=""
              style={{
                width: "4rem",
                position: "absolute",
                left: 0,
              }}
            /> */}
          </IndexSection>

          {/* Index Section 5 */}
          <IndexSection
            sectionClass="flex-col-reverse md:flex-row-reverse items-center gap-8 py-20"
            style={{ background: "var(--bg-light)" }}
            headingClass={"text-left md:w-1/2 py-10"}
            miniHeading="PROIN BLANDIT"
            mainHeading="Lorem ipsum dolor sit amet consectetur."
            button={true}
            buttonText="Get Started"
            para="Lorem ipsum dolor sit amet consectetur. Ut orci diam dignissim amet quam odio sed ac. Facilisis velit enim egestas tortor a et nam. Maecenas diam adipiscing lectus feugiat ullamcorper pellentesque lorem cursus. Faucibus bibendum pretium vestibulum in varius. Augue etiam nunc posuere porttitor et. Lectus neque elementum ut ridiculus erat neque hac tincidunt sollicitudin."
            paraElements={() => (
              <div className="mt-4 flex flex-row gap-12">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row items-center gap-1">
                    <img className="section-5-img" src={sec5_1} alt="" />
                    <p>Rcu integer vivamus Enim</p>
                  </div>

                  <div className="flex flex-row items-center gap-1">
                    <img className="section-5-img" src={sec5_3} alt="" />
                    <p>Rcu integer vivamus Enim</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row items-center gap-1">
                    <img className="section-5-img" src={sec5_2} alt="" />
                    <p>Rcu integer vivamus Enim</p>
                  </div>

                  <div className="flex flex-row items-center gap-1">
                    <img className="section-5-img" src={sec5_4} alt="" />
                    <p>Rcu integer vivamus Enim</p>
                  </div>
                </div>
              </div>
            )}
            containerClass="flex-shrink md:w-1/2"
          >
            <div
              className="m-auto"
              style={{
                maxWidth: "29rem",
              }}
            >
              <img
                src={sec3}
                alt=""
                className="w-full"
                style={{ borderRadius: 21, borderBottomLeftRadius: 6 }}
              />
            </div>
          </IndexSection>

          {/* Index Section 6 */}
          <IndexSection
            sectionClass="flex-col"
            headingClass={"text-center"}
            miniHeading="Testimonials"
            mainHeading="Lorem ipsum dolor sit amet consectetur."
            containerClass="w-11/12 m-auto"
          >
            <Carousel data={section_6} />
          </IndexSection>

          {/* Index Section 7 */}
          <IndexSection
            sectionClass="bg-no-repeat flex-col-reverse md:flex-row-reverse items-center gap-8 p-0"
            style={{
              background: `url(${sec7})`,
              backgroundPosition: "center",
              backgroundSize: "100% 100%",
              paddingLeft: 0,
              paddingRight: 0,
            }}
            headingClass={"section-7 text-left md:w-1/2 pt-10"}
            headingStyle={{ background: "var(--primary-100)" }}
            miniHeading="PROIN BLANDIT"
            mainHeading="Lorem ipsum dolor sit amet consectetur."
            button={true}
            buttonText="Get Started"
            buttonDivClass="w-full py-10 bg-white flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0"
            buttonPara="Ornare dui nec massa ultrices luctus."
            paraClass="px-10 pb-5"
            para="Lorem ipsum dolor sit amet consectetur. Ut orci diam dignissim amet quam odio sed ac. Facilisis velit enim egestas tortor a et nam. Maecenas diam adipiscing lectus feugiat ullamcorper pellentesque lorem cursus. Faucibus bibendum pretium vestibulum in varius. Augue etiam nunc posuere porttitor et. Lectus neque elementum ut ridiculus erat neque hac tincidunt sollicitudin."
            paraElements={() => (
              <div
                className="bg-white px-10 md:-ml-7 py-5 list flex flex-col flex-wrap items-start list-none w-fit"
                style={{ color: "var(--stroke-tb)" }}
              >
                <div className="list-item">
                  <span style={{ color: "var(--primary-500)" }}>
                    <CheckCircleIcon />
                  </span>{" "}
                  Lorem ipsum dolor sit amet consectetur.
                </div>
                <div className="list-item">
                  <span style={{ color: "var(--primary-500)" }}>
                    <CheckCircleIcon />
                  </span>{" "}
                  At pellentesque ultrices aenean gravida lorem.
                </div>
                <div className="list-item">
                  <span style={{ color: "var(--primary-500)" }}>
                    <CheckCircleIcon />
                  </span>{" "}
                  Orci varius natoque penatibus et magnis dis parturient montes.
                </div>
                <div className="list-item">
                  <span style={{ color: "var(--primary-500)" }}>
                    <CheckCircleIcon />
                  </span>{" "}
                  Maecenas lacus metus, vestibulum in metus non.
                </div>
                <div className="list-item">
                  <span style={{ color: "var(--primary-500)" }}>
                    <CheckCircleIcon />
                  </span>{" "}
                  Pellentesque sapien erat.
                </div>
                <div className="list-item">
                  <span style={{ color: "var(--primary-500)" }}>
                    <CheckCircleIcon />
                  </span>{" "}
                  Sed nisi erat, consequat et ex a, tincidunt ultricies tortor.
                </div>
              </div>
            )}
            containerClass="flex-shrink md:w-1/2 bg-white"
          ></IndexSection>

          {/* Index Section 8 */}
          <IndexSection
            sectionClass="flex-col section-8 my-10 pt-10"
            headingClass={"text-center"}
            miniHeading="PROIN BLANDIT"
            mainHeading="Pellentesque elementum, quam a tristique"
            para="Lorem ipsum dolor sit amet consectetur. Laoreet  faucibus malesuada proin blandit egestas."
            containerClass="mt-0"
          >
            <div className="flex flex-row flex-wrap flex-shrink justify-center">
              <Card
                bg="var(--primary-500)"
                br={37}
                img={sec8}
                heading="Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet consectetur. Felis aliquam amet augue gravida adipiscing cursus phasellus."
              />
              <Card
                bg="var(--primary-500)"
                br={37}
                img={sec8}
                heading="Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet consectetur. Felis aliquam amet augue gravida adipiscing cursus phasellus."
              />
              <Card
                bg="var(--primary-500)"
                br={37}
                img={sec8}
                heading="Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet consectetur. Felis aliquam amet augue gravida adipiscing cursus phasellus."
              />
            </div>
          </IndexSection>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Landing;
