
const express = require("express")
const fs = require('fs');
const app = express()
const port = 8080
const cors = require("cors");
const { type } = require("os");


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get("/", async (req, res) => {
    res.send("working")
})

app.get('/atrists', (req, res) => {
    fs.readFile('data-songs.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const jsonData = JSON.parse(data)
            res.send(jsonData);
        }
    })
});

app.get('/songs/:id', (req, res) => {
    const songId = req.params.id
    fs.readFile('data-songs.json', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        } else {
            const jsonData = JSON.parse(data)
            for (let i = 0; i < jsonData.length; i++) {
                const artist = jsonData[i];
                const song = artist.songs.find((obj) => obj.id == songId)
                if (song == null){
                    return res.status(200).send("the song is not exist ")
                }
                 return res.send(song);
                }
            }
            return res.status(200).send("there song is not exist ")

        })
    })
    app.post('/atrists/', (req, res) =>{
        const atrist = {
            "artist": "Noa Kirel",
            "songs": [
                {
                    "id": "66",
                    "title": "unikorn",
                    "duration": "3:58",
                    "releaseYear": "2023"
                }
        
            ]
        }
        push(atrist)
        return res.send(atrist)

        });
        
    
    


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})