import { db } from "./db";
import { transporter } from "./mailer";

export const newReferral = async (referred_by: string, referred_to: string, name: string) => {
    const response = await db.referrals.create({
        data: {
            referred_by: referred_by,
            referred_by_name: name,
            referred_to: referred_to,
        },
    });

    return response;
}

export const getReferrals = async () => {
    const response = await db.referrals.findMany({
        select: {
            referred_by: true,
            referred_to: true,
        }
    });
    return response;
}

export const sendMail = async (referred_to_email: string, referred_by_name: string) => {
    const referralCode = generateCode();

    const subjectString = `Accredian: ${referred_by_name} referred you for a 30% discount!`;
    const bodyString = "Here is your referral code : JJTHMPSN";
    const htmlString = `<h1 style='color:#1A73E8;'>Accredian</h1><h3>Enter this code to get a 30% discount on all our courses: </h3><h3><bold>${referralCode}</body></h3>`;


    try{
        const info = await transporter.sendMail({
            to: referred_to_email,
            subject: subjectString,
            text: bodyString,
            html: htmlString,
        });

        return info;
    }catch(e) {
        console.error(e);
        return;
    }    
}

const generateCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let x = 0; x < 5; x++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}