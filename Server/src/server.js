import express from "express";
import morgan from "morgan";



//Middlewares
const app = express();
app.use(morgan("dev"));


//Declear Routes 
app.get("/test", (req, res) => {
    res.status(200).send({
        message: `Server is Working is Properly...! `,
    });
});


//Declear Server 
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server is Running at port ${PORT}`);
});
