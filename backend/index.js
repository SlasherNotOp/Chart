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

app.get('/get-likelihood',(req,res)=>{

    chartData.distinct('likelihood')
    .then((result)=>{
        result.pop()

        res.json(result)
    }).catch((err)=>{

        res.json(err)

    })

})

app.get('/get-topic',(req,res)=>{

    chartData.distinct('topic')
    .then((result)=>{
        result.pop()

        res.json(result)
    }).catch((err)=>{

        res.json(err)

    })

})


app.get('/get-country',(req,res)=>{

    chartData.distinct('country')
    .then((result)=>{
        result.pop()

        res.json(result)
    }).catch((err)=>{

        res.json(err)

    })

})


app.get('/get-region',(req,res)=>{

    chartData.distinct('region')
    .then((result)=>{
        result.pop()

        res.json(result)
    }).catch((err)=>{

        res.json(err)

    })

})

app.get('/get-sector',(req,res)=>{

  chartData.distinct('sector')
  .then((result)=>{
      result.pop()

      res.json(result)
  }).catch((err)=>{

      res.json(err)

  })

})




app.get('/year-vs-intensity', async (req, res) => {
    try {
      // Aggregate data by start_year and calculate average intensity
      const data = await chartData.aggregate([
        {
          $group: {
            _id: "$start_year", // Group by start_year
            totalIntensity: { $avg: "$intensity" } // Calculate average intensity
          }
        },
        { 
          $sort: { _id: 1 } // Sort by year (ascending)
        }
      ]);
  
      // Format the response
      const formattedData = data.map(item => ({
        year: item._id,
        intensity: item.totalIntensity
      }));
  
      // Remove the last item from formattedData
      const filteredData = formattedData.slice(0, -1);
  
      res.status(200).json(filteredData);
    } catch (error) {
      console.error('Error fetching Year vs. Intensity data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });


  app.get('/topics-vs-relevance', async (req, res) => {
    try {
      // Aggregate data by topic and calculate average relevance
      const data = await chartData.aggregate([
        {
          $group: {
            _id: "$topic",
            averageRelevance: { $avg: "$relevance" }
          }
        },
        {
          $sort: { averageRelevance: -1 } // Optional: Sort by relevance
        }
      ]);
  
      // Send the data in the desired format
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  app.get('/region-likelihood', async (req, res) => {
    try {
      // Aggregate data to group by region and calculate the average likelihood
      const data = await chartData.aggregate([
        {
          $group: {
            _id: '$region',
            averageLikelihood: { $avg: '$likelihood' },
          },
        },
        {
          $sort: { averageLikelihood: -1 }, // Optional: Sort by likelihood in descending order
        },
      ]);
  
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching region vs. likelihood data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
