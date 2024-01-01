const User = require("../model/users.model");
const jwt = require("jsonwebtoken");

// sigining json web token
const signJsonWebToken = (req, res, next) => {
  const userName = req?.body?.userName;
  const email = req?.body?.email;
  const password = req?.body?.password;
  const IsRemember = req?.body?.IsRemember;
  const user = {
    userName,
    email,
    password,
    IsRemember,
  };

  let isRememberValue;
  if (IsRemember) {
    isRememberValue = "30d";
  }
  const siginInToken = jwt.sign(
    {
      data: user,
    },
    process.env.JWT_SECRET,
    { expiresIn: isRememberValue ? isRememberValue : "1h" }
  );

  if (siginInToken.length > 0) {
    req.token = siginInToken;
    req.userInfo = user;
    next();
  } else {
    res.status(401).json({ message: "Authentication Failed" });
  }
};

// verifying json web token
const verifyJsonWebToken = (req, res, next) => {
  try {
    const userToken = req?.headers?.authorization?.split(" ")[1];
    if (userToken) {
      jwt.verify(userToken, process.env.JWT_SECRET, function (err, decode) {
        if (err) {
          return res.status(401).send({ message: "UnAuthorized access" });
        }
        req.decoded = decode.data;
        next();
      });
    } else {
      return res
        .status(401)
        .send({ message: "Something went wrong, please login again!" });
    }
  } catch (error) {
    next(error);
  }
};

// Creating a new User.
const registration = async (req, res, next) => {
  try {
    const token = req?.token;
    const { userName, email, password } = req?.userInfo;
    const { accountCompeletation } = req?.body;
    const date = `${new Date().toDateString().split(" ")[1]} ${
      new Date().toDateString().split(" ")[2]
    } ${new Date().toLocaleString().split(" ")[1].split(":")[0]}:${
      new Date().toLocaleString().split(" ")[1].split(":")[1]
    } ${new Date().toLocaleString().split(" ")[2]}, ${
      new Date().toDateString().split(" ")[3]
    }`;

    // User initial Role for account
    const role = "user";
    // User info to be send in fronted
    const user = {
      userName,
      password,
      email,
      date,
      role,
      accountCompeletation,
    };
    // User finding from the database
    const isUser = await User.find({ email });
    // Checkng if the user already exist
    if (isUser.length > 0) {
      res.status(301).json({ status: 301, message: "This email alredy exist" });
      return;
    }

    // Creating the user object for database
    const newUser = await new User(user);
    // Storing the user information to database and gives front end response
    const registerdUser = await newUser.save();

    if (registerdUser?._id) {
      res.status(201).json({
        token: token,
        user: {
          userName: registerdUser.userName,
          email: registerdUser.email,
          date: registerdUser.date,
          role: registerdUser.role,
          accountCompeletation: registerdUser.accountCompeletation,
          _id: registerdUser?._id,
        },
        message: "User created successfully",
      });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    next(error);
  }
};

// Login  User
const loginUser = async (req, res, next) => {
  try {
    // Token from the JWT
    const token = req?.token;
    // User form information
    const { email, password: userPass } = req?.userInfo;
    // Define your search criteria
    const query = { email: email };
    // Checkng if the user already exist
    const isUser = await User.findOne(query);

    if (isUser?._id) {
      // Desctructuring the user information
      const {
        _id,
        userName,
        password,
        date,
        role,
        phone,
        address,
        city,
        state,
        country,
        zipCode,
        avatar,
      } = isUser;
      // user information from Database
      const user = {
        _id,
        userName,
        email,
        date,
        role,
        phone,
        address,
        city,
        state,
        country,
        zipCode,
        avatar,
      };

      // sending the response to the fronted
      if (isUser?._id) {
        if (password !== userPass) {
          res
            .status(403)
            .json({ status: 403, message: "Password dosen't match!" });
          return;
        } else {
          res.status(201).json({
            token: token,
            user,
            message: "User logged in successfully",
          });
        }
      } else {
        res.status(404).json({ status: 404, message: "User not found!" });
        return;
      }
    } else {
      res.status(404).json({ status: 404, message: "User not found!" });
    }
  } catch (error) {
    next(error);
  }
};

// Checking The user is valid or not
const userInfo = async (req, res, next) => {
  try {
    // user email
    const { email } = req.decoded;
    // Define your search criteria
    const query = { email: email };
    // Checkng if the user already exist
    const isUser = await User.findOne(query);
    if (isUser?._id) {
      const { _id, userName, email, date, role, accountCompeletation } = isUser;
      return res.status(200).send({
        user: {
          _id,
          userName,
          email,
          date,
          role,
          accountCompeletation,
        },
        message: "valid user",
      });
    } else {
      return res.status(401).send({ message: "user isn't valid!" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signJsonWebToken,
  verifyJsonWebToken,
  registration,
  loginUser,
  userInfo,
};
