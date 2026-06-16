const userService =
require('../Service/userService');

const register = async(req,res)=>{

    try{

        const {
            firstName,
            lastName,
            email,
            password,
            market,
            stocks
        } = req.body;

        if(
            !firstName ||
            !lastName ||
            !email ||
            !password
        ){
            return res.status(400).json({
                message:"All fields required"
            });
        }

        const user =
            await userService.registerUser({
                firstName,
                lastName,
                email,
                password,
                market,
                stocks
            });

        res.status(201).json(user);

    }catch(error){

        res.status(400).json({
            message:error.message
        });
    }
};

module.exports = {
    register
};