import MainCard from "../Common/MainCard";
import {
  ArrowForwardIosRounded,
  LuggageRounded,
  StarRounded,
} from "@mui/icons-material";

const TopFlights = ({ main }) => {
  return (
    <MainCard>
      {main.map((ele, index) => {
        return (
          <div
            key={index}
            className="card flex flex-col overflow-hidden md:w-1/3"
          >
            <div
              className="car-rental-card-image overflow-hidden"
              style={{ maxHeight: "200px" }}
            >
              <img src={ele.img} alt="" />
            </div>
            <div className="car-rental-details p-3 flex flex-col gap-3">
              <div className="flex flex-row justify-between gap-7 lg:gap-0">
                <div className="flex flex-col">
                  <h5 className="font-medium text-xl" title={ele.name}>
                    {ele.country}
                  </h5>
                  <div
                    className="font-normal text-base"
                    style={{ color: "var(--stroke-tb)" }}
                  >
                    {ele.area}
                  </div>
                </div>
                <div className="flex flex-row font-light text-xs gap-1 self-start items-center flex-wrap">
                  <div className="flex flex-row items-end gap-1">
                    <i className="location">
                      <StarRounded
                        sx={{
                          fontSize: 16,
                          background: "black",
                          color: "white",
                          borderRadius: 5,
                        }}
                      />
                    </i>
                    <p className="font-light text-xs">{ele.cabin}</p>
                  </div>
                  <div className="flex flex-row items-end gap-1">
                    <i className="location">
                      <LuggageRounded
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    </i>
                    <p className="font-light text-xs">{ele.bags} Bags</p>
                  </div>
                </div>
              </div>
              <hr />
              {ele.suggestion.map((sugg, i) => {
                return (
                  <div className="flex flex-row justify-between" key={i}>
                    <div className="flex flex-row gap-3">
                      <img className="w-8 h-10" src={sugg.icon} alt="" />
                      <div className="flex flex-col">
                        <div className="departure font-medium text-xl">
                          {sugg.departure}
                        </div>
                        <div className="depart-details">
                          {sugg.from} - {sugg.to} with {sugg.airline}
                        </div>
                      </div>
                    </div>
                    <div className="flight-stops">
                      {sugg.stops > 0 ? sugg.stops + " stop" : "Direct"}
                    </div>
                  </div>
                );
              })}
              <div className="hotelCost flex flex-row items-center font-light justify-end gap-2 text-xl">
                from
                <div className="font-bold">
                  C${ele.cost}
                  <ArrowForwardIosRounded />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </MainCard>
  );
};

export default TopFlights;
