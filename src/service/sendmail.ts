const nodemailer = require('nodemailer');
const emailPassword = process.env.EMAIL_APP_PASSWORD

async function sendEmail({ to, subject, text }: { to: string, subject: string, text: string }) {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "duduborges333969@gmail.com",
            pass: 'lgkfovnszjqkanlc'
        },
    });


    let info = await transporter.sendMail({
        from: '"Equipe Infointelligence" <duduborges333969@gmail.com>',
        to: to,
        subject: subject,
        text: text,
    });

    console.log("Message sent: %s", info.messageId);
}

export { sendEmail };
