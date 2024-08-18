import { Avatar, Badge, Divider } from "antd";
import tmp from "../assets/img/acc-tmp.jpg";
import { EditFilled, UserOutlined } from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { APIS, useAPI } from "../api/config";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { CircularProgress } from "@mui/material";

export default function Accounts() {
  const [user, setUser] = useContext(UserContext);
  const { token } = user.data;
  const navigate = useNavigate();
  const [getUser, userLoading] = useAPI(APIS.getUserData);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUser(token).then((res) => setUserData(res.data));
  }, []);

  return (
    <div className="p-10 user-account flex flex-col gap-8">
      {userLoading ? (
        <div className="text-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="flex flex-row">
            <div className="flex flex-col mx-auto gap-3">
              <div className="user-image flex justify-center">
                <Badge
                  className="cursor-pointer"
                  count={
                    <Avatar
                      icon={
                        <EditFilled
                          style={{ color: "#ffffff", fontSize: 20 }}
                        />
                      }
                      style={{ background: "var(--primary-500)" }}
                      size={30}
                    />
                  }
                  offset={[-20, 120]}
                >
                  {localStorage.getItem("admin") ? (
                    <>
                      <Avatar
                        size={150}
                        style={{ border: "3px solid var(--primary-500)" }}
                      >
                        <UserOutlined style={{ fontSize: "5rem" }} />
                      </Avatar>
                    </>
                  ) : (
                    <>
                      <Avatar
                        src={
                          <img
                            src="https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="avatar"
                            className="object-cover"
                          />
                        }
                        size={150}
                        style={{ border: "3px solid var(--primary-500)" }}
                      />
                    </>
                  )}
                </Badge>
              </div>
              <div className="user-details flex flex-col text-center">
                <div className="font-semibold text-2xl">{userData.name}</div>
                <div className="font-normal text-base">{userData.email}</div>
              </div>
            </div>
          </div>
          <div className="user-content mx-10 flex flex-col gap-8">
            <div className="flex flex-row px-5 pt-5 bg-white rounded-lg shadow-md font-bold">
              <div
                className="w-5/12 pb-3 cursor-pointer"
                onClick={() => navigate("/user")}
              >
                <Link to="/user">
                  {localStorage.getItem("admin") ? (
                    <>User List</>
                  ) : (
                    <>Account</>
                  )}
                </Link>
              </div>
              <div className="w-2/12 pb-3 flex justify-center">
                <div className="vl"></div>
              </div>
              <div
                className="w-5/12 pb-3 cursor-pointer"
                onClick={() => navigate("bookings")}
              >
                <Link to="bookings">
                  {localStorage.getItem("admin") ? (
                    <>Booking List</>
                  ) : (
                    <>Your Booking</>
                  )}
                </Link>
              </div>
            </div>
            <Outlet />
            {/* </div> */}
          </div>
        </>
      )}
    </div>
  );
}
