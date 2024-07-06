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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const actions_1 = require("./actions");
const app = (0, express_1.default)();
const port = process.env.PORT ? parseInt(process.env.PORT) : 4444;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, actions_1.getReferrals)();
        if (data == null) {
            response.sendStatus(500);
        }
        response.status(200).json(data);
    }
    catch (e) {
        console.log(e);
    }
}));
app.post('/new-referral', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let data = null;
    console.log(process.env.SENDER_EMAIL);
    try {
        const referred_by = request.body.referred_by;
        const referred_to = request.body.referred_to;
        const name = request.body.referred_by_name;
        data = yield (0, actions_1.newReferral)(referred_by, referred_to, name);
        if (data == null) {
            response.sendStatus(500);
        }
        const readableData = JSON.parse(yield JSON.stringify(data));
        const info = yield (0, actions_1.sendMail)(readableData.referred_to, readableData.referred_by_name);
        response.status(200).json(data);
    }
    catch (e) {
        console.log(e);
    }
}));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port} 🚀`);
});
