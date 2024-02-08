import app from "./app.js";
import 'dotenv/config'
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server is Running at port ${PORT}`);
});
