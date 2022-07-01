import express, { json } from 'express'
import pkg from 'body-parser'
const { urlencoded } = pkg
import cors from 'cors'
const app = express()
import db from './model/dbConn.js'
import { nanoid } from 'nanoid'

app.use(cors())
app.use(json())
app.use(urlencoded({ extended:true}))

// get data
app.get('/api/event', (req,res) => {
    const sqlQuery = "SELECT * FROM tbl_pengunjung"

    db.query(sqlQuery,(err,result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/api/event/:no_kartu_pengunjung', (req,res) => {
    const noKartuPengunjung = req.params.no_kartu_pengunjung
    const sqlQuery = "SELECT * FROM tbl_pengunjung WHERE no_kartu_pengunjung = ?"

    db.query(sqlQuery, noKartuPengunjung, (err,result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/api/event',(req,res) => {
    const id = nanoid(5)
    const noKartu = nanoid(5)
    const nama = req.body.nama
    const jenisKelamin = req.body.jenis_kelamin
    const waktuMasuk = req.body.waktu_masuk
    const waktuKeluar = req.body.waktu_keluar

    const sqlQuery = "INSERT INTO tbl_pengunjung (id,no_kartu_pengunjung,nama,jenis_kelamin,waktu_masuk,waktu_keluar) VALUES (?,?,?,?,?,?)"
    db.query(sqlQuery, [id,noKartu,nama,jenisKelamin,waktuMasuk,waktuKeluar], (err,result) =>{
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

//update data
app.put('/api/event', (req,res) => {
    const noKartu = req.body.no_kartu_pengunjung
    const waktuKeluar = req.body.waktu_keluar
    const sqlQuery = "UPDATE tbl_pengunjung SET waktu_keluar = ? WHERE no_kartu_pengunjung = ?"
    db.query(sqlQuery,[waktuKeluar,noKartu], (err,result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

//delete
app.delete('/api/event', (req,res) => {
    const userId = req.body.id
    const sqlQuery = "DELETE FROM tbl_pengunjung WHERE id = ?"
    db.query(sqlQuery,userId, (err,result) =>{
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(5000, () => {
    console.log('api berjalan')
})