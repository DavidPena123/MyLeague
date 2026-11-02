/*
    How to run:
    1. open a terminal in the project directory
    2. run `node db/tests/add_test_users.js`
*/

const pool = require("../../db.js");
const { hashPassword } = require("../../utils/Password.js");

const testUsers = [
    {
        firstName: "John",
        lastName: "Doe",
        email: "j2oQb@example.com",
        password: "password@1234",
    },
    {
        firstName: "Mary",
        lastName: "Jane",
        email: "2M6Kq@example.com",
        password: "password@4321",
    },
    {
        firstName: "Bob",
        lastName: "Smith",
        email: "a5wVt@example.com",
        password: "password@ABCD",
    },
    {
        firstName: "Alice",
        lastName: "Johnson",
        email: "5H6p2@example.com",
        password: "idk@bro1234",
    },
    {
        firstName: "Keanu",
        lastName: "Reeves",
        email: "im.keanu.reeves@example.com",
        password: "ok im tired of this!1234",
    },
    {
        firstName: "Avery",
        lastName: "Rivera",
        email: "avery.rivera@example.com",
        password: "TestOnly!Avery2026",
    },
    {
        firstName: "Jordan",
        lastName: "Chen",
        email: "jordan.chen@example.com",
        password: "TestOnly!Jordan2026",
    },
    {
        firstName: "Morgan",
        lastName: "Patel",
        email: "morgan.patel@example.com",
        password: "TestOnly!Morgan2026",
    },
    {
        firstName: "Taylor",
        lastName: "Brooks",
        email: "taylor.brooks@example.com",
        password: "TestOnly!Taylor2026",
    },
    {
        firstName: "Riley",
        lastName: "O'Neil",
        email: "riley.oneil@example.com",
        password: "TestOnly!Riley2026",
    },
    {
        firstName: "Cameron",
        lastName: "Nguyen",
        email: "cameron.nguyen@example.com",
        password: "TestOnly!Cameron2026",
    },
    {
        firstName: "Casey",
        lastName: "Martinez",
        email: "casey.martinez@example.com",
        password: "TestOnly!Casey2026",
    },
    {
        firstName: "Alex",
        lastName: "Williams",
        email: "alex.williams@example.com",
        password: "TestOnly!Alex2026",
    },
    {
        firstName: "Sam",
        lastName: "Thompson",
        email: "sam.thompson@example.com",
        password: "TestOnly!Sam2026",
    },
    {
        firstName: "Jamie",
        lastName: "Garcia",
        email: "jamie.garcia@example.com",
        password: "TestOnly!Jamie2026",
    },
];

async function addTestUsers() {
    for (const user of testUsers) {
        const [existing] = await pool.execute(
            "SELECT 1 FROM `user` WHERE email = ? LIMIT 1",
            [user.email]
        );
        if (existing.length > 0) {
            console.log(`Skipped existing user: ${user.email}`);
            continue;
        }

        const passwordHash = await hashPassword(user.password);
        await pool.execute(
            "INSERT INTO `user` (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)",
            [user.email, passwordHash, user.firstName, user.lastName]
        );
        console.log(`Added test user: ${user.email}`);
    }
}

addTestUsers().catch((error) => {
    console.error("Error adding test users:", error.code || error.name);
})
    .finally(() => pool.end());
