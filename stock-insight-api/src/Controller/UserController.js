const userService = require('../Service/userService');

const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: 'All fields required'
            });
        }

        const data = await userService.registerUser({
            firstName,
            lastName,
            email,
            password
        });
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const result = await userService.loginUser(email, password);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

const getPreferences = async (req, res) => {
    try {
        const preferences = await userService.getUserPreferences(req.user.userId);
        return res.status(200).json(preferences);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

const savePreferences = async (req, res) => {
    try {
        const { markets, stocks } = req.body;

        if (!Array.isArray(markets) || markets.length === 0) {
            return res.status(400).json({
                message: 'At least one market is required'
            });
        }

        const preferences = await userService.saveUserPreferences(
            req.user.userId,
            {
                markets,
                stocks: stocks || {}
            }
        );
         console.log('Preferences saved successfully:', preferences);
        return res.status(200).json(preferences);
       
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    register,
    login,
    getPreferences,
    savePreferences
};
