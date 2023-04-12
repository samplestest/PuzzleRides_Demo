"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit BookMurderPubCrawlsScottsdaleActivity
async function addEditBookMurderPubCrawlsScottsdaleActivity(payloadData, userData) {
    try {
        let data;
        if (payloadData.bookMurderPubCrawlsScottsdaleActivityId) {
            data = await Service.findAndUpdate(
                Model.BookMurderPubCrawlsScottsdaleActivity,
                { _id: payloadData.bookMurderPubCrawlsScottsdaleActivityId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.BookMurderPubCrawlsScottsdaleActivity, payloadData);
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

//Fetch BookMurderPubCrawlsScottsdaleActivity
async function fetchBookMurderPubCrawlsScottsdaleActivity(queryData) {
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
        let data = await Service.getData(Model.BookMurderPubCrawlsScottsdaleActivity, query, projection, options);
        let total = await Service.count(Model.BookMurderPubCrawlsScottsdaleActivity, query)
        return {
            BookMurderPubCrawlsScottsdaleActivityData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Fetch MurderPubCrawlsScottsdaleActivityForm Sold Out Date
async function fetcMurderPubCrawlsScottsdaleActivitySoldDate(queryData) {
    try {
        const { skip = undefined, limit = undefined, search } = queryData;
        const query = { isDeleted: false, date: { $gte: new Date() }, ridesId: "63db5bbf1a312cc4b3c207cc" };
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
    addEditBookMurderPubCrawlsScottsdaleActivity,
    fetchBookMurderPubCrawlsScottsdaleActivity,
    fetcMurderPubCrawlsScottsdaleActivitySoldDate
}