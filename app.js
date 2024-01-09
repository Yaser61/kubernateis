const express = require('express');
const bull = require('bull');

const app = express();
const port = 3000;

app.use(express.json());

const myQueue = new bull('myQueue', 'redis://127.0.0.1:6379');

app.post('/api/queue-job', async (req, res) => {
  const jobData = req.body.jobData;

  try {
    // Kuyruğa işi ekle
    await myQueue.add(jobData);
    res.status(200).send('İş kuyruğa eklendi!');
  } catch (error) {
    res.status(500).send('İş kuyruğa eklenirken hata oluştu.');
  }
});

// Kuyruktan işi alma ve çalıştırma
myQueue.process(async (job) => {
  const jobData = job.data;

  try {
    console.log('Kuyruktan iş alındı ve işleniyor:', jobData);
    return 'İşlem tamamlandı!';
  } catch (error) {
    throw new Error('İşlem sırasında hata oluştu: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
