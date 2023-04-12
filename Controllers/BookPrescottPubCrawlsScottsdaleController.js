"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit BookPrescottPubCrawlsScottsdale
async function addEditBookPrescottPubCrawlsScottsdale(payloadData, userData) {
    try {
        let data;
        if (payloadData.bookPrescottPubCrawlsScottsdaleId) {
            data = await Service.findAndUpdate(
                Model.BookPrescottPubCrawlsScottsdale,
                { _id: payloadData.bookPrescottPubCrawlsScottsdaleId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.BookPrescottPubCrawlsScottsdale, payloadData);
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

//Fetch BookPrescottPubCrawlsScottsdale
async function fetchBookPrescottPubCrawlsScottsdale(queryData) {
    try {
        const { skip = undefined, limit = undefined, search } = queryData;
        const query = { isDeleted: false, typeId: "63cf6622e4189e6220af290c" };
        const projection = { isDeleted: 0, __v: 0 };
        const options = { sort: { _id: -1 } }

        if (typeof skip !== "undefined" && typeof limit !== "undefined") {
            options = { skip: skip, limit: limit, sort: { _id: -1 } }
        }
        if (search)
            query.name = new RegExp(search, "ig");
        let data = await Service.getData(Model.BookPrescottPubCrawlsScottsdale, query, projection, options);
        let activity = await Service.getData(Model.PubActivity, query, projection, options);
        let total = await Service.count(Model.BookPrescottPubCrawlsScottsdale, query)
        return {
            BookPrescottPubCrawlsScottsdaleData: data,
            ActivityData: activity,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

// //Fetch BookPrescottPubCrawlsScottsdale
async function fetchBookPrescottPubCrawlsScottsdaleAgg(userData) {
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
    addEditBookPrescottPubCrawlsScottsdale,
    fetchBookPrescottPubCrawlsScottsdale,
    fetchBookPrescottPubCrawlsScottsdaleAgg
}