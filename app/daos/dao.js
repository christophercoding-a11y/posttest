const con = require('../config/dbconfig')

const dao = {
    table: 'user',

    findAll: (res, table)=> {
        con.execute(
            `select * from ${table};`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('DAO Error: ', error)
                }
            }
        )
    },

    findById: (res, table, id)=> {
        con.execute(
            `select * from ${table} where ${table}_id = ${id}`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('DAO Error: ', error)
                }
            }
        )
    },
    create: (req, res, table)=> {
        // console.log(req.body)
        // if there no keys in the object...
        if (Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "No fields to create"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.execute(
                `insert into ${table} set ${fields.join(' = ?, ')} = ?;`,
                values,
                (error, dbres)=> {
                    if(!error) {
                        res.json({
                            Last_id: dbres.insertId
                        })
                    } else {
                        console.log('Dao Error (error posting): ', error)
                    }
                }
            )
        }
    },

    update: (req, res, table, userId)=> {
        // if is not a number => id or userId
        if(isNaN(userId)) {
            res.json({
                "error": true,
                "message": "Id must be a number"
            })
        } else if (Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "No fields to update"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.execute(
                // STRING, ARRAY, CALLBACK FUNCTION
                `UPDATE ${table} SET ${fields.join(' = ?, ')} = ? WHERE user_id = ?;`,

                [...values, userId],
                (error, dbres)=> {
                    if(!error) {
                        res.send(`Changed ${dbres.changedRows} rows(s)`)
                    } else {
                        console.log('Dao Error:', error)
                        res.send('Error updating record')
                    }
                }
            )
        }
    }
}

module.exports = dao