import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { APIS, useAPI } from "../api/config";
import { Button } from "antd";

const FormGroup = ({ labelText = "", input, children }) => {
  const { type, placeholder, name, id, value, onChange } = input;
  return (
    <div className="form-group-admin grid grid-flow-row sm:grid-flow-col items-center justify-center">
      <label htmlFor={name} className="justify-self-start mx-2">
        {labelText}:
      </label>
      <div className="flex flex-row items-center gap-2">
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
    </div>
  );
};

export default function AddMarkup() {
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
    <div className="flex flex-col gap-5">
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
        %
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
  );
}
