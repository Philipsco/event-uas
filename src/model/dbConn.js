import { createPool } from 'mysql'
const db = createPool({
    host:'localhost',
    user:'root',
    password:'',
    database: 'db_event'
})

export default db