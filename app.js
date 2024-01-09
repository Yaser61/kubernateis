const express = require('express');
const bull = require('bull');
const https = require('https');

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log('Gelen istek:', req.method, req.url);
  next();
});

const myQueue = new bull('myQueue', 'redis://127.0.0.1:6379');

app.get("/", function(req, res) {
  const url = "https://data.ibb.gov.tr/tr/api/3/action/datastore_search?resource_id=f4a205d7-39fd-4900-b7e7-d4a11c0b076d&limit=5";

  https.get(url, function(response) {
    let data = '';

    response.on('data', function(chunk) {
      data += chunk;
    });

    response.on('end', function() {
      res.send("<h1>CEVAP</h1>");
      console.log(data);
    });
  }).on('error', function(error) {
    console.log('Hata:', error);
  });
});

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
