const nodemailer = require("nodemailer");


export class Mailer {
    constructor(data){
        this.text = data.text;
        this.email = data.email;
    
    }


    async send(error) {         
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
        
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
            },
        })

        let mailOptions = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: this.email, // list of receivers
            subject: "testing node mailer ✔", // Subject line
            text: this.text, // plain text body
            html: "<b>Hello world?</b>", // html body
        }
        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return error;
            }
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
        
  
}}