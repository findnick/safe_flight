import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { APIS, useAPI } from "../api/config";
import { Button } from "antd";

const FormGroup = ({ labelText = "", input, children }) => {
  const { type, placeholder, name, id, value, onChange } = input;
  return (
    <div className="form-group-admin grid grid-cols-3 items-center justify-center">
      <label htmlFor={name} className="justify-self-start">
        {labelText}:
      </label>
      <input
        className="border rounded-3xl p-1 pl-4 justify-self-center"
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="justify-self-end">{children}</div>
    </div>
  );
};

export default function AdminSettings() {
  const [user, setUser] = useContext(UserContext);
  const { token } = user.data;
  const [getMarkup, markupLoading] = useAPI(APIS.getMarkup);
  const [updateMarkup, updLoading] = useAPI(APIS.updateMarkup);
  const [markup, setMarkup] = useState("");

  const saveValues = () => {
    updateMarkup({ token: token, body: { markup: markup } }).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    getMarkup(token).then((res) => setMarkup(res.data[0].markup));
  }, []);
  return (
    <div className="my-10 mx-5">
      <div className="flex flex-col gap-10">
        <div className="w-1/3 md:w-1/6 font-semibold text-3xl border-dashed border-b-4 border-blue-600 pb-2">
          Settings
        </div>
        <div className="flex flex-col gap-5 mx-auto md:w-2/5 p-10 shadow-lg">
          <FormGroup
            labelText="Flight Markup"
            input={{
              type: "text",
              name: "markup",
              id: "markup",
              placeholder: "",
              value: `${markup}`,
              onChange: (e) => {
                setMarkup(e.target.value);
              },
            }}
          >
            (GBP)
          </FormGroup>
          <div className="self-end">
            <Button
              type="primary"
              className="font-semibold text-lg"
              onClick={saveValues}
              disabled={updLoading || markupLoading}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
