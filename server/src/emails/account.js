const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// const msg = {
//   to: 'birth118@naver.com',
//   from: 'seongsoo@gmail.com',
//   subject: 'The fist mail from task app',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: 'seongsoo@gmail.com',
        from: 'birth11@naver.com',
        subject: '웰컴 Thanks for joining in the Task App',
        text: `${name}, \n웰컴 Thanks for joining in the Task App`
    }).then(() => { console.log(`Welcome Email Sent: ${name}`) }, (error) => {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)
        }
    });
}

const sendByeEmail = (email, name) => {
    sgMail.send({
        to: 'seongsoo@gmail.com',
        from: 'birth11@naver.com',
        subject: '빠이 Thanks for using in the Task App',
        text: `빠이 ${name}, Hope we meet agains soon`
    }).then((data) => { console.log(`Bye Email Sent: ${name}`) }, (error) => {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)
        }
    });
}

module.exports = {
    sendWelcomeEmail, sendByeEmail
}