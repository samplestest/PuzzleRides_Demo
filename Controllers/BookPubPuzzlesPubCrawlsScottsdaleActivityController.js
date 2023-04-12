"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit BookPubPuzzlesPubCrawlsScottsdaleActivity
async function addEditBookPubPuzzlesPubCrawlsScottsdaleActivity(payloadData, userData) {
    try {
        let data;
        if (payloadData.bookPubPuzzlesPubCrawlsScottsdaleActivityId) {
            data = await Service.findAndUpdate(
                Model.BookPubPuzzlesPubCrawlsScottsdaleActivity,
                { _id: payloadData.bookPubPuzzlesPubCrawlsScottsdaleActivityId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.BookPubPuzzlesPubCrawlsScottsdaleActivity, payloadData);
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

//Fetch BookPubPuzzlesPubCrawlsScottsdaleActivity
async function fetchBookPubPuzzlesPubCrawlsScottsdaleActivity(queryData) {
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
        let data = await Service.getData(Model.BookPubPuzzlesPubCrawlsScottsdaleActivity, query, projection, options);
        let total = await Service.count(Model.BookPubPuzzlesPubCrawlsScottsdaleActivity, query)
        return {
            BookPubPuzzlesPubCrawlsScottsdaleActivityData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Fetch PubPuzzlesPubCrawlsScottsdaleActivityForm Sold Out Date
async function fetcPubPuzzlesPubCrawlsScottsdaleActivitySoldDate(queryData) {
    try {
        const { skip = undefined, limit = undefined, search } = queryData;
        const query = { isDeleted: false, date: { $gte: new Date() }, ridesId: "63db5c2c1a312cc4b3c207d2" };
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
    addEditBookPubPuzzlesPubCrawlsScottsdaleActivity,
    fetchBookPubPuzzlesPubCrawlsScottsdaleActivity,
    fetcPubPuzzlesPubCrawlsScottsdaleActivitySoldDate
}