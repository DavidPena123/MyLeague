/*
    Builds the schema, then loads dummy data.
    How to run:
    1. open a terminal in the project directory
    2. run `node db/build_db.js`
*/

const fs = require("node:fs/promises");
const path = require("node:path");
const mysql = require("mysql2/promise");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

async function listFiles(directory, includeJavaScript = false) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    return entries
        .filter((entry) => {
            const extension = path.extname(entry.name).toLowerCase();
            return entry.isFile() && (extension === ".sql" || (includeJavaScript && extension === ".js"));
        })
        .map((entry) => entry.name)
        .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

async function runFiles(directory, files, connection) {
    for (const file of files) {
        const filename = path.join(directory, file);
        console.log(`Running ${path.relative(__dirname, filename)}...`);

        if (path.extname(file).toLowerCase() === ".js") {
            // JavaScript seeds export an async seed(connection) function.
            const { seed } = require(filename);
            if (typeof seed !== "function") {
                throw new Error(`${file} must export a seed(connection) function.`);
            }
            await seed(connection);
        } else {
            const sql = await fs.readFile(filename, "utf8");
            if (sql.trim()) await connection.query(sql);
        }
    }
}

async function buildDatabase() {
    const database = process.env.DB_NAME;
    if (!database || !process.env.DB_HOST || !process.env.DB_USER) {
        throw new Error("Set DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME in the root .env file.");
    }

    const schemaFiles = await listFiles(__dirname);
    if (schemaFiles.length === 0) {
        throw new Error("No SQL files were found in db.");
    }
    const dummyDirectory = path.join(__dirname, "dummy_data");
    const seedFiles = await listFiles(dummyDirectory, true);

    // A single setup connection keeps SQL session variables available to all files.
    // Multiple statements are enabled only for these local schema and seed files.
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true,
    });

    try {
        await connection.query(
            "CREATE DATABASE IF NOT EXISTS ?? CHARACTER SET utf8mb4",
            [database]
        );
        await connection.query("USE ??", [database]);

        await runFiles(__dirname, schemaFiles, connection);
        await runFiles(dummyDirectory, seedFiles, connection);

        console.log(`Database "${database}" built and dummy data seeded successfully.`);
    } finally {
        await connection.end();
    }
}

buildDatabase().catch((error) => {
    console.error("Database build failed:", error.message);
    process.exitCode = 1;
});
