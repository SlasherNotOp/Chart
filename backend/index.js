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


//data is country wise based on intesity, likelihood and relevance
app.get('/country-data', async (req, res) => {
  try {
    // Aggregate data to group by country and calculate average intensity, likelihood, and relevance
    const data = await chartData.aggregate([
      {
        $group: {
          _id: '$country',
          averageIntensity: { $avg: '$intensity' },
          averageLikelihood: { $avg: '$likelihood' },
          averageRelevance: { $avg: '$relevance' },
        },
      },
      {
        $sort: {
          averageIntensity: -1, // Optional: Sort by averageIntensity in descending order
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching country data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//////////////////////////////////////////////////////////////////////////

//for the data based on itensity and year
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



/////////////////////////////////////////////////////////////

//data is based on topics and relevance
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



////////////////////////////////////////////////////////////////


//data bases on region and likelihood
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


















  



  app.get('/testing', async (req, res) => {
    const { endYear, topic, sector, region, pestle, source, swot } = req.query;
  
    try {
      const filterCriteria = {};
      if (endYear) filterCriteria.end_year = endYear;
      if (topic) filterCriteria.topic = topic;
      if (sector) filterCriteria.sector = sector;
      if (region) filterCriteria.region = region;
      if (pestle) filterCriteria.pestle = pestle;
      if (source) filterCriteria.source = source;
      if (swot) filterCriteria.swot = swot;
  
      const data = await chartData.aggregate([
        { $match: filterCriteria },
        {
          $group: {
            _id: "$region",
            averageLikelihood: { $avg: "$likelihood" },
          },
        },
      ]);
  
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });


  


  


const PORT = process.env.PORT || 3000;

const HOST=process.env.HOST|| "127.0.0.1";

app.listen(PORT,HOST, () => {
    console.log(`Server is running on port ${PORT}`);
});
