const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chalk = require('chalk');
const app = express()

mongoose.connect( 'mongodb://localhost:27017/stack-overflow', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log(chalk.blue('Database Connected'));
}).catch( (err) => {
    console.log(chalk.red('Database Not Connected' + err));
});
app.get('/', (req, res) => {
    res.send('Hello Stack-overflow')
})

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/question", require("./routes/questions"));
app.use("/api/answer", require("./routes/answers"));


if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(chalk.yellow(`Server running at http://localhost:${port}`));
});