// used this: https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express

import {Prisma, PrismaClient} from '@prisma/client'
import express from 'express'
import cors from 'cors'
import multer from 'multer';
import {audioProcess} from '../services/audio.service'
import * as path from "node:path";

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
const whitelist = ['http://localhost:4200']
const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))


const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        // cb(null, Date.now() + path.extname(file.originalname) + '.wav')
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
})

const upload = multer({storage})

app.post(`/audio`, upload.single('file'), async (req, res) => {
    console.log(req.file, req.body)
    const {email} = req.body;
    try {
        // create user if does not exist
        let user = await prisma.user.findFirst({
            where: {email},
        })
        if (!user) {
            user = await prisma.user.create({data: {email}});
        }
        const result = await prisma.audio.create({
            data: {
                User: {connect: user},
            },
        });
        if (req.file) {
            const audio: Express.Multer.File = req.file;
            const audioResult = await audioProcess(audio);
            res.sendFile(audioResult, {root: '.'})
        } else {
            res.send('no file was progressed')
        }
    } catch (err) {
        console.error(err);
    }
})


const server = app.listen(3000, () =>
    console.log(`🚀 Server ready at: http://localhost:3000`),
)
