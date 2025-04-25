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
    }
}

module.exports = dao