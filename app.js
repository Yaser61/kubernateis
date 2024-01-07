const express = require('express');
const bull = require('bull');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redis ile kuyruğu oluşturun
const myQueue = new bull('myQueue', 'redis://127.0.0.1:6379');

// Kullanıcı isteğini alıp kuyruğa iş ekleme
app.post('/api/queue-job', async (req, res) => {
  const jobData = req.body.jobData;

  try {
    // Kuyruğa işi ekle
    await myQueue.add(jobData);
    res.send('İş kuyruğa eklendi!');
  } catch (error) {
    res.status(500).send('İş kuyruğa eklenirken hata oluştu.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
