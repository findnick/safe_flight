import { Button, Form, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { UserContext } from "../context/UserContext";
import { APIS, useAPI } from "../api/config";
import { CircularProgress, TextField } from "@mui/material";
import { ImCross } from "react-icons/im";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const InfoSection = ({ label = "", text = "", type = "text", onChange }) => {
  const [change, setChange] = useState(false);
  const [val, setVal] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [error, setError] = useState("hidden");
  const [errorPass, setErrorPass] = useState("hidden");
  const placeholderText =
    type == "password"
      ? "New Password"
      : type == "email"
      ? "Enter Email Address"
      : type != "phone"
      ? "Enter your Name"
      : "";

  useEffect(() => {
    if (!change) {
      setError("hidden");
      setVal("");
      setOldPass("");
    }
  }, [change]);

  const submit = (value) => {
    if (val.length < 1) {
      setError("block");
      return;
    }
    onChange(val);
    setChange(false);
  };

  return (
    <div className="flex flex-row justify-between items-center flex-wrap">
      <div className="flex flex-col gap-1">
        <div className="text-base font-light">{label}</div>
        <div className="text-base font-semibold">
          {type == "password" ? "*****************" : text}
        </div>
      </div>
      {change ? (
        <Form onFinish={submit}>
          <div className="flex flex-row-reverse gap-3">
            <Button
              type="primary"
              danger
              htmlType="button"
              size="middle"
              shape="circle"
              onClick={() => setChange(false)}
            >
              <ImCross />
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="middle"
              shape="circle"
              style={{ background: "var(--green)" }}
            >
              <FaCheck />
            </Button>
            <div className="flex flex-col">
              {type == "phone" ? (
                <PhoneInput
                  placeholder="Enter phone number"
                  value={val}
                  onChange={(value) => {
                    setVal(value);
                    setError("hidden");
                  }}
                  className="user-phone-input"
                />
              ) : (
                <Input
                  className="font-semibold quicksand"
                  value={val}
                  onChange={(e) => {
                    setVal(e.target.value);
                    setError("hidden");
                  }}
                  type={type}
                  placeholder={placeholderText}
                />
              )}

              <div className={`text-red-500 ${error} quicksand`}>
                * This field cannot empty
              </div>
            </div>
            {type == "password" && (
              <div className="flex flex-col">
                <Input
                  className="font-semibold quicksand"
                  value={oldPass}
                  onChange={(e) => {
                    setOldPass(e.target.value);
                    setErrorPass("hidden");
                  }}
                  type={type}
                  placeholder="Old Password"
                />
                <div className={`text-red-500 ${errorPass} quicksand`}>
                  * Wrong Old Password
                </div>
              </div>
            )}
          </div>
        </Form>
      ) : (
        <Button
          type="default"
          htmlType="button"
          size="large"
          className="font-semibold"
          onClick={() => setChange(true)}
        >
          <FaEdit />
          Change
        </Button>
      )}
    </div>
  );
};

export default function UserInfo() {
  const [user, setUser] = useContext(UserContext);
  const { token } = user.data;
  const [getUser, userLoading] = useAPI(APIS.getUserData);
  const [updateUser, updateLoading] = useAPI(APIS.changeUserData);
  const [deleteUserData, deleteLoading] = useAPI(APIS.deleteUserData);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const update = async (body) => {
    try {
      const res = await updateUser({ body: body, token: token });
      return res.status;
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = () => {
    Swal.fire({
      titleText: "Do you really wish to Delete your Account?",
      html: `<div class="flex flex-col gap-5">
          <div class="font-light text-2xl">
            Here's what you'll miss out on:
          </div>
          <ul class="text-left font-medium text-sm ml-5">
            <li> - You'll lose track of all your booking details.</li>
            <li> - Your transaction history will be erased.</li>
            <li> - You'll miss out on exicting deals & offers.</li>
            <li> - You'll miss out on FlightSavior exclusive offers.</li>
          </ul>
        </div>`,
      input: "email",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      cancelButtonText: "No, I want to enjoy all the Perks.",
      confirmButtonText: "Delete my Account.",
      cancelButtonColor: "var(--primary-300)",
      confirmButtonColor: "var(--red)",
      inputValidator: (value) => {
        if (value != userData.email) {
          return "Provided email doesn't match with your email.";
        }
      },
    }).then((prom) => {
      if (prom.isConfirmed) {
        Swal.fire({
          icon: "warning",
          titleText: "Final Confirmation",
          text: "Yes or No?",
          confirmButtonText: "Yes, Delete my Account.",
          confirmButtonColor: "var(--red)",
          showCancelButton: true,
          cancelButtonText: "No",
        }).then((del) => {
          if (del.isConfirmed) {
            deleteUserData(token).then(
              (res) => {
                console.log(res);
                Swal.fire({
                  titleText: "Your account has been deleted.",
                  icon: "error",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setUser();
                localStorage.removeItem("admin");
                localStorage.removeItem("email");
                navigate("/");
              },
              (res) => {
                console.log(res);
                Swal.fire(
                  "Account Deletion Failed",
                  "Account cannot be deleted at this moment.",
                  "warning"
                );
              }
            );
          }
        });
      }
    });
  };

  useEffect(() => {
    getUser(token).then((res) => setUserData(res.data));
  }, []);

  return (
    <>
      <div className="text-2xl font-bold">Account</div>
      {userLoading ? (
        <div className="text-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex flex-col p-4 gap-4">
              <InfoSection
                label="Name"
                text={userData.name}
                onChange={(value) => {
                  update({ name: value }).then((status) => {
                    if (status === 200) {
                      userData.name = value;
                      setUserData({ ...userData });
                    }
                  });
                }}
              />
              <InfoSection
                label="Email"
                text={userData.email}
                type="email"
                onChange={(value) => {
                  update({ email: value }).then((status) => {
                    if (status === 200) {
                      userData.email = value;
                      setUserData({ ...userData });
                    }
                  });
                }}
              />
              <InfoSection
                label="Password"
                type="password"
                onChange={(value) => {
                  update({ password: value }).then((status) => {
                    if (status === 200) {
                      userData.password = value;
                      setUserData({ ...userData });
                    }
                  });
                }}
              />
              <InfoSection
                label="Phone Number"
                text={userData.phone}
                type="phone"
                onChange={(value) => {
                  update({ phone: value }).then((status) => {
                    if (status === 200) {
                      userData.phone = value;
                      setUserData({ ...userData });
                    }
                  });
                }}
              />
              <div className="flex flex-row justify-between items-center">
                <div className="text-lg font-semibold">Delete Account</div>
                <Button
                  type="primary"
                  danger
                  htmlType="button"
                  size="large"
                  className="font-semibold"
                  onClick={deleteUser}
                >
                  <IoTrashBin size={20} />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
