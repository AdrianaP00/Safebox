const nodemailer = require("nodemailer");

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_MAIL = process.env.EMAIL_MAIL;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_MAIL,
    pass: EMAIL_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});

module.exports.sendRegistrationEmail = (user) => {
  transporter
    .sendMail({
      from: "adrianapiccolo00@gmail.com",
      to: user.email,
      subject: `Welcome in Safebox ${user.name}!`,
      html: `
        <h3>Bienvenido a Safebox, tu plataforma para encontrar todo lo que necesitas para tener una vida cómoda</h3>
        <p>Confirma tu mail pulsando el siguiente enlace </p>
        <a href="http://localhost:3000/user/${user._id}/confirm"> Confirmar</a>
        <p> Por favor, pulsa aquí para acceder a la cuenta premium  <button> Premium</button> </p>
        `,
    })
    .then(() => {
      console.log("email sent!");
    })
    .catch((err) => {
      console.error("error sending email, ", err);
    });
};
