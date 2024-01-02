const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5001;
app.use(cors());
// Connect to MongoDB (make sure your MongoDB server is running)
mongoose.connect("mongodb+srv://Daman:Ghattu12@cluster0.xtzogzt.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for your data (e.g., Number model)
const numberSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
});

const NumberModel = mongoose.model("Number", numberSchema);

app.use(bodyParser.json());

// Handle post request
app.post("/check-number", async (req, res) => {
  const { number } = req.body;

  try {
    const result = await NumberModel.findOne({ value: number });

    if (result) {
      return res.json({
        success: true,
        expiryDate: result.expiryDate,
        validity: "Valid",
      });
    } else {
      return res.json({ success: false, message: "Number not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
