const express = require('express');
const bull = require('bull');

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log('Gelen istek:', req.method, req.url);
  next();
});

const myQueue = new bull('myQueue', 'redis://127.0.0.1:6379');

app.get("/", async (req, res) => {
  console.log('Get İsteği Geldi');
  res.send("<h1>Sabit Cevap</h1>"); // Sabit bir cevap dönüyor
  // İşi kuyruğa ekle
  await myQueue.add({
    method: req.method,
    url: req.url,
  });

  // İşi kuyruktan al ve işle
  const job = await myQueue.take();
  const jobData = job.data;

  console.log('Kuyruktan iş alındı ve işleniyor:', jobData);
  return 'İşlem tamamlandı!';
});

app.post('/api/queue-job', async (req, res) => {
  console.log('kuyruk isteği geldi');
  const jobData = req.body.jobData;

  try {
    // Kuyruğa işi ekle
    await myQueue.add(jobData);
    res.status(200).send('İş kuyruğa eklendi!');
  } catch (error) {
    res.status(500).send('İş kuyruğa eklenirken hata oluştu.');
  }
});

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
