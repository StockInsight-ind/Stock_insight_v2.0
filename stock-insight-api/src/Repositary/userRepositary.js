const { pool } = require('./database_communication');

const findByEmail = async(email)=>{

    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    return result.rows[0];
};

const createUser = async(user)=>{

    const result = await pool.query(
        `
       INSERT INTO users
(first_name,last_name,email,password)

VALUES($1,$2,$3,$4)

RETURNING id,first_name,last_name,email
        `,
        [
            user.firstName,
            user.lastName,
            user.email,
            user.password
        ]
    );

    return result.rows[0];
};


module.exports = {
    findByEmail,
    createUser
};