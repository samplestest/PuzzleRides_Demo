"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit BookClassicRockPubCrawlsScottsdale
async function addEditBookClassicRockPubCrawlsScottsdale(payloadData, userData) {
    try {
        let data;
        if (payloadData.bookClassicRockPubCrawlsScottsdaleId) {
            data = await Service.findAndUpdate(
                Model.BookClassicRockPubCrawlsScottsdale,
                { _id: payloadData.bookClassicRockPubCrawlsScottsdaleId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.BookClassicRockPubCrawlsScottsdale, payloadData);
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

// //Fetch BookClassicRockPubCrawlsScottsdale
// async function fetchBookClassicRockPubCrawlsScottsdale(queryData) {
//     try {
//         const { skip = undefined, limit = undefined, search } = queryData;
//         const query = { isDeleted: false };
//         const projection = { isDeleted: 0, __v: 0 };
//         const options = { sort: { _id: -1 } }

//         if (typeof skip !== "undefined" && typeof limit !== "undefined") {
//             options = { skip: skip, limit: limit, sort: { _id: -1 } }
//         }
//         if (search)
//             query.name = new RegExp(search, "ig");
//         let data = await Service.getData(Model.BookClassicRockPubCrawlsScottsdale, query, projection, options);
//         let activity = await Service.getData(Model.PubActivity, query, projection, options);
//         let total = await Service.count(Model.BookClassicRockPubCrawlsScottsdale, query)
//         return {
//             BookClassicRockPubCrawlsScottsdaleData: data,
//             ActivityData: activity,
//             total: total
//         }
//     } catch (err) {
//         console.log(err);
//         return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
//     }
// }

//Fetch BookClassic Rock Pub CrawlsScottsdale Agg
async function fetchBookClassicRockPubCrawlsScottsdaleAgg(userData) {
    try {
        const condition = { isDeleted: false };
        const aggregate = [
            { $match: { ...condition } },
            {
                $unwind: { path: "$Our_Rock", preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "pubactivities",
                    let: { "pubactivitiesId": "$Our_Rock._id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$subRefId", "$$pubactivitiesId"] },
                                        { $eq: ["$isDeleted", false] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                image: 1,
                                title1: 1,
                                title2: 1
                            }
                        }
                    ],
                    as: "PubActivityData"
                }
            },
            {
                $unwind: { path: "$PubActivityData", preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    Our_Rock: 1,
                    PubActivityData: 1
                }
            },
            {
                $group: {
                    _id: null,
                    Our_Rock: { "$first": "$Our_Rock" },
                    PubActivityData: { "$addToSet": "$PubActivityData" }
                }
            }
        ];
        let data = await Service.getData(Model.BookPubPuzzlesPubCrawlsScottsdale);
        const Activity = await Model.PubCrawls.aggregate(aggregate);
        return {
            DataList: data,
            ActivityList: Activity
        };
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
    }
}

module.exports = {
    addEditBookClassicRockPubCrawlsScottsdale,
    // fetchBookClassicRockPubCrawlsScottsdale,
    fetchBookClassicRockPubCrawlsScottsdaleAgg
}