"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.getReferrals = exports.newReferral = void 0;
const db_1 = require("./db");
const mailer_1 = require("./mailer");
const newReferral = (referred_by, referred_to, name) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.db.referrals.create({
        data: {
            referred_by: referred_by,
            referred_by_name: name,
            referred_to: referred_to,
        },
    });
    return response;
});
exports.newReferral = newReferral;
const getReferrals = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.db.referrals.findMany({
        select: {
            referred_by: true,
            referred_to: true,
        }
    });
    return response;
});
exports.getReferrals = getReferrals;
const sendMail = (referred_to_email, referred_by_name) => __awaiter(void 0, void 0, void 0, function* () {
    const referralCode = generateCode();
    const subjectString = `Accredian: ${referred_by_name} referred you for a 30% discount!`;
    const bodyString = "Here is your referral code : JJTHMPSN";
    const htmlString = `<h1 style='color:#1A73E8;'>Accredian</h1><h3>Enter this code to get a 30% discount on all our courses: </h3><h3><bold>${referralCode}</body></h3>`;
    try {
        const info = yield mailer_1.transporter.sendMail({
            to: referred_to_email,
            subject: subjectString,
            text: bodyString,
            html: htmlString,
        });
        return info;
    }
    catch (e) {
        console.error(e);
        return;
    }
});
exports.sendMail = sendMail;
const generateCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let x = 0; x < 5; x++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
