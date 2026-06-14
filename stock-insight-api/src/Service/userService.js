const bcrypt = require('bcrypt');

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

    return await userRepository.createUser(user);
};

module.exports = {
    registerUser
};