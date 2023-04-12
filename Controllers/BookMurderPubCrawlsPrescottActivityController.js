"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit BookMurderPubCrawlsPrescottActivity
async function addEditBookMurderPubCrawlsPrescottActivity(payloadData, userData) {
    try {
        let data;
        if (payloadData.bookMurderPubCrawlsPrescottActivityId) {
            data = await Service.findAndUpdate(
                Model.BookMurderPubCrawlsPrescottActivity,
                { _id: payloadData.bookMurderPubCrawlsPrescottActivityId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.BookMurderPubCrawlsPrescottActivity, payloadData);
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

//Fetch BookMurderPubCrawlsPrescottActivity
async function fetchBookMurderPubCrawlsPrescottActivity(queryData) {
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
        let data = await Service.getData(Model.BookMurderPubCrawlsPrescottActivity, query, projection, options);
        let total = await Service.count(Model.BookMurderPubCrawlsPrescottActivity, query)
        return {
            BookMurderPubCrawlsPrescottActivityData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Fetch MurderPubCrawlsPrescottActivityForm Sold Out Date
async function fetchMurderPubCrawlsPrescottActivitySoldDate(queryData) {
    try {
        const { skip = undefined, limit = undefined, search } = queryData;
        const query = { isDeleted: false, date: { $gte: new Date() }, ridesId: "63db5ba41a312cc4b3c207c9" };
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

//Fetch UpcomingTrip
async function fetchMurderPubCrawlsPrescottActivityUpcomingTrip(queryData) {
    try {
        const { skip = undefined, limit = undefined, search } = queryData;
        const query = { isDeleted: false, date: { $gte: new Date() }, ridesId: "63db5ba41a312cc4b3c207c9" };
        const projection = { date: 1 };
        const options = { sort: { _id: -1 } }

        if (typeof skip !== "undefined" && typeof limit !== "undefined") {
            options = { skip: skip, limit: limit, sort: { _id: -1 } }
        }
        if (search)
            query.name = new RegExp(search, "ig");
        let data = await Service.getData(Model.UpcomingTrip, query, projection, options);
        return {
            Data: data
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

module.exports = {
    addEditBookMurderPubCrawlsPrescottActivity,
    fetchBookMurderPubCrawlsPrescottActivity,
    fetchMurderPubCrawlsPrescottActivitySoldDate,
    fetchMurderPubCrawlsPrescottActivityUpcomingTrip
}