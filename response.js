fetch('http://localhost:3000/api/queue-job', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    jobData: { /* iş verileri */ }
  }),
})
  .then(response => {
    if (response.ok) {
      return response.text();
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    console.log('Sunucudan gelen yanıt:', data);
  })
  .catch(error => {
    console.error('İstek hatası:', error);
  });
