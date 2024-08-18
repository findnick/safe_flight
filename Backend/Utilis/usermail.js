// const nodemailer = require('nodemailer');

// const userMail = (response) => {
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: 'kickart11@gmail.com',
//             pass: 'iccj tbvg xzlg xckt'
//         }
//     });

//     const mailOptions = {
//         from: 'kickart11@gmail.com',
//         // to: `${user.email}`,
//         to: `${response.email}`,
//         subject: 'Normal User Mail',
//         text: `Hi ${response.name},



//         It's great to have you on board. I'm happy to guide you through our onboarding process.. To streamline our launch and ensure we're aligned every step of the way, I have outlined the steps for our onboarding journey below:



//         Onboarding Checklist:



//         ✅ 1. Complete the Onboarding Form:



//         This is our first step towards understanding your business. It will give us an overview of everything to optimize your LinkedIn Accounts



//         Onboarding Form- the link is this https://form.typeform.com/to/DJiyzB5W



//         ✅ 2. Join Our Slack Channel:



//         To foster seamless communication, we'll be using Slack. Here, we'll go ahead and answer any questions you have and help you scale your LinkedIn automation campaigns. You will receive an invitation shortly after completing your onboarding form.



//         ✅ 3. Receive accounts:



//         Once you join our Slack channel, within 48 hours your accounts will be completely optimized.



//         Should any questions arise or if you require any assistance, don’t hesitate to send a message. we want to make sure you feel supported every step of the way.



//         Best Regards
//         Tomer Levi,
//         CEO@linkedinaccounts
//         `
//     };
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             //   res.send('Mail Error: ', error);
//             console.log("Error: ", error);
//         }
//     }
//     );

//     console.log(response);
// }


// module.exports = userMail