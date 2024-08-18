import MainCard from "../Common/MainCard";
import { Place, Star } from "@mui/icons-material";

const TopCarRentals = ({ main }) => {
  return (
    <MainCard>
      {main.map((ele, index) => {
        return (
          <div
            key={index}
            className="card flex flex-col overflow-hidden md:w-1/3"
            // style={{ width: "30%" }}
          >
            <div
              className="car-rental-card-image overflow-hidden"
              style={{ maxHeight: "200px" }}
            >
              <img src={ele.img} alt="" />
            </div>
            <div className="car-rental-details p-3 flex flex-row justify-between">
              <div className="flex flex-col">
                <p className="font-medium text-xl text-black">
                  Car rental in {ele.area}
                </p>
                <p
                  className="font-normal text-sm"
                  style={{ color: "var(--text-100)" }}
                >
                  {ele.country}
                </p>
              </div>
              <div className="flex flex-col">
                <p
                  className="font-normal text-sm"
                  style={{ color: "var(--text-100)" }}
                >
                  From
                </p>
                <p className="font-bold text-xl text-black">C${ele.cost}</p>
                <p
                  className="font-normal text-sm"
                  style={{ color: "var(--text-100)" }}
                >
                  Per Day
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </MainCard>
  );
};

export default TopCarRentals;
