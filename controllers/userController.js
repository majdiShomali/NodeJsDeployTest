// 1- calling the model
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const SECRETKEY = process.env.SECRETKEY;

const userData =  async (req, res) => {
  const id = req.user.id;
  const user = await User.find({ _id: id });
  res.json(user);
};

const allUsers = (req, res) => {
  User.find({ role: 0 })
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};



const allProviders = (req, res) => {
  User.find({ role: 2 })
    .then((data) => {     
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const allAdmins = (req, res) => {
  User.find({ role: 1 })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};


const oneUser =  async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  res.json(user);
};



const newUser =  async (req, res) => {
    const { userName, email , password ,role,phone } = req.body;
    const user = await User.find({ email: email });
    if(user.length === 0 ){
      const hashPassword = await bcrypt.hash(password, 5)
      const user = new User({ userName: userName, email: email,password:hashPassword,role:role ,phone:phone});
      const newUser = await user.save();
      const token = jwt.sign({ id: user._id, userName: user.userName ,role : user.role }, SECRETKEY, { expiresIn: '24h' }); 
      res.json({ token ,newUser});
    }else{  
      res.json({ error: 'user alredy exist' });
  }
};


const newUserLogin =  async (req , res) => {

  const {email , password } = req.body;
  const user = await User.find({ email: email });
  if(user.length != 0){
    // password check
    const validpassword = await bcrypt.compare(
      password,
      user[0].password
    );
    if (!validpassword) {
      return res.json({ error: "incorrect password" });
    }
if(validpassword){

  const token = jwt.sign({ id: user[0]._id, userName: user[0].userName ,role : user[0].role }, SECRETKEY, { expiresIn: '24h' });
const user0=user[0]
  res.json({ token ,user0});
}

}else{
  res.json({ error: 'no user found check your email' });
}
};

const deleteUser = async (req, res) => {
   const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(204).json(User);
};

const updateUser = async (req, res) => {
  const image = req.file.path
  const { userName } = req.body;
  const userId  = req.params.id;
    const user = await User.findByIdAndUpdate(userId, {userName:userName,img:image}, { new: true });
    const updatedUser = await user.save();
    res.json(updatedUser);
};

module.exports = {
  allUsers,
  newUser,
  oneUser,
  deleteUser,
  newUserLogin,
  allProviders,
  allAdmins,
  userData,
  updateUser
}; 

