import express from 'express';
import http from 'http';

const app = express()
app.use(express.json())
mongoose.connect(`${"mongodb+srv://rohitkumar10701:1234567890@cluster0.cvnjmbj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});




server.listen(3002, () => {
  console.log('Listening on *:3002');
});
