import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { APIS, useAPI } from "../api/config";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function AdminSettings() {
  const [user, setUser] = useContext(UserContext);

  const NavLinks = [
    {
      text: "Add Markup",
      link: "add-markup",
    },
    {
      text: "Edit Privacy Policy",
      link: "edit-privacy-policy",
    },
    {
      text: "Edit Cancellation",
      link: "edit-cancellation-policy",
    },
    {
      text: "Edit Contact Us",
      link: "edit-contact-us",
    },
    {
      text: "Edit About Us",
      link: "edit-about-us",
    },
    {
      text: "Edit Home Banner",
      link: "edit-home-section",
    },
  ];

  return (
    <div className="my-10 mx-5 p-4">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-auto flex flex-col gap-5 flex-grow">
          <div className="font-semibold text-3xl border-dashed border-b-4 border-blue-600 pb-2">
            Settings
          </div>
          <div className="admin-settings-nav flex flex-col gap-1 w-full shadow-md rounded-md p-4">
            {NavLinks.map((item, i) => {
              return (
                <NavLink
                  key={i}
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-600 rounded-sm text-white font-semibold pl-5"
                      : "pl-5"
                  }
                >
                  {item.text}
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="md:w-2/3 admin-settings-content">
          <div className="flex flex-row">
            <div className="mx-auto p-10 shadow-lg">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
