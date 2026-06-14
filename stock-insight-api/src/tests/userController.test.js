const { register } = require('../Controller/userController');
const userService = require('../Service/userService');

jest.mock('../Service/userService');

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