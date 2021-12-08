import config from 'config';
import * as okhttp from "okhttp";
import * as cheerio from 'cheerio';

const RequestBuilder = okhttp.RequestBuilder;

class PwaService {

    cookie: String;

    public async login() {
        const data = await new RequestBuilder()
                .url(`https://pwa.uni-hildesheim.de/AuthServlet?uid=${config.get('uniUsername')}&userPassword=${encodeURIComponent(config.get('uniPassword'))}`)
                .POST({})
                .buildAndExecute();
        this.cookie = data.response.headers['set-cookie'][0];
        console.log("session-cookie: ", this.cookie);
    }

    public async search(alias: String) {
        if (!this.cookie || this.cookie === "") {
            await this.login();
        }

        const url = `https://pwa.uni-hildesheim.de/personal/search/userOverview.jsp?dn=uid%3D${alias}%2Cou%3DPeople%2Cdc%3Duni-hildesheim%2Cdc%3Dde`;
        const data = await new RequestBuilder()
            .url(url)
            .header('Cookie', this.cookie)
            .POST({})
            .textResponse()
            .buildAndExecute();
            
        let body: string = data.data;
        let $ = cheerio.load(body);
        let person = {
        }
        
        for(let i = 2; i <= 14; i++) {
            let header = $('body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table.pageTable > tbody > tr > td.page > div > table > tbody > tr > td > table > tbody > tr:nth-child('+i+') > td.formHeader').text().trim();
            let data = $('body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table.pageTable > tbody > tr > td.page > div > table > tbody > tr > td > table > tbody > tr:nth-child('+i+') > td.formData').text().trim();
            
            header = header.toLocaleLowerCase();
            header = header.split("/")[0].trim();
            header = header.replace("geb�ude", "raum")
                .replace("akademischer grad", "akademischerGrad")
                .replace("e-mail", "eMail")
                .replace("externe einrichtung", "externeEinrichtung");
            data = data.replace(/(?:\r\n|\r|\n|\s{3,})/g, '/').trim();
            person[header] = data;
        }
        
        console.log(JSON.parse(JSON.stringify(person)));
    }



}

export default PwaService;