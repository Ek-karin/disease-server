// Require
const express = require('express');

// App config
const app = express();
const port = 5000;
const fetch = require("node-fetch");
const cors = require('cors')

// Middlewares
app.use(express.json());
app.use(cors());
app.get('/', async (req,res) => {
    const respone = await fetch('https://disease.sh/v3/covid-19/historical?lastdays=30');
    const data = await respone.json();
    const timeline = [];
    for(let key in data[0].timeline.cases){
        timeline.push(key)
    }
    const ranking = [];
    for(let i = 0; i < timeline.length; i++){
        ranking.push({[timeline[i]]: data.sort((a,b) => b.timeline.cases[timeline[i]] - a.timeline.cases[timeline[i]]).map(e => {return {"country":e.country,"cases":e.timeline.cases[timeline[i]]}}).slice(0,9)});
    }
    console.log(timeline.length);
    for(let i = 0; i < ranking.length ; i++){
        console.log(ranking[i]);
    }
    res.send(ranking);
})

const server = app.listen(port, () => {
    console.log(`URL = https://localhost:${port}/`);
})

// const fetchDisease = async () => {
//     const respone = await fetch('https://disease.sh/v3/covid-19/historical?lastdays=30');
//     const data = await respone.json();
//     const timeline = [];
//     for(let key in data[0].timeline.cases){
//         timeline.push(key)
//     }
//     const ranking = [];
//     for(let i = 0; i < timeline.length; i++){
//         ranking.push({[timeline[i]]: data.sort((a,b) => b.timeline.cases[timeline[i]] - a.timeline.cases[timeline[i]]).map(e => {return {"country":e.country,"cases":e.timeline.cases[timeline[i]]}}).slice(0,9)});
//     }
//     console.log(timeline.length);
//     for(let i = 0; i < ranking.length ; i++){
//         console.log(ranking[i]);
//     }

//     // console.log(data.sort((a,b) => b.timeline.cases[timeline[0]] - a.timeline.cases[timeline[0]]).map(e => {return {"country":e.country,"cases":e.timeline.cases}}).slice(0,9))
//     // const ranking = data.sort((a,b) => a.timeline.cases > b.timeline.cases).map( e => {return { "country": e.country,
//     // "case": e.timeline.cases  }});
//     // console.log(ranking);
// }

//fetchDisease();