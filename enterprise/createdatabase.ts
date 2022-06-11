import connection from './src/models/connection';
import fs from 'fs';

function main() {
    const sql = fs.readFileSync('./database.sql', 'utf-8');

    connection.query(sql);
}

main();
