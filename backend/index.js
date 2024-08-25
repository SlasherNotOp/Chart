import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import chartData from './chartSchema.js';


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/Coffee')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

app.get('/records', (req, res) => {

    chartData.find()
    .then((result)=>{
        res.json(result)
    }).catch((error)=>{
        res.json(error)
    })
  
});

app.get('/get-start-year',(req,res)=>{

    chartData.distinct('start_year')
    .then((result)=>{
        result.pop()
        res.json(result)
    }).catch((err)=>{

        res.json(err)

    })

})

app.get('/get-intensity',(req,res)=>{

    chartData.distinct('intensity')
    .then((result)=>{
        result.pop()

        res.json(result)
    }).catch((err)=>{

        res.json(err)

    })

})

  


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
