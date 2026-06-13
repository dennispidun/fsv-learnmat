import config from 'config';
import nodemailer from "nodemailer";

class MailService {

    public mail(to: string, subject: string, text: string) {
        try {
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
            from: `"Informatik Fachschaft 💻" <${config.get('uniMail')}>`,
            // bcc: 'fs_winf@uni-hildesheim.de',
            to,
            subject,
            text
        });
        
        } catch (e) {
            console.error("Error while sending mail: " + e);
        }

    }
    

}

export default MailService;