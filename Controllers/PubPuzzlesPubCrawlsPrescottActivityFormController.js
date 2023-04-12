"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit PubPuzzlesPubCrawlsPrescottActivityForm
async function addEditPubPuzzlesPubCrawlsPrescottActivityForm(payloadData, userData) {
    try {
        let data;
        if (payloadData.pubPuzzlesPubCrawlsPrescottActivityFormId) {
            data = await Service.findAndUpdate(
                Model.PubPuzzlesPubCrawlsPrescottActivityForm,
                { _id: payloadData.pubPuzzlesPubCrawlsPrescottActivityFormId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            if (await Service.findOne(Model.PubPuzzlesPubCrawlsPrescottActivityForm, { email: payloadData.email })) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EMAIL_ALREADY_EXIST);
            }
            if (await Service.findOne(Model.PubPuzzlesPubCrawlsPrescottActivityForm, { phone: payloadData.phone })) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.PHONE_ALREADY_EXIST);
            }
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.PubPuzzlesPubCrawlsPrescottActivityForm, payloadData);
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

//Fetch PubPuzzlesPubCrawlsPrescottActivityForm
async function fetchPubPuzzlesPubCrawlsPrescottActivityForm(queryData) {
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
        let data = await Service.getData(Model.PubPuzzlesPubCrawlsPrescottActivityForm, query, projection, options);
        let total = await Service.count(Model.PubPuzzlesPubCrawlsPrescottActivityForm, query)
        return {
            PubPuzzlesPubCrawlsPrescottActivityFormData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

// //Fetch PubPuzzlesPubCrawlsPrescottActivityForm Sold Out Date
// async function fetcPubPuzzlesPubCrawlsPrescottActivitySoldDate(queryData) {
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
//         let data = await Service.getData(Model.PubPuzzlesPubCrawlsPrescottActivityForm, query, projection, options);
//         return {
//             SoldDate: data
//         }
//     } catch (err) {
//         console.log(err);
//         return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
//     }
// }

// //Fetch UpcomingTrip
// async function fetchPubPuzzlesPubCrawlsPrescottActivityUpcomingTrip(queryData) {
//     try {
//         const { skip = undefined, limit = undefined, search } = queryData;
//         const query = { isDeleted: false, date: { $gte: new Date() }, ridesId: "63d8b1f857ae4fce467c16f8" };
//         const projection = { date: 1 };
//         const options = { sort: { _id: -1 } }

//         if (typeof skip !== "undefined" && typeof limit !== "undefined") {
//             options = { skip: skip, limit: limit, sort: { _id: -1 } }
//         }
//         if (search)
//             query.name = new RegExp(search, "ig");
//         let data = await Service.getData(Model.UpcomingTrip, query, projection, options);
//         return {
//             Data: data
//         }
//     } catch (err) {
//         console.log(err);
//         return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
//     }
// }

module.exports = {
    addEditPubPuzzlesPubCrawlsPrescottActivityForm,
    fetchPubPuzzlesPubCrawlsPrescottActivityForm,
    // fetcPubPuzzlesPubCrawlsPrescottActivitySoldDate,
    // fetchPubPuzzlesPubCrawlsPrescottActivityUpcomingTrip
}