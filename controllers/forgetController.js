// 1- calling the model
const User = require("../models/user");
const bcrypt = require('bcrypt');

const nodemailer = require("nodemailer");
const randomstring = require("randomstring");


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "arabicrecipes65@gmail.com",
      pass: "qlnnagwjsettapld",
    },
  });

  const allForgetUsers = async (req, res) => {
    const { email } = req.body;
  
    try {
      const forgottenUser = await User.findOne({ email });
  
      if (!forgottenUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Generate a random PIN code
      const pinCode = randomstring.generate({
        length: 6, // Change the length of the PIN code as required
        charset: "numeric",
      });
  
      // Save the PIN code and its expiration date (optional) in your database
      // Associate the PIN code with the user's email or user ID
      // For simplicity, let's assume you have a "resetPin" field in the User schema to store the PIN.
  
      forgottenUser.resetPin = pinCode;
      await forgottenUser.save();
  
      // Send the PIN code to the user's email
      const mailOptions = {
        from: "arabicrecipes65@gmail.com",
        to: email,
        subject: "Password Reset PIN Code",
        text: `Your PIN code for password reset is: ${pinCode}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Failed to send the PIN code" });
        } else {
          console.log("Email sent: " + info.response);
          return res.json({ message: "PIN code sent to email" });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };




  const checkPin = async (req, res) => {
    const { email, pinCode, newPassword } = req.body;
    try {
      // Find the user by email and make sure the resetPin matches
      const user = await User.findOne({
        email: email,
        resetPin: pinCode,
        // resetPinExpires: { $gt: Date.now() }, // Make sure the reset pin has not expired
      });
  
      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired PIN code' });
      }
  
      return res.json({ message: 'pin code successful' });

    } catch (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };


  const resetPassword = async (req, res) => {

    const { email, pinCode, newPassword } = req.body;
    try {
      // Find the user by email and make sure the resetPin matches
      const user = await User.findOne({
        email: email,
        resetPin: pinCode,
        // resetPinExpires: { $gt: Date.now() }, // Make sure the reset pin has not expired
      });
  
      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired PIN code' });
      }
  
      // Hash the new password and update it in the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    //   user.resetPin = undefined; // Clear the resetPin and resetPinExpires
    //   user.resetPinExpires = undefined;
      await user.save();
  
      return res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ error: 'Something went wrong' });
    }

  }



module.exports = {
    allForgetUsers,
    checkPin,
    resetPassword
}; 
