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

const login = async(req,res)=>{

    try{

        const {
            email,
            password
        } = req.body;

        if(!email || !password){

            return res.status(400).json({
                message:
                "Email and password are required"
            });
        }

        const result =
            await userService.loginUser(
                email,
                password
            );

        return res.status(200).json(result);

        }// catch(error){

    //     return res.status(401).json({
    //         message:error.message
    //     });
    // }


    catch(error){

    console.error("REGISTER ERROR:", error);

    return res.status(400).json({
        message:error.message,
        error:error
    });
}
};

module.exports = {
    register,
    login
};
