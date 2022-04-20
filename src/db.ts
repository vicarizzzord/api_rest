import { Pool } from "pg";


const connectionString ='postgres://chemmzys:rb2mAGf58YbXbBUWYajICQrAZpach6hm@kesavan.db.elephantsql.com/chemmzys';

const db =new Pool({connectionString});

export default db;