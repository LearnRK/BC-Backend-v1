const express = require("express");
const mongoose = require("mongoose");
const { DATABASE_URL } = require("./config");
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
// app.use(cors);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("connection failed");
  });

const dataSchema = new mongoose.Schema({
  end_year: Number,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: Number,
  impact: Number,
  added: Date,
  published: Date,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});
const Data = mongoose.model("Data", dataSchema);
module.exports = { Data };

app.get("/", (req, res) => {
  return res.json({ msg: "hello world" });
});

app.get("/intensity", async (req, res) => {
  try {
    const data = await Data.find().sort({ intensity: 12 }).limit(1);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/api/v1/data", async (req, res) => {
  try {
    const data = await Data.find();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/api/v1/linechart", async (req, res) => {
  try {
    const data = await Data.find();

    return res.json(
      data.map((d) => {
        const json = {
          title: d.title,
          intensity: d.intensity,
        };
        return json;
      }),
    );
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/api/v1/linechartdata", async (req, res) => {
  try {
    const data = await Data.find();
    const startYearData = {};
    const endYearData = {};

    // start year json
    data.map((d) => {
      let year = d.start_year;
      console.log(year);
      if (!startYearData[year]) {
        startYearData[year] = 1;
      } else {
        startYearData[year] += 1;
      }
    });

    // end year json
    data.map((d) => {
      let year = d.start_year;
      console.log(year);
      if (!endYearData[year]) {
        endYearData[year] = 1;
      } else {
        endYearData[year] += 1;
      }
    });

    const result = { startYear: startYearData, endYear: endYearData };

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/api/v1/startYear", async (req, res) => {
  try {
    const data = await Data.find();
    const startYearData = {};

    // start year json
    data.map((d) => {
      let year = d.start_year;

      if (year == null) year = 0;

      if (!startYearData[year]) {
        startYearData[year] = 1;
      } else {
        startYearData[year] += 1;
      }
    });

    const result = [];
    for (let x in startYearData) {
      // console.log(JSON.parse(`{"${x}" : "${startYearData[x]}"}`));
      // result.push(JSON.parse(`{"name" : "${x}" , "value" : ${startYearData[x]}}`));
      // console.log(JSON.parse(`{"name" : "${x}" , "value" : ${startYearData[x]}}`));

      if (x != 0) {
        const tempJson = { x: parseInt(x), y: startYearData[x] };
        result.push(tempJson);
      }
    }

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/api/v1/endYear", async (req, res) => {
  try {
    const data = await Data.find();
    const endYearData = {};

    // start year json
    data.map((d) => {
      let year = d.end_year;

      if (year == null) year = "N/A";

      if (!endYearData[year]) {
        if(year > 2050) ;
        else
        endYearData[year] = 1;
      } else {
        endYearData[year] += 1;
      }
    });

    const result = [];
    for (let x in endYearData) {
      // console.log(JSON.parse(`{"${x}" : "${endYearData[x]}"}`));
      // result.push(JSON.parse(`{"${x}" : "${endYearData[x]}"}`));

      if (x != 0) {
        const tempJson = { x: parseInt(x), y: endYearData[x] };
        result.push(tempJson);
      }
    }

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});


app.get("/api/v1/topics", async (req, res) => {
  try {
    const data = await Data.find();
    const topicsData = {};
    
    data.map((d) => {
      //get all topics
      let topic = d.topic;

      //count all topics
      if (!topicsData[topic]) {
        topicsData[topic] = 1;
      } else {
        topicsData[topic] += 1;
      }
    });

    const result = [];
    for (let topic in topicsData) {
      const tempJson = { name: topic, value: topicsData[topic] };
      result.push(tempJson);
    }
    
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});


app.get("/api/v1/sector", async (req, res) => {
  try {
    const data = await Data.find();
    const sectordata = {};

    data.map((d) => {
      //get all sectors
      let sector = d.sector;

      //count all sectors
      if (!sectordata[sector]) {
        sectordata[sector] = 1;
      } else {
        sectordata[sector] += 1;
      }
    });

    const result = [];
    for (let sector in sectordata) {
      const tempJson = { name: sector, value: sectordata[sector] };
      result.push(tempJson);
    }

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});


app.get("/api/v1/intensity", async (req, res) => {
  try {
    const data = await Data.find();
    const result = [];

    data.map((d) => {
      //get all topics
      let intensity = d.intensity;
      let year = d.start_year;

      if(year && intensity){
        const tempJson = { x: year, y: intensity };
        result.push(tempJson);
      }
      
    });


    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});



app.listen(port);
