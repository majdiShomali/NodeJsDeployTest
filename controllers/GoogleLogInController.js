const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRETKEY;

const newUserGoogle = async (req, res) => {
  const { name, email, picture, verified_email, id } = req.body;
  const userExist = await User.find({ email: email });
console.log("11111111111")
  if (userExist.length == 0) {
    console.log("22222222222")
    const hashPassword = await bcrypt.hash(id, 5);
    const NewUser = new User({
      userName: name,
      email: email,
      password: hashPassword,
      role: 0,
    });
    const user = await NewUser.save();
    const token = jwt.sign(
      { id: user._id, userName: user.userName, role: user.role },
      SECRETKEY,
      { expiresIn: "24h" }
    );
    return res.status(200).json({ token, user });

  } else {
    console.log("333333333")

    const validpassword = await bcrypt.compare(id, userExist[0].password);

    if (!validpassword) {
      return res.status(500).json({ message: "incorrect password" });
    }

    if (validpassword) {
      const token = jwt.sign(
        { id: userExist[0]._id, userName: userExist[0].userName, role: userExist[0].role },
        SECRETKEY,
        { expiresIn: "24h" }
      );
      const user = userExist[0];
      return res.status(200).json({ token, user });
    }
  }

  
};


module.exports = {
  newUserGoogle,
};
