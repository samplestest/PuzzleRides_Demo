const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const TokenManager = require("../Lib/TokenManager");
const mongoose = require("mongoose");
const Model = require("../Models");
const CodeGenerator = require("../Lib/CodeGenerator");
const emailFunction = require("../Lib/email");
let generator = require('generate-password');
const accountSid = "ACb1d6c1b0a730343b0569889e7bcfcf8d";
const authToken = "c7c9e7104153e28047ba9c3a386286e2";
const client = require("twilio")(accountSid, authToken);


const SERVICE_PLAN_ID = '1569eb908b80450d890beafebd00facd';
const API_TOKEN = 'f10b38256c03480d946aea8e2cdec385';
const SINCH_NUMBER = '+447520652619';
const TO_NUMBER = '+917490085015';

const fetch = require('node-fetch');

const fetches = require('cross-fetch');

//admin register
async function adminRegister(payloadData) {
    try {
        // if (await Service.findOne(Model.Users, { email: payloadData.email })) {
        //     return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EMAIL_ALREADY_EXISTS);
        // }
        if (await Service.findOne(Model.Admin, { email: payloadData.email })) {
            return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EMAIL_ALREADY_EXISTS);
        }
        const password = await UniversalFunctions.CryptData(payloadData.password)
        payloadData.password = password
        payloadData.role = 'ADMIN'
        let admin = await Service.saveData(Model.Admin, payloadData)
        if (!admin) {
            return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
        }
        admin = JSON.parse(JSON.stringify(admin));
        delete admin.password
        delete admin.confirmpassword

        return admin
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//admin login
async function adminLogin(payloadData) {
    try {
        let admin = await Service.findOne(Model.Admin, { email: payloadData.email })
        if (!admin) {
            return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.ADMIN_NOT_EXISTS);
        }
        if (admin.isBlocked) {
            return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.BLOCKED);
        }
        const validate = await UniversalFunctions.comparePassword(payloadData.password.toString(), admin.password);
        if (!validate) {
            return Promise.reject(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_PASSWORD);
        }
        tokenData = await TokenManager.setToken(
            {
                _id: admin._id,
                type: Config.APP_CONSTANTS.DATABASE.USER_TYPE.ADMIN,
            },
        );
        admin.accessToken = tokenData.accessToken;
        admin = JSON.parse(JSON.stringify(admin));
        delete admin.password
        return admin
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

async function forgotPassword(payloadData) {
    try {
        let criteria = false;
        if (payloadData.email) {
            criteria = { email: payloadData.email };
        }
        let user = await Service.findOne(Model.Admin, criteria, {}, { lean: true });
        if (!user)
            return Promise.reject(
                Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_PHONE_EMAIL
            );

        const verificationCode = await CodeGenerator.generateCode(6, "numeric");
        let otpData = {
            code: verificationCode,
            type: Config.APP_CONSTANTS.DATABASE.OTP_TYPE.FORGOT_PASSWORD,
        };
        if (payloadData.email) {
            otpData.email = payloadData.email;
            const body = Config.APP_CONSTANTS.SERVER.otpEmail.body.replace(
                "{otp}",
                verificationCode
            );
            let email = emailFunction.sendEmail(
                payloadData.email,
                Config.APP_CONSTANTS.SERVER.otpEmail.subject,
                body,
                []
            );
        }

        const data = await Service.findAndUpdate(
            Model.OtpCodes,
            { email: payloadData.email },
            { $set: { ...otpData } },
            { upsert: true }
        );

        return {
            statusCode: 200,
            customMessage: "OTP Sent on Email",
            type: "OTP_SENT_ON_EMAIL",
        };
    }
    catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

async function verifyOTP(payloadData) {
    try {
        const { code, email } = payloadData;
        const data = await Service.findOne(Model.OtpCodes, {
            email: email,
            code: code,
            status: 1,
            type: Config.APP_CONSTANTS.DATABASE.OTP_TYPE.FORGOT_PASSWORD,
        });
        if (!data) return { valid: false };
        return { valid: true };
    }
    catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}


//admin change password
async function changePassword(payloadData) {
    try {
        const {
            STATUS_MSG: {
                SUCCESS: { UPDATED },
                ERROR: { IMP_ERROR, INVALID_OTP },
            },
            DATABASE: {
                USER_TYPE: { ADMIN },
                OTP_TYPE: { FORGOT_PASSWORD },
            },
        } = Config.APP_CONSTANTS;
        const { email, code, password } = payloadData;

        let otpObj = await Service.findAndUpdate(
            Model.OtpCodes,
            { email: email, code: code, status: 1, type: FORGOT_PASSWORD },
            { lean: true }
        );
        if (!otpObj) return Promise.reject(INVALID_OTP);
        const user = await Service.findAndUpdate(
            Model.Admin,
            { email: email, role: ADMIN },
            {
                $set: {
                    password: await UniversalFunctions.CryptData(password),
                },
            },
            { lean: true, new: true }
        );
        if (user) {
            const tokenData = await TokenManager.setToken({
                _id: user._id,
                type: ADMIN,
            });
            return UPDATED;
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

// profile update
async function profileUpdate(payloadData, userData) {
    try {
        if (await Service.findOne(Model.Admin, { email: payloadData.email, _id: { $ne: userData._id } })) {
            return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EMAIL_ALREADY_EXISTS);
        }
        if (await Service.findOne(Model.Admin, { mobile: payloadData.mobile, _id: { $ne: userData._id } })) {
            return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.PHONE_ALREADY_EXIST);
        }
        payloadData.password = await UniversalFunctions.CryptData(payloadData.password)
        const update = await Service.findAndUpdate(Model.Admin, { _id: userData._id }, payloadData)
        if (!update) {
            return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
        }
        return Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.UPDATED;
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//addEdit Subadmin
async function addEditSubAdmin(payloadData, userData) {
    try {
        let tokenData = null;
        payloadData.role = "SUBADMIN";
        payloadData.addedBy = userData._id;
        if (payloadData.subAdminId) {
            let data = await Service.findAndUpdate(
                Model.Admin,
                { _id: payloadData.subAdminId },
                payloadData
            );
            delete data.password;
            tokenData = await TokenManager.setToken({
                _id: data._id,
                type: Config.APP_CONSTANTS.DATABASE.USER_TYPE.ADMIN,
            });

            if (data !== null) return Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.UPDATED;
            else return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST);
        } else {
            if (await Service.findOne(Model.Admin, { email: payloadData.email }))
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EXIST);
            let password = await generatePassword()
            payloadData.password = await UniversalFunctions.CryptData(password)
            let data = await Service.saveData(Model.Admin, payloadData);
            const body = `<b>Welcome, ${payloadData.fullName}</b><p>Here's your login information:  </p>
            <p><b>email: </b>${payloadData.email}</p>
            <p><b>password: </b>${password}</p>`
            emailFunction.sendEmail(
                payloadData.email,
                Config.APP_CONSTANTS.SERVER.Login.subject,
                body,
                []
            );
            if (data !== null) return Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.CREATED;
            else return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.DB_ERROR);
        }
    }
    catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}


async function generatePassword() {
    let password = generator.generate({
        length: 8,
        numbers: true
    });
    return password
}

//fetchSubadmin
async function fetchSubadmin(queryData) {
    try {
        const { skip = undefined, limit = undefined, search, isBlocked = undefined, invite = undefined } = queryData;
        let query = { isDeleted: false, role: "SUBADMIN", isBlocked: false }
        if (typeof isBlocked !== "undefined")
            query.isBlocked = isBlocked;
        if (typeof invite !== "undefined")
            query.invite = invite;
        let projection = { isDeleted: 0, password: 0, accessToken: 0, __v: 0 }
        let options = { sort: { _id: -1 } };
        if (typeof skip !== "undefined" && typeof limit !== "undefined")
            options = { skip: skip, limit: limit, sort: { _id: -1 } };
        if (search)
            query.fullName = new RegExp(search, "ig");
        let data = await Service.getData(Model.Admin, query, projection, options)
        let total = await Service.count(Model.Admin, query)
        return {
            subAdminData: data,
            total: total
        }
    }
    catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}


//block subadmin
async function subAdminStatusChangeBlock(paramsData) {
    try {
        let find = await Service.findOne(Model.Admin, { _id: paramsData.subAdminId })
        if (!find)
            return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
        let isBlocked
        if (find.isBlocked)
            isBlocked = false
        else
            isBlocked = true
        let data = await Service.findAndUpdate(Model.Admin, { _id: paramsData.subAdminId }, { isBlocked: isBlocked }, { lean: true, new: true })
        if (!data)
            return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
        if (isBlocked)
            return Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.SUBADMIN_BLOCK;
        else
            return Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.SUBADMIN_UNBLOCK;

    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//password change subadmin
async function subAdminchangePassword(payloadData, userData) {
    try {
        const {
            STATUS_MSG: {
                SUCCESS: { UPDATED },
                ERROR: { IMP_ERROR, INVALID_OTP },
            },
            DATABASE: {
                USER_TYPE: { ADMIN },
                OTP_TYPE: { ADMIN_VERIFICATION },
            },
        } = Config.APP_CONSTANTS;
        const { password } = payloadData;
        const user = await Service.findAndUpdate(
            Model.Admin,
            { _id: userData._id, role: "SUBADMIN" },
            {
                $set: {
                    password: await UniversalFunctions.CryptData(password),
                    invite: true
                },
            },
            { lean: true, new: true }
        );
        if (user) {
            const tokenData = await TokenManager.setToken({
                _id: user._id,
                type: ADMIN,
            });
            return UPDATED;
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//fetch admin
async function fetchadmin(queryData, userData) {
    try {
        const { skip = undefined, limit = undefined, search, addedBy } = queryData;
        let query = { isDeleted: false, role: "ADMIN", _id: userData._id }

        let projection = { isDeleted: 0, password: 0, accessToken: 0, __v: 0 }
        let options = { sort: { _id: -1 } };
        if (typeof skip !== "undefined" && typeof limit !== "undefined")
            options = { skip: skip, limit: limit, sort: { _id: -1 } };
        if (search)
            query.name = new RegExp(search, "ig");
        let data = await Service.getData(Model.Admin, query, projection, options)
        let total = await Service.count(Model.Admin, query)
        return {
            adminData: data,
            total: total
        }
    }
    catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//SMS Sending
async function addEditSMS(payloadData, userData) {
    try {

        // //Twilio Example
        // client.messages
        //     .create({
        //         body: "SMS Send",
        //         from: "+917285005228",
        //         to: "+919925490509"
        //     })
        //     .then((data) => {
        //         res.status(200).send(data);
        //     })
        //     .catch((err) => {
        //         console.log("phone:", err);
        //     })
        // console.log("client:");


        async function run() {
            const resp = await fetch(
                'https://us.sms.api.sinch.com/xms/v1/' + SERVICE_PLAN_ID + '/batches',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + API_TOKEN
                    },
                    body: JSON.stringify({
                        from: SINCH_NUMBER,
                        to: [TO_NUMBER],
                        body: 'Hello'
                    })
                }
            );

            const data = await resp.json();
            console.log(data);
        }
        run();

    }
    catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//SMS Recive
async function addEditSMSRecive(payloadData, userData) {
    try {

        var requestBody = payloadData;
        console.log(requestBody);
        const sendSMS = {
            from: requestBody.to,
            to: [requestBody.from],
            body: 'You sent: ' + requestBody.body,
        };

        let result = await fetches(
            'https://us.sms.api.sinch.com/xms/v1/' + SERVICE_PLAN_ID + '/batches',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + API_TOKEN,
                },
                body: JSON.stringify(sendSMS),
            }
        );
        console.log(await result.json());
        // res.send('Ok');


    }
    catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

module.exports = {
    adminRegister,
    adminLogin,
    changePassword,
    forgotPassword,
    verifyOTP,
    profileUpdate,
    addEditSubAdmin,
    fetchSubadmin,
    subAdminStatusChangeBlock,
    subAdminchangePassword,
    fetchadmin,
    addEditSMS,
    addEditSMSRecive
}