import { Button } from "antd";
import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { UserContext } from "../context/UserContext";
import { APIS, useAPI } from "../api/config";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";

const InfoSection = ({ name = "", email = "", userId, onDelete }) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-light">{name}</div>
        <div className="text-normal font-semibold">{email}</div>
      </div>
      <div className="flex flex-row gap-2">
        <Button
          type="primary"
          danger
          htmlType="button"
          size="default"
          className="font-semibold"
          onClick={() => {
            onDelete(userId);
          }}
        >
          <IoTrashBin />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default function AdminUsers() {
  const [user, setUser] = useContext(UserContext);
  const { token } = user.data;
  const [users, setUsers] = useState([]);
  const [getUsers, userLoading] = useAPI(APIS.getAllUsers);
  const [deleteUserData, deleteLoading] = useAPI(APIS.deleteUser);

  const setUserData = () => getUsers(token).then((res) => setUsers(res.data));

  const deleteUser = (id) => {
    Swal.fire({
      icon: "warning",
      titleText: "Confirmation",
      text: "Do you really want to delete this user's account?",
      confirmButtonText: "Yes, Delete this Account.",
      confirmButtonColor: "var(--red)",
      showCancelButton: true,
      cancelButtonText: "No",
    }).then((del) => {
      if (del.isConfirmed) {
        deleteUserData({ id: id, token: token }).then(
          (res) => {
            if (res?.name == "AxiosError")
              return Swal.fire("Error", res.message, "error");
            if (res?.data.deletedCount < 1)
              return Swal.fire(
                "Account Deletion Failed",
                "Account cannot be deleted at this moment.",
                "warning"
              );
            setUserData();
            Swal.fire({
              titleText: "The account has been deleted.",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (res) => {
            Swal.fire(
              "Account Deletion Failed",
              "Account cannot be deleted at this moment.",
              "warning"
            );
          }
        );
      }
    });
  };

  useEffect(() => {
    setUserData();
  }, []);

  return (
    <>
      {userLoading || deleteLoading ? (
        <div className="text-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="text-2xl font-bold">User List</div>
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex flex-col p-4 gap-4">
              {users
                .filter((item) => !item?.role)
                .map((item, i) => {
                  return (
                    <InfoSection
                      name={item.name}
                      email={item.email}
                      userId={item._id}
                      onDelete={deleteUser}
                      key={i}
                    />
                  );
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
