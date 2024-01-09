const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "kalkanyaser@gmail.com",
    pass: "lsik zzkg phns jscy"
  }
});

const mailOptions = {
  from: "Node ile gönderilen mail",
  to: "rabiayilmazqwe@gmail.com",
  subject: "Node.js ile SMTP Mail Gönderme",
  text: "Node.js ve Nodemailer kullanarak SMTP üzerinden mail gönderimi hakkında bilgi edindiniz."
};

transporter.sendMail(mailOptions, function(err, info) {
  if(err) {
    console.log(err);
  } else {
    console.log("E-posta gönderildi: " + info.response);
  }
});
