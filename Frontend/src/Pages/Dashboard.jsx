import temp from "../assets/img/acc-header.png";
import temp2 from "../assets/img/acc-flights.png";
import Swal from "sweetalert2";

const Dashboard = () => {
  // Swal.fire({
  //   title: "Booking Successful",
  //   text: "Your flight has been booked",
  //   icon: "success",
  //   timer: 2500,
  //   showConfirmButton: false,
  // });
  let isLoaded = false;
  setTimeout(() => {
    isLoaded = false;
  }, 3000);
  isLoaded = true;
  return (
    <>
      {isLoaded ? (
        <>
          <img src={temp} alt="" />
          <img src={temp2} alt="" />
        </>
      ) : null}
    </>
  );
};

export default Dashboard;
