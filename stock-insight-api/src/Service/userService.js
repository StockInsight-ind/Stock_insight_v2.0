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

module.exports = {
    registerUser
};