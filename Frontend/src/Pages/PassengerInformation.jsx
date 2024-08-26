import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APIS, useAPI } from "../api/config";
import Swal from "sweetalert2";
import moment from "moment";

const PassengerForm = ({ title, id }) => {
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    let countries = null;
    try {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,cca2"
      );
      countries = res.data.map((obj) => {
        return { name: obj.name.common, cca2: obj.cca2 };
      });
      return countries.sort((a, b) => a.name.localeCompare(b.name));
    } catch (err) {
      console.error(err);
    }

    return countries;
  };

  useEffect(() => {
    getCountries().then((res) => {
      const arr = res.map((country) => {
        return {
          label: `${country.name} (${country.cca2})`,
          value: country.cca2,
        };
      });
      setCountries(arr);
    });
  }, []);

  return (
    // <div className="flex">
    //   <Form
    //     name="passenger-form"
    //     className="flex flex-col mx-auto px-7"
    //     style={{ flexBasis: 600 }}
    //   >
    <>
      <div className="text-black text-3xl mb-9 raleway font-semibold">
        {title}:
      </div>
      <Form.Item name={`${id}-line-1`} style={{ minHeight: "4rem" }}>
        <div className="flex flex-row gap-3 flex-wrap">
          <Form.Item label="Title" layout="vertical" className="flex-grow-[1]">
            <Form.Item
              name={`${id}-title`}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Title is required",
                },
              ]}
            >
              <Select
                defaultValue="empty"
                value="empty"
                options={[
                  { label: "--", value: "empty" },
                  {
                    label: "Mr.",
                    value: "Mr",
                  },
                  {
                    label: "Ms.",
                    value: "Ms",
                  },
                  {
                    label: "Mrs.",
                    value: "Mrs",
                  },
                  {
                    label: "Miss",
                    value: "Miss",
                  },
                  {
                    label: "Dr.",
                    value: "Dr",
                  },
                ]}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Given Name"
            layout="vertical"
            className="flex-grow-[2]"
          >
            <Form.Item
              name={`${id}-given-name`}
              noStyle
              rules={[{ required: true, message: "Given Name is Required" }]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Family Name"
            layout="vertical"
            className="flex-grow-[2]"
          >
            <Form.Item
              name={`${id}-family-name`}
              noStyle
              rules={[{ required: true, message: "Family Name is Required" }]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
        </div>
      </Form.Item>
      <Form.Item name={`${id}-line-2`} style={{ minHeight: "4rem" }}>
        <div className="flex flex-row gap-3 flex-wrap">
          <Form.Item
            label="Date of Birth"
            layout="vertical"
            className="flex-grow-[1]"
          >
            <Form.Item
              name={`${id}-dob`}
              noStyle
              rules={[{ required: true, message: "Date of Birth is Required" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Gender" layout="vertical" className="flex-grow-[1]">
            <Form.Item
              name={`${id}-gender`}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Gender is required",
                },
              ]}
            >
              <Select
                defaultValue="empty"
                value="empty"
                options={[
                  { label: "--", value: "empty" },
                  {
                    label: "Male",
                    value: "m",
                  },
                  {
                    label: "Female",
                    value: "f",
                  },
                ]}
              />
            </Form.Item>
          </Form.Item>
        </div>
      </Form.Item>
      <Form.Item name={`${id}-line-3`} style={{ minHeight: "4rem" }}>
        <div className="flex flex-row gap-3 flex-wrap">
          <Form.Item
            label="Country of Issue"
            layout="vertical"
            className="flex-grow-[1]"
          >
            <Form.Item
              name={`${id}-passport-country`}
              noStyle
              rules={[
                { required: true, message: "Passport Country is Required" },
              ]}
            >
              <Select
                value="empty"
                defaultValue="empty"
                options={[{ label: "--", value: "empty" }, ...countries]}
              />
            </Form.Item>
          </Form.Item>
        </div>
      </Form.Item>
      {/* <Form.Item name={`${id}-line-4`} style={{ minHeight: "4rem" }}>
        <div className="flex flex-row gap-3 flex-wrap">
          <Form.Item
            label="Passport Number"
            layout="vertical"
            className="flex-grow-[1]"
          >
            <Form.Item
              name={`${id}-passport-number`}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Passport Number is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Date of Expiry"
            layout="vertical"
            className="flex-grow-[1]"
          >
            <Form.Item
              name={`${id}-passport-expiry`}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Passport Expiry is required",
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Form.Item>
        </div>
      </Form.Item> */}
    </>
    // {/* <Form.Item name={`${id}-line_butt-n`}>
    //     <Button type="primary" htmlType="submit" className="h-10" block>
    //       Submit
    //     </Button>
    //   </Form.Item> */}
    //   </Form>
    // </div>
  );
};

