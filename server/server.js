import express from 'express';
import cors from 'cors';
import "dotenv/config"
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';



const app = express();
const PORT = process.env.PORT || 3000;

// database connection
await connectDB();


//add the middleware
app.use(express.json());
const allowedOrigins = [
  process.env.FRONTEND_URL,          // Amplify URL (production)
  "http://localhost:5173",           // local frontend
  "http://localhost:3000",           // optional local
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // allow Postman / server-to-server (no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) return callback(null, true);

    return callback(new Error("Not allowed by CORS: " + origin));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  // credentials: true, // ✅ ONLY enable if you use cookies/sessions
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // helps preflight


app.get('/',(req,res)=> res.send('Server is live...'));
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);  
app.use('/api/ai', aiRouter); 

//start express application
app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});