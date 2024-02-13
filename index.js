import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { UserModel } from "./models/Users.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://ajaygupta9504:ajaygupta9504@cluster0.113rmqb.mongodb.net/crud"
  )
  .then((e) => console.log("Database connected"));

// mongoose.connect("mongodb://localhost:27017/crud");

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, email: req.body.email, age: req.body.age }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.post("/createUser", async (req, res, next) => {
  try {
    const { name, email, age } = req.body;

    await UserModel.create({
      name,
      email,
      age,
    });

    res.status(201).json({
      success: true,
      message: "User added Successfully",
    });
  } catch (error) {
    next(error);
  }
});

app.listen(3001, () => {
  console.log("Server is Running");
});
