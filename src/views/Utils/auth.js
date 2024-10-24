const bcrypt = require('bcrypt');

// Function to hash a password
const hashPassword = async (password) => {
    const saltRounds = 10; // You can adjust this value for security
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// Function to verify a password
const verifyPassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
};

// Example usage
(async () => {
    const password = 'sems123!Fan';
    
    // Hash the password
    const hashed = await hashPassword(password);
    console.log('Hashed Password:', hashed);

    // Verify the password
    const isMatch = await verifyPassword(password, hashed);
    console.log('Password Match:', isMatch);
})();
