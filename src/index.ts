import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 5050
const app = express()

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ status: 'API is running on /api' });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

export default app