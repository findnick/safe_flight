// const nodemailer = require('nodemailer');

// const userMail = (response, base_price, accounts, price) => {
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
//         to: `hitmanboy27@gmail.com`,
//         subject: 'Admin Mail',
//         text: `Hi Tomer Levi,

//         Name : ${response.name}

//         Email: ${response.email}

//         Phone: ${response.phone}
    
//         Price: $${base_price}

//         Total Price: $${price}

//         No of Accounts: ${accounts}

//        `
//     };
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             //   res.send('Mail Error: ', error);
//             console.log("Error: ", error);
//         }
//     }
//     );
//     console.log('normal response: ', response);
// }


// module.exports = userMail