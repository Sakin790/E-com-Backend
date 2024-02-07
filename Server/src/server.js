import express from "express";

const app = express()
const PORT = process.env.PORT || 9090 

app.get('/test', (req,res) => {
    res.status(200).json({
        message: 'Server is Working is Properly...!'
    })
})

app.listen(PORT, () => {
    console.log(`Server is Running at port ${PORT}`);
    
})