export default function PassengerInformation({
  offer_id,
  amount = null,
  onSubmit,
}) {
  // const { offer_id } = useParams();
  const [offer, offerLoading] = useAPI(APIS.offerData);
  const [createOrder, orderLoading] = useAPI(APIS.createOrder);
  const [passengers, setPassengers] = useState([]);
  const [child, setChild] = useState([]);
  const navigate = useNavigate();
  const [paymentObj, setPaymentObj] = useState({
    currency: "GBP",
    amount: amount,
  });

  useEffect(() => {
    offer({ offerId: offer_id }).then((res) => {
      // console.log(res);
      // paymentObj.amount = (parseFloat(res.data.total_amount) + 32).toFixed(2);
      // setPaymentObj(paymentObj);
      const arr = res.data.passengers
        .filter((item) => item.type === "adult")
        .map((item) => {
          return { id: item.id };
        });
      // console.log(arr);
      setPassengers(arr);
      const childArr = res.data.passengers
        .filter((item) => item.type !== "adult")
        .map((item) => {
          return { id: item.id };
        });
      setChild(childArr);
    });
  }, []);

  // useEffect(() => console.log(paymentObj), [paymentObj]);

  const submitDetails = async (values) => {
    // console.log(values);
    const passengerDetails = passengers.map((passenger, i) => {
      const id = passenger.id;
      const date = values[`${id}-dob`];
      const dateStr = `${date.get("year")}-${date.get("month")}-${date.get(
        "date"
      )}`;
      return {
        phone_number: values["contact"],
        email: values["email"],
        born_on: moment(dateStr, "YYYY-M-DD").format("YYYY-MM-DD"),
        title: values[`${id}-title`],
        gender: values[`${id}-gender`],
        family_name: values[`${id}-family-name`],
        given_name: values[`${id}-given-name`],
        id: id,
      };
    });
    console.log(passengerDetails);
    setPassengers(passengerDetails);
    const orderDetails = {
      payment: paymentObj,
      passenger: [...passengerDetails, ...child],
      offerId: offer_id,
      metadata: {},
    };
    // console.log(orderDetails);
    onSubmit(orderDetails);
    document.getElementById("passengerSubmitBtn").disabled = true;
    document.getElementById("passengerSubmitBtn").style.background = "grey";
    document.getElementById("passengerSubmitBtn").style.color = "white";
    document.getElementById(
      "passengerSubmitBtn"
    ).innerHTML = `Submitted<span class="text-green-600">!</span>`;
  };

  return (
    <>
      <div className="flex">
        <Form
          name="passenger-form"
          className="passenger-info-form flex flex-col p-10 rounded-2xl border flex-grow"
          // style={{ flexBasis: 600 /*boxShadow: "0px 0px 14px 9px #cfc9c9c9"*/ }}
          onFinish={submitDetails}
        >
          <div className="raleway font-semibold text-black text-3xl mb-9">
            Contact Information
          </div>
          <Form.Item name="contact-info" style={{ minHeight: "4rem" }}>
            <div className="flex flex-row gap-3 flex-wrap">
              <Form.Item
                label="Email"
                layout="vertical"
                className="flex-grow-[2]"
              >
                <Form.Item
                  name="email"
                  noStyle
                  rules={[{ required: true, message: "Email is Required" }]}
                >
                  <Input type="email" />
                </Form.Item>
              </Form.Item>
              <Form.Item
                label="Contact"
                layout="vertical"
                className="flex-grow-[2]"
              >
                <Form.Item
                  name="contact"
                  noStyle
                  rules={[{ required: true, message: "Contact is Required" }]}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            </div>
          </Form.Item>
          {passengers.map((passenger, i) => (
            <PassengerForm
              key={i}
              title={`Passenger ${i + 1} (Adult)`}
              id={passenger.id}
            />
          ))}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              id="passengerSubmitBtn"
              className="h-10"
              block
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
