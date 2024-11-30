import User from "../models/User.js";
import Order from "../models/Order.js";
import Guest from "../models/Guest.js";
import Hotel from "../models/Hotel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const data = { name, email, phone, password };
    let user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User with this email already exists" });
    }
    user = new User({ name, email, phone, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWTSECRET || "myscretkey",
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err.message;

        return res.json({ token });
        console.log(token);
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ msg: "User with this email doesnot exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ msg: "Password Incorrect" });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: 360000 },
      async (err, token) => {
        if (err) throw err.message;
        return res.json({ token });
      }
    );
  } catch (error) {}
};

const getUserData = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await User.findOne({ _id: id });
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const updatePersonalInfo = async (req, res) => {
  const { id } = req.user;
  const { name, email, phone } = req.body;
  try {
    const response = await User.findOneAndUpdate(
      { _id: id },
      { $set: { name, email, phone } },
      { new: true }
    );
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// -----------------------ADMIN ACTIONS-------------------

const getAllUserData = async (req, res) => {
  try {
    const response = await User.find();
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getSpecificUserData = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await User.findOne({ _id: id });
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const deleteUserData = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await User.deleteOne({ _id: id });
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await User.deleteOne({ _id: id });
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const userFlightdata = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await Order.find({ userId: id });
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const allUserFlightdata = async (req, res) => {
  try {
    const data = await Order.find();
    const userOrders = data.filter((dt) => {
      if (dt?.orderType == "flight") {
        return dt;
      }
    });
    const guestOrders = await Guest.find();
    return res.status(200).json({ userOrders, guestOrders });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const allUserHoteldata = async (req, res) => {
  try {
    const data = await Order.find();
    const userOrders = data.filter((dt) => dt?.orderType === "hotel");
    const guestOrders = await Hotel.find();
    return res.status(200).json({ userOrders, guestOrders });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { type, id } = req.body;

    if (!type || !id) {
      return res
        .status(400)
        .json({ message: "Invalid request. Check the inputs." });
    }

    let deletedRecord;

    if (type === "user") {
      deletedRecord = await Order.findOneAndDelete({ orderId: id });

      if (!deletedRecord) {
        return res
          .status(404)
          .json({ message: "Order not found in Order collection." });
      }

      return res.status(200).json({
        message: "Order deleted successfully from Order collection.",
        deletedRecord,
      });
    } else if (type === "guest") {
      deletedRecord = await Guest.findByIdAndDelete(id);

      if (!deletedRecord) {
        return res
          .status(404)
          .json({ message: "Order not found in Guest collection." });
      }

      return res.status(200).json({
        message: "Order deleted successfully from Guest collection.",
        deletedRecord,
      });
    } else if (type === "guestHotel") {
      deletedRecord = await Hotel.findByIdAndDelete(id);

      if (!deletedRecord) {
        return res
          .status(404)
          .json({ message: "Hotel data not found in Hotel collection." });
      }

      return res.status(200).json({
        message: "Hotel data deleted successfully from Hotel collection.",
        deletedRecord,
      });
    } else {
      return res.status(400).json({ message: "Invalid type provided." });
    }
  } catch (error) {
    return res.status(500).json({ message: "An error occurred.", error });
  }
};

const specificOrderData = async (req, res) => {
  const { id } = req.body;
  try {
    const data = await Order.findById(id).populate("userId");
    if (!data) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  register,
  Login,
  getUserData,
  getAllUserData,
  getSpecificUserData,
  deleteUserData,
  updatePersonalInfo,
  deleteAccount,
  userFlightdata,
  allUserFlightdata,
  allUserHoteldata,
  specificOrderData,
  deleteOrder,
};
