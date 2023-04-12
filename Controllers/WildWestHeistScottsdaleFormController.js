"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit WildWestHeistScottsdaleForm
async function addEditWildWestHeistScottsdaleForm(payloadData, userData) {
    try {
        let data;
        if (payloadData.wildWestHeistScottsdaleFormId) {
            data = await Service.findAndUpdate(
                Model.WildWestHeistScottsdaleForm,
                { _id: payloadData.wildWestHeistScottsdaleFormId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            if (await Service.findOne(Model.WildWestHeistScottsdaleForm, { email: payloadData.email })) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EMAIL_ALREADY_EXIST);
            }
            if (await Service.findOne(Model.WildWestHeistScottsdaleForm, { phone: payloadData.phone })) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.PHONE_ALREADY_EXIST);
            }
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.WildWestHeistScottsdaleForm, payloadData);
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

//Fetch WildWestHeistScottsdaleForm
async function fetchWildWestHeistScottsdaleForm(queryData) {
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
        let data = await Service.getData(Model.WildWestHeistScottsdaleForm, query, projection, options);
        let total = await Service.count(Model.WildWestHeistScottsdaleForm, query)
        return {
            WildWestHeistScottsdaleFormData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

// //Fetch WildWestHeistScottsdale Sold Out Date
// async function fetchWildWestHeistScottsdaleSoldDate(queryData) {
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
//         let data = await Service.getData(Model.WildWestHeistScottsdaleForm, query, projection, options);
//         return {
//             SoldDate: data
//         }
//     } catch (err) {
//         console.log(err);
//         return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
//     }
// }


module.exports = {
    addEditWildWestHeistScottsdaleForm,
    fetchWildWestHeistScottsdaleForm,
    // fetchWildWestHeistScottsdaleSoldDate
}