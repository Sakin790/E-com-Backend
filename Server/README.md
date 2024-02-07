# E-com-Backend
 E-Com Backend Project 


 
```javaScript
import express from "express";
import morgan from "morgan";

//Middlewares
const app = express();
app.use(morgan("dev"));

const isLoggin = (req, res, next) => {
  const login = false;
  if (login) {
    next();
  } else {
    return res.status(404).send({
      message: "You r not login",
    });
  }
};

//Declear Routes
app.get("/test", (req, res) => {
  res.status(200).send({
    message: `Server is Working is Properly...! `,
  });
});

app.get("/api/profile", isLoggin, (req, res) => {
  res.status(200).send({
    message: `User Profile is Returned...! `,
  });
});
//Declear Server
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server is Running at port ${PORT}`);
});

```