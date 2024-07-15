const Account = require('../model/AccountSchema')
const Drug = require('../model/DrugSchema')
const bcrypt = require('bcryptjs')



const jwt = require('jsonwebtoken')

const validateSession = async(req, res, next) => {
    const authToken = req.header("Authorization");
    if (!authToken || !authToken.startsWith("Bearer ")) {
      return res.status(401).json({message: 'user unauthorized'});
    }

    const token = authToken.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        if (err?.name == "TokenExpiredError") {
          return res.status(401).json({message: "Token has expired"});
        }

        return res.status(401).json({message: 'user unauthorized'});
      }

      try {
        const user = await Account.findOne({name: decoded.username});
        if (!user) {
          return res.status(401).json({message: 'user unauthorized'});
        }
        req.user = decoded;
        next();

      } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal server error"});
      }
    });
}


const login = async(req, res) => {
    const {username, password} = req.body
    const user = await Account.findOne({name: username}) 

    if (!user) {
        return res.status(400).json({message: 'user not found'})
    }

    const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn:'1d'})

    try {
        const verify = await bcrypt.compare(user.password, password).
        then( result => res.status(200).json({message: 'successfully logged in', data: {user: user, accessToken: token}}))
    } catch (error) {
        res.status(400).json({message: error})
    }
}

// const dashboard = (req, res) => {
//     res.send('welcome to dashboard')
// }

const signup = async(req, res) => {
    const { username, email, role, password } = req.body
    
    const usernameExists = await Account.findOne({name: username})
    if(usernameExists) {
        return res.status(400).json({message: 'username already exists'})
    }
    
    const emailExists = await Account.findOne({email})
    if(emailExists) {
        return res.status(400).json({message: 'email already exists'})
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt)
  
    try {
       const user = await Account.create({ 
        name: username,
         password: hashed,
         role, 
         email })
       console.log(user)
        res.status(200).json(
            {
                message: "User successfully created",
                user,       
            }
        )


    } catch (err) {
        res.status(400).json({
        message: "User not successful created",
        error: err.message,
      })
  }
}


const schedule = async (req, res) => {
  const {schedule, id, selfId } = req.body

  if(!schedule || !id || !selfId) {
    return res.status(401).json({message: 'All fields must not be empty'})
  }

  try {
    const receipient = await Account.findOneAndUpdate({_id: id}, {schedules: schedule})
    const sender = await Account.findOneAndUpdate({_id: selfId}, {schedules: schedule})

    const updatedSelf = await Account.findById(selfId)
    .then((response) => res.status(200).json({message: 'scheduling was a success', data: response}))

  } catch (error) {
    res.status(401).json({message: 'Schedule was unsuccessful', error: error.message})
  }
  
}


const prescribe = async (req, res) => {
  const {prescribe, id, selfId } = req.body

  if(!prescribe || !id || !selfId) {
    return res.status(401).json({message: 'All fields must not be empty'})
  }

  try {
    const receipient = await Account.findOneAndUpdate({_id: id}, {prescriptions: prescribe})
    const sender = await Account.findOneAndUpdate({_id: selfId}, {prescriptions: prescribe})

    const updatedSelf = await Account.findById(selfId)
    .then((response) => res.status(200).json({message: 'prescription was successful', data: response}))

  } catch (error) {
    res.status(401).json({message: 'prescription was unsuccessful', error: error.message})
  }
  
}


const fetchCandidates = async (req, res) => {
  const {role} = req.query

  if(!role) {
    return res.status(401).json({message: 'role undefined'})
  }

  try {
    const allCandidates = await Account.find({role})

    if(!allCandidates) {
      return res.status(401).json({message: `no ${role} yet`})
    }

    res.status(200).json({message: 'users fetched', data: allCandidates})
  } catch (error) {
    res.status(401).json({message: 'an error occured while fetching patients', error: error.message})
  }
}


module.exports = { validateSession, login, signup, schedule, prescribe, fetchCandidates} 
