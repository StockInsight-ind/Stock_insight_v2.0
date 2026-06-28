jest.mock('../Service/userService');

const {
    register,
    login,
    getPreferences,
    savePreferences
} = require('../Controller/UserController');
const userService = require('../Service/userService');

describe('User Controller - Register', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.clearAllMocks();
    });

    test('should return 400 when required fields are missing', async () => {
        req.body = {
            firstName: 'John',
            email: 'john@example.com'
        };

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All fields required'
        });
    });

    test('should register user successfully and return 201', async () => {
        const mockUser = {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com'
        };

        req.body = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'password123'
        };

        userService.registerUser.mockResolvedValue(mockUser);

        await register(req, res);

        expect(userService.registerUser).toHaveBeenCalledWith({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'password123'
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('should return 400 when service throws an error', async () => {
        req.body = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'password123'
        };

        userService.registerUser.mockRejectedValue(
            new Error('Email already exists')
        );

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Email already exists'
        });
    });
});

describe('User Controller - Login', () => {
    let req;
    let res;

    beforeEach(() => {
        req = { body: {} };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.clearAllMocks();
    });

    test('should return 400 when email or password is missing', async () => {
        req.body = {
            email: 'john@example.com'
        };

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Email and password are required'
        });
    });

    test('should login successfully', async () => {
        const loginResponse = {
            token: 'jwt-token',
            user: {
                id: 1,
                email: 'john@example.com',
                onboarding_completed: false
            }
        };

        req.body = {
            email: 'john@example.com',
            password: 'password123'
        };

        userService.loginUser.mockResolvedValue(loginResponse);

        await login(req, res);

        expect(userService.loginUser).toHaveBeenCalledWith(
            'john@example.com',
            'password123'
        );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(loginResponse);
    });

    test('should return 400 when login fails', async () => {
        req.body = {
            email: 'john@example.com',
            password: 'wrong-password'
        };

        userService.loginUser.mockRejectedValue(
            new Error('Invalid credentials')
        );

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Invalid credentials'
            })
        );
    });
});

describe('User Controller - Preferences', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {},
            user: {
                userId: 45
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.clearAllMocks();
    });

    test('should return saved preferences for the authenticated user', async () => {
        const mockPreferences = {
            user: {
                id: 45,
                onboarding_completed: true
            },
            markets: ['usa', 'india'],
            stocks: {
                usa: ['TSLA', 'AAPL'],
                india: ['TCS']
            }
        };

        userService.getUserPreferences.mockResolvedValue(mockPreferences);

        await getPreferences(req, res);

        expect(userService.getUserPreferences).toHaveBeenCalledWith(45);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockPreferences);
    });

    test('should save preferences and return updated data', async () => {
        const mockPreferences = {
            user: {
                id: 45,
                onboarding_completed: true
            },
            markets: ['usa'],
            stocks: {
                usa: ['TSLA']
            }
        };

        req.body = {
            markets: ['usa'],
            stocks: {
                usa: ['TSLA']
            }
        };

        userService.saveUserPreferences.mockResolvedValue(mockPreferences);

        await savePreferences(req, res);

        expect(userService.saveUserPreferences).toHaveBeenCalledWith(45, {
            markets: ['usa'],
            stocks: {
                usa: ['TSLA']
            }
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockPreferences);
    });

    test('should reject preference save without markets', async () => {
        req.body = {
            stocks: {
                usa: ['TSLA']
            }
        };

        await savePreferences(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'At least one market is required'
        });
    });
});
