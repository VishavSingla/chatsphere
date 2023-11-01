const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnect = require('./dbConnect');
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const postsRouter = require('./routers/postsRouter');

dotenv.config('./.env');
const corsOptions ={
    origin:[process.env.ORIGIN_URL], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan('common')); //print which api is hit
app.use(cookieParser());    
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);


app.get('/', (req, res) => {
    res.status(200).send('ok');
});
const PORT = process.env.PORT || 4000;

dbConnect();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

