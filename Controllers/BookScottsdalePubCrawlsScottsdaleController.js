"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit BookScottsdalePubCrawlsScottsdale
async function addEditBookScottsdalePubCrawlsScottsdale(payloadData, userData) {
    try {
        let data;
        if (payloadData.bookScottsdalePubCrawlsScottsdaleId) {
            data = await Service.findAndUpdate(
                Model.BookScottsdalePubCrawlsScottsdale,
                { _id: payloadData.bookScottsdalePubCrawlsScottsdaleId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.BookScottsdalePubCrawlsScottsdale, payloadData);
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

//Fetch BookScottsdalePubCrawlsScottsdale
async function fetchBookScottsdalePubCrawlsScottsdale(queryData) {
    try {
        const { skip = undefined, limit = undefined, search } = queryData;
        const query = { isDeleted: false, typeId: "63cf6622e4189e6220af290b" };
        const projection = { isDeleted: 0, __v: 0 };
        const options = { sort: { _id: -1 } }

        if (typeof skip !== "undefined" && typeof limit !== "undefined") {
            options = { skip: skip, limit: limit, sort: { _id: -1 } }
        }
        if (search)
            query.name = new RegExp(search, "ig");
        let data = await Service.getData(Model.BookScottsdalePubCrawlsScottsdale, query, projection, options);
        let activity = await Service.getData(Model.PubActivity, query, projection, options);
        let total = await Service.count(Model.BookScottsdalePubCrawlsScottsdale, query)
        return {
            BookScottsdalePubCrawlsScottsdaleData: data,
            ActivityData: activity,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

// //Fetch BookScottsdalePubCrawlsScottsdale
async function fetchBookScottsdalePubCrawlsScottsdaleAgg(userData) {
    try {
        const condition = { isDeleted: false };
        const aggregate = [
            { $match: { ...condition } },
            {
                $unwind: { path: "$Scottsdale_Prescott", preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "pubactivities",
                    let: { "pubactivitiesId": "$Scottsdale_Prescott._id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$typeId", "$$pubactivitiesId"] },
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
                    Scottsdale_Prescott: 1,
                    PubActivityData: 1
                }
            },
            {
                $group: {
                    _id: null,
                    Scottsdale_Prescott: { "$first": "$Scottsdale_Prescott" },
                    PubActivityData: { "$addToSet": "$PubActivityData" }
                }
            }
        ];
        const data = await Model.PubCrawls.aggregate(aggregate);
        return data;
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
    }
}

module.exports = {
    addEditBookScottsdalePubCrawlsScottsdale,
    fetchBookScottsdalePubCrawlsScottsdale,
    fetchBookScottsdalePubCrawlsScottsdaleAgg
}