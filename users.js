// users.js (simulated user data)

const users = [
    {
        username: 'testuser',
        password: 'password123'
    },
    {
        username: 'john_doe',
        password: 'johnpassword'
    }
];

// Function to check if a user exists
function findUser(username, password) {
    return users.find(user => user.username === username && user.password === password);
}

// Function to add a new user
function addUser(username, password) {
    users.push({ username, password });
}

export { findUser, addUser };
