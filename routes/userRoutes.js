const express = requires("express");
const User = require("./../module/User");
const router = express.Router();
const { jwtAuthMiddleware, generatetoken } = require("./../jwt");

router.post("/signup", async (req, res) => {
  try {

    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    console.log("Data Saved!!");

    const playload = {
      id: response.id,
    };

    const token = generatetoken(playload);

    res.status(200).json({ response: response, token: token });

  } catch (err) {

    res.status(500).json({ error: "Internal server error" });

  }
});

router.post("/login", async (req, res) => {
  try {

    const { aadharNumber, password } = req.body;
    const user = await User.findOne({ aadharNumber: aadharNumber });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(404).json({ error: "Invalid AadharNumber or Password" });
    }
    const playload = {
      id: user.id,
    };
    const token = generatetoken(playload);

    res.json({ token });

  } catch (err) {

    res.status(500).json({error: 'Internal server error'});

  }
});

router.get('/profile',jwtAuthMiddleware,async(req,res) => {
    try{

        const userData = req.User;
        const userId = userData.id;
        const user = await User.findById(userId);

        res.status(200).json({user});

    }catch(err){

        res.status(500).json({errror: 'Internal server error'});

    }
})
