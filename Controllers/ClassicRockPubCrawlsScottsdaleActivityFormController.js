"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit ClassicRockPubCrawlsScottsdaleActivityForm
async function addEditClassicRockPubCrawlsScottsdaleActivityForm(payloadData, userData) {
    try {
        let data;
        if (payloadData.classicRockPubCrawlsScottsdaleActivityFormId) {
            data = await Service.findAndUpdate(
                Model.ClassicRockPubCrawlsScottsdaleActivityForm,
                { _id: payloadData.classicRockPubCrawlsScottsdaleActivityFormId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            if (await Service.findOne(Model.ClassicRockPubCrawlsScottsdaleActivityForm, { email: payloadData.email })) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EMAIL_ALREADY_EXIST);
            }
            if (await Service.findOne(Model.ClassicRockPubCrawlsScottsdaleActivityForm, { phone: payloadData.phone })) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.PHONE_ALREADY_EXIST);
            }
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.ClassicRockPubCrawlsScottsdaleActivityForm, payloadData);
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
            }
        }
        return data
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Fetch ClassicRockPubCrawlsScottsdaleActivityForm
async function fetchClassicRockPubCrawlsScottsdaleActivityForm(queryData) {
    try {
        const { skip = undefined, limit = undefined, search } = queryData;
        const query = { isDeleted: false };
        const projection = { isDeleted: 0, __v: 0 };
        const options = { sort: { _id: -1 } }

        if (typeof skip !== "undefined" && typeof limit !== "undefined") {
            options = { skip: skip, limit: limit, sort: { _id: -1 } }
        }
        if (search)
            query.name = new RegExp(search, "ig");
        let data = await Service.getData(Model.ClassicRockPubCrawlsScottsdaleActivityForm, query, projection, options);
        let total = await Service.count(Model.ClassicRockPubCrawlsScottsdaleActivityForm, query)
        return {
            ClassicRockPubCrawlsScottsdaleActivityFormData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

// //Fetch ClassicRockPubCrawlsScottsdaleActivityForm Sold Out Date
// async function fetchClassicRockPubCrawlsScottsdaleActivitySoldDate(queryData) {
//     try {
//         const { skip = undefined, limit = undefined, search } = queryData;
//         const query = { isDeleted: false, date: { $gte: new Date() } };
//         const projection = { date: 1 };
//         const options = { sort: { _id: -1 } }

//         if (typeof skip !== "undefined" && typeof limit !== "undefined") {
//             options = { skip: skip, limit: limit, sort: { _id: -1 } }
//         }
//         if (search)
//             query.name = new RegExp(search, "ig");
//         let data = await Service.getData(Model.ClassicRockPubCrawlsScottsdaleActivityForm, query, projection, options);
//         return {
//             SoldDate: data
//         }
//     } catch (err) {
//         console.log(err);
//         return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
//     }
// }


module.exports = {
    addEditClassicRockPubCrawlsScottsdaleActivityForm,
    fetchClassicRockPubCrawlsScottsdaleActivityForm,
    // fetchClassicRockPubCrawlsScottsdaleActivitySoldDate
}