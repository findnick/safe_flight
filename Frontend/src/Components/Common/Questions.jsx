import * as React from "react";
import BoldText from "./BoldText";
import RegularText from "./RegularText";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubHeading from "./SubHeading";

export default function Questions({ questions }) {
  return (
    <div className="mx-7 sm:mx-28 md:mx-52 my-20">
      <div className="text-center my-10">
        <SubHeading>FAQs</SubHeading>
      </div>
      {questions.map((q, i) => {
        return (
          <Accordion key={i}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id={`panel${i}-header`}
            >
              <BoldText>{q.question}</BoldText>
            </AccordionSummary>
            <AccordionDetails>
              <RegularText>{q.answer}</RegularText>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
