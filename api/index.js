const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
app.listen(port, "http://192.168.251.243:8000", () => {
  console.log("Server is running on port 8000");
});

mongoose
  .connect("mongodb+srv://mgunturnn:mgunturnn@cluster0.7fdknnh.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Terkoneksi ke MongoDB");
  })
  .catch((err) => {
    console.log("Gagal terkoneksi ke MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server sedang berjalan di port 8000");
});

const User = require("./models/user");
const Order = require("./models/order");

//function to send verification email to the user
const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gungunwan55@gmail.com",
      pass: "qkhx tduy dzng mnlq",
    },
  });

  //compose the email message
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email",
    text: `Silakan klik link berikut untuk memverifikasi akun email Anda!: http://192.168.177.243:8000/verify/${verificationToken}`,
  };

  //send the email
  try{
    await transporter.sendMail(mailOptions);
  } catch(error) {
    console.log("Gagal mengirim email verifikasi!", error);
  }

};

//endpoint to register in the app
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if email are registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    //create new user
    const newUser = new User({ name, email, password });

    //generate and store verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to database
    await newUser.save();

    //send verification email to user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (error) {
    console.log("Error ketika meregistrasi Anda!", error);
    res.status(500).json({ message: "Registration gagal" });
  }
});

//endpoint to verify the email
app.get("/verify/:token",async(req,res) => {
    try{
        const token = req.params.token;

        //find the user with the given verification token
        const user = await User.findOne({verificationToken: token});
        if(!user){
            return res.status(404).json({message:"Token Verifikasi Tidak Valid!"});
        }

        //mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({message:"Sukses memverifikasi email!"});
    } catch(error) {
        res.status(500).json({message:"Gagal memverifikasi email!"});
    }
})
