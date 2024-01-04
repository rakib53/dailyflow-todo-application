const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const User = require("../model/users.model");

// Generating token for userInformation
async function getRefreshToken(token) {
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );
  let refreshToken = await oAuth2Client.getToken(token);
  return refreshToken;
}

// Getting user data based on google user token
const getUserDetails = async (res, authToken) => {
  const scope = "https://www.googleapis.com/auth/userinfo.email";
  const oauthGoogleClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );

  try {
    oauthGoogleClient.setCredentials(authToken);
    oauthGoogleClient.generateAuthUrl({
      access_type: "offline",
      scope,
    });
    const userInfo = await google.oauth2("v2").userinfo.get({
      auth: oauthGoogleClient,
    });

    if (userInfo?.status === 200) {
      const {
        data,
        config: { headers: Authorization },
      } = userInfo;

      googleUserData(res, data, Authorization);
    } else {
      res.status(500).json({ message: "Failed!" });
    }
  } catch (error) {
    console.log(error, "48 line");
  }
};

// Sending data to the client
const googleUserData = async (res, userData, auth) => {
  try {
    // google user token
    const token = auth?.Authorization?.split(" ")[1];
    // User information
    const { email, name, picture } = userData;
    // Define your search criteria
    const query = { email: email };
    // Checkng if the user already exist
    const isUser = await User.findOne(query);
    if (!isUser) {
      // Creating the user object for database
      const newUser = await new User({
        email,
        userName: name,
        date: "343434",
        avatar: picture,
        role: "google_user",
      });
      // Storing the user information to database and gives front end response
      const savedUserData = await newUser.save();
      console.log(savedUserData);

      if (savedUserData?._id) {
        res.status(201).json({
          token: token,
          user: {
            userName: savedUserData.userName,
            email: savedUserData.email,
            date: savedUserData.date,
            role: savedUserData.role,
            _id: savedUserData?._id,
          },
          message: "User created successfully",
        });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    } else {
      res.status(201).json({
        token: token,
        user: {
          userName: isUser.userName,
          email: isUser.email,
          date: isUser.date,
          role: isUser.role,
          _id: isUser?._id,
        },
        message: "User Logged in successfully",
      });
    }
  } catch (error) {
    console.log(error, "92 line");
  }
};

// Getting google user login code from the client
const googleLogin = async (req, res, next) => {
  const { code } = req?.body;
  try {
    if (code) {
      const userTokenAndStatus = await getRefreshToken(code);
      if (userTokenAndStatus?.tokens) {
        getUserDetails(res, userTokenAndStatus?.tokens);
      }
    }
  } catch (error) {
    console.log(error, "107 line");
  }
};

module.exports = googleLogin;
