import { readFile } from "fs/promises"
import { parentPort } from "worker_threads"

// for( let i = 0; i < 100000000000 ; i++ ){}
readFile("./ajax/games.csv", "utf-8")
    .then( (data) => parentPort.postMessage(data) )
    .catch( err => parentPort.postMessage(err) )

//https://www.kaggle.com/datasets/fronkongames/steam-games-dataset?resource=download&select=games.csv