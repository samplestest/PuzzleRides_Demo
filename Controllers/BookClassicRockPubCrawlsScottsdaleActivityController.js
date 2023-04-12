"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit BookClassicRockPubCrawlsScottsdaleActivity
async function addEditBookClassicRockPubCrawlsScottsdaleActivity(payloadData, userData) {
    try {
        let data;
        if (payloadData.bookClassicRockPubCrawlsScottsdaleActivityId) {
            data = await Service.findAndUpdate(
                Model.BookClassicRockPubCrawlsScottsdaleActivity,
                { _id: payloadData.bookClassicRockPubCrawlsScottsdaleActivityId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.BookClassicRockPubCrawlsScottsdaleActivity, payloadData);
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

//Fetch BookClassicRockPubCrawlsScottsdaleActivity
async function fetchBookClassicRockPubCrawlsScottsdaleActivity(queryData) {
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
        let data = await Service.getData(Model.BookClassicRockPubCrawlsScottsdaleActivity, query, projection, options);
        let total = await Service.count(Model.BookClassicRockPubCrawlsScottsdaleActivity, query)
        return {
            BookClassicRockPubCrawlsScottsdaleActivityData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Fetch ClassicRockPubCrawlsScottsdaleActivityForm Sold Out Date
async function fetchClassicRockPubCrawlsScottsdaleActivitySoldDate(queryData) {
    try {
        const { skip = undefined, limit = undefined, search } = queryData;
        const query = { isDeleted: false, date: { $gte: new Date() }, ridesId: "63db5b761a312cc4b3c207c6" };
        const projection = { date: 1 };
        const options = { sort: { _id: -1 } }

        if (typeof skip !== "undefined" && typeof limit !== "undefined") {
            options = { skip: skip, limit: limit, sort: { _id: -1 } }
        }
        if (search)
            query.name = new RegExp(search, "ig");
        let data = await Service.getData(Model.RidesBooking, query, projection, options);
        return {
            SoldDate: data
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

module.exports = {
    addEditBookClassicRockPubCrawlsScottsdaleActivity,
    fetchBookClassicRockPubCrawlsScottsdaleActivity,
    fetchClassicRockPubCrawlsScottsdaleActivitySoldDate
}