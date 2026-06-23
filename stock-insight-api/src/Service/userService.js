const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRepository =
require('../Repositary/userRepositary');

const registerUser = async(user)=>{

    const existingUser =
        await userRepository.findByEmail(user.email);

    if(existingUser){
        throw new Error("Email already exists");
    }

    const hashedPassword =
        await bcrypt.hash(user.password,10);

    user.password = hashedPassword;

    const createdUser =
        await userRepository.createUser(user);

    if(user.stocks && user.stocks.length > 0){

        for(const stock of user.stocks){

            await userRepository.addUserStock(
                createdUser.id,
                stock
            );
        }
    }

    return createdUser;
};

const loginUser = async(email,password)=>{

    const user =
        await userRepository.findByEmail(email);

    if(!user){
        throw new Error("Invalid email or password");
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if(!isMatch){
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            userId:user.id,
            email:user.email
        },
        process.env.JWT_SECRET || "stocksecret",
        {
            expiresIn:"24h"
        }
    );

    return {
        token,
        user:{
            id:user.id,
            firstName:user.first_name,
            lastName:user.last_name,
            email:user.email,
            market:user.market
        }
    };
};

module.exports = {
    registerUser,
    loginUser
};
