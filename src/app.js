import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/admin.routes.js';



const app = express();

app.use(
    cors({
        origin: [
      "http://localhost:5173",
      "https://bio-lab-6ifn.vercel.app",
    ],
        credentials: true
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser())


app.use("/api/v1/users", userRoute);

export { app };