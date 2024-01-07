const Queue = require('bull');

// Redis ile kuyruğu oluşturun
const myQueue = new Queue('myQueue', 'redis://127.0.0.1:6379');

// İş kuyruğa ekleme
const jobData = { /* iş verileri */ };
const jobOptions = { /* iş seçenekleri */ };

myQueue.add(jobData, jobOptions);

// Kuyruktan işi alma ve çalıştırma
myQueue.process((job) => {
  // İş mantığı burada
  console.log('İş çalıştırıldı:', job.data);
});
