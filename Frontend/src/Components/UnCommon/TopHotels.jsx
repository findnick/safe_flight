import MainCard from "../Common/MainCard";
import { Place, Star } from "@mui/icons-material";

const TopHotels = ({ main }) => {
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
              <div className="flex flex-row justify-between">
                <h5 className="font-medium text-xl" title={ele.name}>
                  {ele.name.length > 30
                    ? ele.name.substring(0, 27) + "..."
                    : ele.name}
                </h5>
                <div className="flex flex-row font-light text-xs gap-1 items-center">
                  <i
                    className="location"
                    style={{ color: "var(--primary-500)" }}
                  >
                    <Place sx={{ fontSize: 14 }} />
                  </i>
                  {ele.area}
                </div>
              </div>
              <div className="font-normal text-xs">
                {ele.distance} from city center
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="rating font-semibold text-sm flex flex-row gap-1 py-1 px-2 items-center">
                  {ele.rating}
                  <Star sx={{ fontSize: 16, mb: "2px" }} />
                </div>
                <div className="font-normal text-sm">
                  ({ele.totalReviews} Reviews)
                </div>
              </div>

              <div className="flex flex-row items-center justify-end gap-1 font-light text-xs">
                <div className="hotelCost font-bold text-xl">C${ele.cost}</div>
                per night
              </div>
            </div>
          </div>
        );
      })}
    </MainCard>
  );
};

export default TopHotels;
