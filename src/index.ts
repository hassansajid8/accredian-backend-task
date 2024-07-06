import express, {Express, Request, response, Response} from "express";
import cors from "cors";
import 'dotenv/config'
import { getReferrals, newReferral, sendMail } from "./actions";

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 4444;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", async (request, response) => {

    try{
        const data = await getReferrals();
        
        if(data == null){
            response.sendStatus(500);
        }

        response.status(200).json(data);
    }catch(e) {
        console.log(e);
    }

    
});

app.post('/new-referral', async (request, response) => {
    let data = null;
    console.log(process.env.SENDER_EMAIL)

    try{
        const referred_by = request.body.referred_by;
        const referred_to = request.body.referred_to;
        const name = request.body.referred_by_name;

        data = await newReferral(referred_by, referred_to, name);

        if(data == null){
            response.sendStatus(500);
        }

        const readableData = JSON.parse(await JSON.stringify(data));
        const info = await sendMail(readableData.referred_to, readableData.referred_by_name);
 
        response.status(200).json(data);
    }catch(e) {
        console.log(e);
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port} 🚀`);
});

