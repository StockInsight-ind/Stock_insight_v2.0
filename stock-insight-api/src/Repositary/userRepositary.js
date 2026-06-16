const pool = require('./database_communication');

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
(first_name,last_name,email,password,market)

VALUES($1,$2,$3,$4,$5)

RETURNING id,first_name,last_name,email,market
        `,
        
                [
            user.firstName,
            user.lastName,
            user.email,
            user.password,
            user.market
]
        
    );

    return result.rows[0];
};


const addUserStock = async(userId, stock)=>{

    await pool.query(
        `
        INSERT INTO user_stocks
        (user_id, stock_symbol)
        VALUES($1,$2)
        `,
        [userId, stock]
    );
};

module.exports = {
    findByEmail,
    createUser,
    addUserStock
};