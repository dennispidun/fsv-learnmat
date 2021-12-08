import config from 'config';
import nodemailer from "nodemailer";

class MailService {

    public mail(to: string, subject: string, text: string) {
        let transporter = nodemailer.createTransport({
            host: "smtp.uni-hildesheim.de",
            port: 465,
            secure: true,
            requireTLS: false,
            auth: {
                user: config.get('uniUsername'), 
                pass: config.get('uniPassword'),
            },
        });

        transporter.sendMail({
            from: '"Informatik Fachschaft 💻" <fs_winf@uni-hildesheim.de>', // sender address
            // bcc: 'fs_winf@uni-hildesheim.de',
            to,
            subject,
            text
        });
    }
    

}

export default MailService;