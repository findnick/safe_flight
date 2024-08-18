import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

function Section({ heading, children }) {
  return (
    <div className="footer-page flex flex-col my-10 gap-5">
      <div className="mx-auto font-bold text-5xl capitalize">{heading}</div>
      <div className="mx-auto font-normal text-2xl px-10 sm:px-16 md:px-32 lg:px-64">
        {children}
      </div>
    </div>
  );
}

function ContactUs() {
  return (
    <Section heading="Contact Us">
      Got a question that needs answering? Worry not! Our customer support team
      is always ready to answer all your queries. All your booking related
      queries, other feedback, comments, requests for technical support and
      other communications relating to the Website should be directed to:{" "}
      <a
        href="mailto:support@flightsavior.com"
        style={{ color: "var(--primary-500)" }}
      >
        support@flightsavior.com
      </a>{" "}
      and one of our proficient customer support representatives will get back
      to you with a solution at the earliest. Do not provide any Credit/Debit
      Card details or bank information in your email.
    </Section>
  );
}

function FAQ() {
  const questions = [
    {
      question: "Help! I need to change/cancel my reservation!",
      answer: `KAYAK compares flight prices of various airline reservation sites and find the lowest price for you. Select the lowest price you want and we will link you to the site so that you can complete your reservation.
Since the actual reservation is connected to the airline or travel agent you have selected, KAYAK is not involved in the reservation and payment, and your reservation information cannot be verified.

Therefore, if you have any inquiries regarding reservation changes or cancellations, please contact the customer center of the airline or travel agency where the reservation was made. If you can't remember which reservation site you booked from, please check your payment details. If you look at the payment destination, you can check the reservation destination.`,
    },
    {
      question:
        "When I click a deal on your site it tells me the price has gone up! What's up with that?",
      answer: `Because we're searching hundreds of other travel sites at once, sometimes there are accuracy issues originating from the information we're receiving from those sites. Either the site isn't updating their inventory with us, has given the wrong path, or another traveler has booked the last available room.`,
    },
    {
      question: "What is KAYAK's refund policy?",
      answer: `Because KAYAK is a search engine, not a seller, we don't have a refund policy -- that's handled solely by the provider that booked your trip. Not sure what company to talk to? Check your credit card statement and/or go to Bookings to locate your provider's information.`,
    },
    {
      question: "What's a Hacker Fare?",
      answer: `Everyone likes saving money, right? We figured out that one of the best ways to get a great deal on certain flights was to book two one-ways instead of a round trip. So, that's what a Hacker Fare does: finds two compatible one-way flights to help you save. Just make sure to first confirm that each leg of your trip is available before booking.`,
    },
    {
      question: "Do prices include Taxes and Fees?",
      answer: `All flight prices on KAYAK include applicable taxes and fees. Any exceptions to this are any optional fees like checked baggage or airlines that charge for seat selection, pet accommodations, etc. These types of add-ons will have to be arranged separately with your airline. Want to know what sort of fees an airline might charge? We got you.

Train and bus prices on KAYAK include applicable taxes and fees. Some partners may charge an additional service fee, a fee for additional baggage, or a fee for certain payment methods.`,
    },
    {
      question: "Do flight prices include baggage fees?",
      answer: `Nope. You'll have to check out our Airline Fees page to see if your airline charges extra for checked bags or carry-ons (yes, that's a thing now).`,
    },
    {
      question: "How do I create a Price Alert?",
      answer: `On our site, you can create one by signing in and going directly to Price Alerts in your account or you can look for the "Track Prices" button on the top left-hand side of flight results. If you're searching hotels, select "Set Price Alert" at the top right of the hotel results list. If you're on our app, you can get to Price Alerts using the app's navigation menu and follow instructions there.`,
    },
    {
      question: "What is that graph next to my flight search results?",
      answer: `Congrats, you've spotted our Price Forecast tool. Using historical data, we're able to make predictions on whether or not the price for certain routes will go up or down within the next 7 days. Then, we suggest whether you should book a flight now or if you should wait and watch what happens to flight prices (setting up a daily Price Alert is helpful in doing so).`,
    },
    {
      question:
        "I don't see a Price Forecast graph in my search results -- your site is broken!",
      answer: `Not all flight routes will have sufficient data to show a Price Forecast. Looks like you picked a unique snowflake in the realm of price trends.`,
    },
    {
      question: "Can I search for a flight with my child?",
      answer: `When searching for flights on KAYAK, you can select the number of children and infant passengers via the traveler drop-down menu.`,
    },
    {
      question: "Can I book a flight for another person?",
      answer: `If you wish to pay for someone else's flight, you can certainly do so. However, you'll need to make sure when entering the passenger's details that the name you put on the ticket matches the traveller's ID exactly - a simple typo could prevent them from flying. Also, be aware that many airlines charge a substantial change fee to correct any mistakes should any information need to be edited after the ticket has been booked.`,
    },
    {
      question:
        "I'm looking to land-hop. Can I book a flight that goes to more than one city?",
      answer: `We've got you covered. When you're on the KAYAK Flights page, select "Multi-City" above the search bar before you perform your search. This will allow you to search for a flight with multiple legs.`,
    },
    {
      question: 'What are "flexible dates" and why should I care?',
      answer: `Sometimes travel dates aren't set in stone. If your preferred travel dates have some wiggle room, flexible dates will show you flights up to 3 days before/after your preferred dates. That way, you can see if leaving a day or two earlier will find you a better deal. You can also select the flexible "weekend" or "month" search options to widen your search range and find the cheapest price that works for you.`,
    },
    {
      question:
        "A bunch of us are going on a trip together -- how do I book a flight for a large group?",
      answer: `Currently KAYAK can search for a maximum of nine passengers at a time. That said, KAYAK can still help you locate the best itineraries for your group. We suggest you find the flight you wish to purchase by completing a search at www.ca.kayak.com and then contacting the airline directly to discuss group trips.`,
    },
    {
      question:
        'Why does it say "Major Airline" instead of a name I recognize?',
      answer: `Mysterious, isn't it? Sometimes, providers will give out special discounted rates on flights with one caveat: because the rates are so low, the airline wants to remain anonymous until you've completed your purchase.`,
    },
  ];

  return (
    <Section heading={"FAQs"}>
      {questions.map((q, i) => {
        return (
          <Accordion key={i}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq-page-content"
              id={`faq-page-header-${i}`}
            >
              <div className="font-medium text-lg">{q.question}</div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="text-lg">{q.answer}</div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Section>
  );
}

function Airlines() {
  const [airlines, setAirlines] = useState([]);
  useEffect(() => {
    fetch("/airlines.json")
      .then((response) => response.json())
      .then((res) => setAirlines(res.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => console.log(airlines), [airlines]);
  return (
    <div className="flex flex-col my-10 gap-5">
      <div className="mx-auto font-bold text-5xl capitalize">
        Airline Information
      </div>
      <div className="mx-auto flex flex-row flex-wrap gap-4 gap-y-12 font-light text-2xl px-5 justify-evenly">
        {airlines.map((airline, i) => {
          return (
            <>
              {airline.logo_symbol_url && (
                <div
                  key={i}
                  className="flex flex-col p-6 gap-4 shadow-md rounded-2xl items-center"
                  style={{ width: 250 }}
                >
                  <img
                    src={airline.logo_symbol_url}
                    style={{ width: 100, height: 100, objectFit: "contain" }}
                  />
                  <div className="text-center">{airline.name}</div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

function AboutUs() {
  return (
    <Section heading={"About Us"}>
      <div className="flex flex-col gap-12">
        <div>
          The company and culture of FlightSavior are a match for our product.
          Flight and hotel bookings are made to provide a delightful experience,
          not just cobbled together.
        </div>
        <div>
          <div className="font-medium">
            Our Mission: Helping Millions of People Travel Better.
          </div>
          <div>
            We have a strong belief in both bigger and better travel. Aligning
            the success of your own business with the success of your customers
            is the key to better travel. Win-Win!
          </div>
        </div>
        <div>
          <div className="font-medium">Our Story</div>
          <div>
            Dr. Moaz Bajwa, who holds a PhD in Sustainability Management from
            University of Waterloo, observed a significant transformation in the
            manner in which people travel and reserve hotels and flights in the
            last few years. Travellers did not want to be interrupted by ads,
            they desired useful information.
            <br />
            In 2024, Dr. Bajwa founded Flight Savior Travel Inc. to help
            travelers and vacationers use that shift to travel better with the
            best options. Along the way, FlightSavior has expanded beyond
            marketing into a crafted, not cobbled, suite of hotel and flight
            bookings that create the frictionless customer experience that
            travelers expect today. FlightSavior utilizes its booking platform
            powered by an AI-powered CRM to enhance the travel experiences of
            millions of vacationers.
          </div>
        </div>
      </div>
    </Section>
  );
}

function ToS() {
  return (
    <Section heading={"Terms of service"}>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum." "Sed ut perspiciatis unde omnis iste natus error sit
      voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
      ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
      dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
      ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
      numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
      quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
      ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
      consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate
      velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum
      fugiat quo voluptas nulla pariatur?"
    </Section>
  );
}
function Privacy() {
  const PrivacySection = ({ children, heading = "" }) => {
    return (
      <div className="privacy-section flex flex-col gap-5">
        <div className="font-bold text-3xl">{heading}</div>
        <div className="font-medium text-xl">{children}</div>
      </div>
    );
  };
  return (
    <div className="flex flex-col my-10 mx-12 gap-24">
      <div className="mx-auto font-bold text-5xl capitalize">
        Privacy Policy
      </div>
      <PrivacySection heading="Introduction">
        This website is operated by Flight Network Ltd which is part of the
        Etraveli Group. The companies within the Etraveli Group handle a variety
        of personal data, such as names, email addresses and other travel
        related information in their daily businesses. Therefore, we take data
        security and adherence to data protection legislation very seriously.
        This privacy policy explains how we collect, store, use and disclose any
        personal data we collect about you when you use this website, as well as
        how we protect the privacy and confidentiality of your personal
        information. Your privacy matters to us so whether you are new to our
        service or a long-time user, please do take the time to get to know our
        practices – and contact us if you have any questions.
        <br />
        <br />
        Etraveli Group AB, reg. no. 556584-4684 (“we”, “us” or “our”) is the
        so-called “data controller” of your personal data and is therefore
        responsible for the lawfulness of what we do with your personal data.
      </PrivacySection>
      <PrivacySection heading="The personal data we collect">
        Generally, the type of personal data we collect is the information that
        we need to enable you to make your travel arrangements and bookings.
        This includes information such as your first and last name, date of
        birth, telephone number and email address. The personal data we must
        receive to provide you with the travel arrangement you booked via our
        websites is the only data that is mandatory to provide. Depending on the
        kind of travel services you use, we may also collect your frequent flyer
        number, information about your dietary requirements and health issues
        (if any), and other details which are relevant to your travel
        arrangements or which are required by another travel service provider
        (such as airlines and hotels). This is not an exhaustive list. Should
        you call our support, we will collect the data you provide during the
        phone call. As you can see below, our cookies also collect some
        information.
        <br />
        <br />
        If you make a reservation for someone else through our website, we will
        request personal data about that individual. In those circumstances, we
        rely on you to advise those individuals about this privacy policy.
      </PrivacySection>
      <PrivacySection heading="The sensitive personal data we collect">
        In some cases, we may handle so-called “special categories of personal
        data” about you, which may be considered sensitive. This would be the
        case, for example, if you (i) have submitted a medical certificate for
        use of a cancellation protection or a refund from an airline (ii) have a
        medical or health condition affecting your trip and for which you
        request assistance or where certain clearance is needed, or (iii) have
        made a request revealing some other sensitive personal data about you.
        <br />
        <br />
        Before we handle sensitive personal data about you, we require your
        consent to do so. We therefore ask you to use the dedicated contact
        forms on our websites for submitting any sensitive data. The contact
        forms enable you to give us the consent required under applicable data
        protection legislation. Such consent may of course be withdrawn at any
        time. We will not handle any sensitive personal data that we are not
        permitted by you to handle, or that you have not provided us with. A
        limited amount of our personnel will have access to your sensitive
        personal data, and after handling your sensitive data in accordance with
        your request, we will erase the data as soon as possible.
      </PrivacySection>
      <PrivacySection heading="Sharing your personal data">
        We will only share your personal data where necessary for the purposes
        listed in this privacy policy. This may be to other companies within the
        Etraveli Group, government authorities and our trusted business
        partners. For example we may share your personal data (including
        sensitive personal data when applicable) with business partners such as
        airlines, hotel providers, insurance companies and Global Distribution
        Systems (so-called GDSs) to enable your travel arrangements and
        bookings.
        <br />
        <br />
        Each partner is responsible for its own handling of your personal data
        after it has received it from us, meaning that you must contact the
        partner in question for any requests related to your rights under
        applicable data protection legislation. We recommend that you read the
        partners’ respective privacy policies for information on their handling
        of your personal data.
        <br />
        <br />
        We will also share your personal data with other companies (so-called
        “data processors”) needed to deliver the services you requested, such as
        service providers running our call centers and our other suppliers and
        vendors that will handle your personal data when providing their
        services to us (for example external storage).
        <br />
        <br />
        Due to the global nature of the travel industry, your personal data may
        be processed in different locations around the world when the parties we
        share your personal data with reside in a country outside the EU/EEA.
        Our sharing of personal data outside the EU/EEA requires certain legal
        ground under applicable data protection legislation. Where a country is
        regarded by the European Commission to be a country with adequate level
        of protection for personal data, this will be our legal ground.
        Otherwise there are three main types of legal ground on which that we
        may base such sharing. These are:
      </PrivacySection>
      <PrivacySection heading="Third party providers">
        Please note that our website contains links to other websites and serves
        content from third-party providers. This privacy policy only applies to
        our website and our services. When you follow links to other websites,
        or use third-party services and products, you should read their privacy
        policies. Also, if you choose to contact us via social media, this
        privacy policy does not apply to any personal data submitted by you as
        part of such contact – in such case, we recommend that you read the
        privacy policy of such social media provider.
      </PrivacySection>
      <PrivacySection heading="Cookies">
        A cookie is a small text file that is stored on your computer, some only
        until you close down your browser (so-called “session cookies”) and some
        for an extended period of time (so-called “permanent cookies”). If you
        do not wish to allow storage of cookies on your computer, you can change
        the settings in your browser. Note however that in a few cases some of
        our website features may not function properly and some content may not
        be displayed correctly as a result.
        <br />
        <br />
        This website uses cookies for a number of reasons, including for
        provision of a personalized experience, for improving the usability of
        this website and for collecting usage statistics. We also use session
        cookies to improve the security of this website.
        <br />
        <br />
        In some cases when using cookies, we share data with third parties. For
        example, we use Google Analytics and Google AdWords, services which
        transmits website traffic data to Google servers. Google Analytics does
        not identify individual users and does not associate your IP address
        with any other data held by Google. We use reports provided by Google to
        help us understand website traffic and webpage usage and optimize
        advertisements bought from Googles own and other advertising network.
        Google may process the data in the manner described in Google's Privacy
        Policy and for the purposes set out above in this section. You can opt
        out of Google Analytics if you disable or refuse the cookie, disable
        JavaScript, or use the opt-out service provided by Google. To opt out of
        advertising features from Google use this link.
        <br />
        <br />
        Our website also uses Facebook pixel, which collects anonymized
        aggregated data that helps us with optimization of ad purchases on
        Facebooks different platforms (including Instagram). Facebook collects a
        user id that will allow them to match if a user has visited a site with
        the Facebook pixel. We as advertisers can however never identify the
        behavior of a specific user. Facebook and its related platforms are in a
        closed advertising ecosystem where their users can regulate if they
        consent to advertisers using data collected from their websites to
        purchase ads on Facebook. To view and change your advertising settings
        on Facebook use this link.
        <br />
        <br />
        Further, our website uses conversion tracking scripts and cookies from
        Microsoft Bing, TripAdvisor (you can view their privacy policies by
        following the links). All these services collect aggregated statistical
        data that helps us optimize purchases of advertisements. We as
        advertisers cannot identify a single user using this data. You can turn
        of the use of cookies in your browser settings.
      </PrivacySection>
    </div>
  );
}
function Security() {
  return (
    <Section heading={"Security policy"}>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum." "Sed ut perspiciatis unde omnis iste natus error sit
      voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
      ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
      dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
      ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
      numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
      quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
      ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
      consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate
      velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum
      fugiat quo voluptas nulla pariatur?"
    </Section>
  );
}
function Help() {
  return (
    <Section heading={"help center"}>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum." "Sed ut perspiciatis unde omnis iste natus error sit
      voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
      ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
      dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
      ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
      numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
      quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
      ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
      consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate
      velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum
      fugiat quo voluptas nulla pariatur?"
    </Section>
  );
}
function Safety() {
  return (
    <Section heading={"safety information"}>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum." "Sed ut perspiciatis unde omnis iste natus error sit
      voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
      ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
      dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
      ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
      numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
      quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
      ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
      consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate
      velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum
      fugiat quo voluptas nulla pariatur?"
    </Section>
  );
}
function Cancellation() {
  return (
    <Section heading={"Cancellation"}>
      <div className="flex flex-col gap-7 text-base">
        FlightSavior recommends that you take out cancellation protection when
        you book travel.
        <br />
        <br />
        Note! We have two different cancellation protections. For details, see
        your receipt or read more here.
        <br />
        <br />
        1) Trip purchased on/after June the 19th 2019- XCover cancellation
        insurance. Find out more on your insurance email or read more here
        <br />
        <br />
        2) Trip purchased before June the 19th – read here:
        <br />
        <br />
        You will receive a payment if you cannot reasonably take your trip due
        to you, your travel companion or a close relative of yours suffering
        from acute illness, having an accident or dying. “Close relative” in
        this context means the insured party's husband, wife, children,
        grandchildren, siblings, parents, grandparents or parents-in-law, a
        person that the insured party lives with as a couple as if they were
        married, or one of the travel companions in your booking. Acute illness
        refers to illness which you did not know, could not have known or ought
        not to have known would occur when you ordered the trip. The incident
        must be verified by means of a valid Gotogate doctor's certificate.
        There are certain exceptions as to when cancellation protection will not
        be valid.
        <br />
        <br />
        Find out more in our travel conditions »
        <br />
        <br />
        Cancellation protection is taken out at the time of booking.
        <br />
        <br />
        Cancellation must take place at least two hours before the outbound
        journey was due to begin. No refund will be given if you cancel later
        than this.
        <br />
        <br />
        Cancellation protection is valid only together with Gotogate's own
        doctor's certificate and will be sent to us within five working days of
        cancellation. The doctor's certificate must be completed by a doctor
        affiliated to the Social Insurance Office, and the certificate must bear
        the name, contact telephone number and stamp of the doctor. A copy of
        the doctor's identification must be enclosed if no stamp is available.
        The doctor's certificate must state the examination date, examination
        results, diagnosis and the fact that you are unable to travel. The
        doctor must use the Gotogate doctor's certificate: this is the only
        doctor's certificate we accept. The doctor's certificate must be printed
        by an independent party for the doctor's certificate to be valid.
        Download the doctor's certificate here »
        <br />
        <br />
        No refund will be made if you do not turn up on time for your trip or if
        you have incorrect documents which mean that you cannot/are not allowed
        to travel. The maximum amount payable in the event of cancellation
        against cancellation protection is 2739 USD per person and/or 5478 USD
        per trip
      </div>
    </Section>
  );
}
function Complaint() {
  return (
    <Section heading={"report complaint"}>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum." "Sed ut perspiciatis unde omnis iste natus error sit
      voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
      ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
      dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
      ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
      numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
      quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
      ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
      consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate
      velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum
      fugiat quo voluptas nulla pariatur?"
    </Section>
  );
}

export {
  Airlines,
  FAQ,
  ContactUs,
  AboutUs,
  ToS,
  Privacy,
  Security,
  Help,
  Safety,
  Cancellation,
  Complaint,
};
