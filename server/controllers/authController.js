const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {error, success} = require('../utils/responseWrapper');


const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.send(error(400,"Please provide email and password"));
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send(error(409,"User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.send(success(201,{user}));

  } catch (err) {
    return res.send(error(500,err.message));
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(400,"Please provide email and password"));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.send(error(404,"User is not registered"));
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return res.send(error(403,"Incorrect password"));
    }

    const accessToken = generateAccessToken({
      _id: user._id,
    });

    const refreshToken = generateRefreshToken({
        _id: user._id,
    });

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true
    })

    return res.send(success(200, { accessToken }));

  }
    catch (e) {
      return res.send(error(500,e.message));
    }
  }
;

const refreshAccessTokenController = async (req, res) => {

    const cookies = req.cookies;
    if(!cookies.jwt){
      return res.send(error(401, "Refresh token in cookie is required"));
    }

    const refreshToken = cookies.jwt;

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
        const _id = decoded._id;
        const accessToken = generateAccessToken({_id});
        return res.send(success(201,{accessToken}));

    } catch (err) {
        return res.send(error(401, err.message));
    }
}

const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "1d",
    });
    console.log(token);
    return token; 
  } catch (e) {
    return res.send(error(500,e.message));
  }
  
};

const generateRefreshToken = (data) => {
    try {
      const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
        expiresIn: "1y",
      });
      console.log(token);
      return token;
    } catch (err) {
      console.log(err);
    }
  };

const logOutController = async(req, res) => {
  try{
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true
    });
    res.send(success(200, "Logged out successfully"));
  }
  catch(e){
    return res.send(error(500, e.message));
  }
} 


module.exports = {
  signUpController,
  loginController,
  refreshAccessTokenController,
  logOutController
};
