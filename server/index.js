import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';


dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin:["http://localhost:5173"],
    methods : "POST",
    allowedHeaders: ["Content-Type"]
}
))
app.use(bodyParser.json());


const N8N_WEBHOOK_URL = "https://kadarlaniranjan.app.n8n.cloud/webhook-test/lead-intake";


app.post("/api/leads", async (req, res) => {
  const { name, email, company, message } = req.body;
  if (!name || !email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid input" });
  }
  try {
    await axios.post(N8N_WEBHOOK_URL, {
      name,
      email,
      company,
      message,
    });

    res.status(200).json({ message: "Lead submitted successfully" });
  } catch (error) {
    console.error("n8n error:", error.message);
    res.status(500).json({ error: "Failed to submit lead" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// const connetDatabase = async () => {
//     try{
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("succesfully Database is connected")

//     }catch (error) {
//         console.log("Database",error)
//     }
// }

// connetDatabase().then(()=>{
// app.listen(port, ()=>{
//     console.log(`Server is Running on port ${port}`)
// })
// })