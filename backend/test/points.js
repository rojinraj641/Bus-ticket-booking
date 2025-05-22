import {points} from "../models/points.models.js";

async function addPoints(){
    const newPoint = new points({
        busId: 'bus001',
        stoppingPoints: [
            {
                name: 'Kottarakkara',
                timeToNext: 10
            },
            {
                name: 'Kizhakketheruvu',
                timeToNext: 5,
            },
            {
                name: 'Chengamanadu',
                timeToNext: 10
            },
            {
                name: 'Kunnicode',
                timeToNext: 15
            },
            {
                name: 'Elampal',
                timeToNext: 10
            },
            {
                name: 'Punalur',
                timeToNext: 0
            }
        ]
    })
}