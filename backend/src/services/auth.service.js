const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');


const SALT_ROUNDS = 10;


async function registerUser({name,email,password}){


    const existingUser = await User.findOne({email});


    if(existingUser){

        const error = new Error(
            "User already exists with this email"
        );

        error.statusCode = 409;

        throw error;
    }


    const hashedPassword =
        await bcrypt.hash(password,SALT_ROUNDS);



    const user = await User.create({

        name,
        email,
        password:hashedPassword

    });


    const token = generateToken(user._id);


    return {

        user:{
            id:user._id,
            name:user.name,
            email:user.email
        },

        token

    };

}



async function loginUser({email,password}){


    const user = await User.findOne({email});


    if(!user){

        const error = new Error(
            "Invalid email or password"
        );

        error.statusCode=401;

        throw error;

    }


    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );


    if(!isMatch){

        const error = new Error(
            "Invalid email or password"
        );

        error.statusCode=401;

        throw error;

    }


    const token = generateToken(user._id);


    return {

        user:{
            id:user._id,
            name:user.name,
            email:user.email
        },

        token

    };

}



module.exports={
    registerUser,
    loginUser
};