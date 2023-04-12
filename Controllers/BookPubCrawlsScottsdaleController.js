"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit BookPubCrawlsScottsdale
async function addEditBookPubCrawlsScottsdale(payloadData, userData) {
    try {
        let data;
        if (payloadData.bookPubCrawlsScottsdaleId) {
            data = await Service.findAndUpdate(
                Model.BookPubCrawlsScottsdale,
                { _id: payloadData.bookPubCrawlsScottsdaleId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.BookPubCrawlsScottsdale, payloadData);
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

//Fetch BookPubCrawlsScottsdale
async function fetchBookPubCrawlsScottsdale(queryData) {
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
        let data = await Service.getData(Model.BookPubCrawlsScottsdale, query, projection, options);
        let activity = await Service.getData(Model.PubActivity, query, projection, options);
        let total = await Service.count(Model.BookPubCrawlsScottsdale, query)
        return {
            BookPubCrawlsScottsdaleData: data,
            ActivityData: activity,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

// //Fetch BookPubCrawlsScottsdale
// async function fetchBookPubCrawlsScottsdaleAgg(userData) {
//     try {
//         const condition = { isDeleted: false };
//         const aggregate = [
//             { $match: { ...condition } },
//             {
//                 $unwind: { path: "$Our_Local_Bars", preserveNullAndEmptyArrays: true }
//             },
//             {
//                 $lookup: {
//                     from: "pubactivities",
//                     let: { "pubactivitiesId": "$Our_Local_Bars._id" },
//                     pipeline: [
//                         {
//                             $match: {
//                                 $expr: {
//                                     $and: [
//                                         { $eq: ["$refId", "$$pubactivitiesId"] },
//                                         { $eq: ["$isDeleted", false] }
//                                     ]
//                                 }
//                             }
//                         },
//                         {
//                             $project: {
//                                 image: 1,
//                                 title1: 1,
//                                 title2: 1
//                             }
//                         }
//                     ],
//                     as: "PubActivityData"
//                 }
//             },
//             {
//                 $unwind: { path: "$PubActivityData", preserveNullAndEmptyArrays: true }
//             },
//             {
//                 $project: {
//                     Our_Local_Bars: 1,
//                     PubActivityData: 1
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     Our_Local_Bars: { "$first": "$Our_Local_Bars" },
//                     PubActivityData: { "$addToSet": "$PubActivityData" }
//                 }
//             }
//         ];
//         const data = await Model.PubCrawls.aggregate(aggregate);
//         return data;
//     } catch (err) {
//         console.log(err);
//         return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
//     }
// }

module.exports = {
    addEditBookPubCrawlsScottsdale,
    fetchBookPubCrawlsScottsdale,
    // fetchBookPubCrawlsScottsdaleAgg
}