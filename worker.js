const bull = require('bull');

// Redis ile kuyruğu oluşturun
const myQueue = new bull('myQueue', 'redis://127.0.0.1:6379');

// Kuyruktan işi alma ve işleme fonksiyonu
myQueue.process(async (job) => {
  // İş mantığı burada
  console.log('İş çalıştırıldı:', job.data);
  // Burada işlemi gerçekleştir, gerekli işlemleri yap
});