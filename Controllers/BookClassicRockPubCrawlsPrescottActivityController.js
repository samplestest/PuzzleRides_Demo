"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit BookClassicRockPubCrawlsPrescottActivity
async function addEditBookClassicRockPubCrawlsPrescottActivity(payloadData, userData) {
    try {
        let data;
        if (payloadData.bookClassicRockPubCrawlsPrescottActivityId) {
            data = await Service.findAndUpdate(
                Model.BookClassicRockPubCrawlsPrescottActivity,
                { _id: payloadData.bookClassicRockPubCrawlsPrescottActivityId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.BookClassicRockPubCrawlsPrescottActivity, payloadData);
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

//Fetch BookClassicRockPubCrawlsPrescottActivity
async function fetchBookClassicRockPubCrawlsPrescottActivity(queryData) {
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
        let data = await Service.getData(Model.BookClassicRockPubCrawlsPrescottActivity, query, projection, options);
        let total = await Service.count(Model.BookClassicRockPubCrawlsPrescottActivity, query)
        return {
            BookClassicRockPubCrawlsPrescottActivityData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Fetch ClassicRockPubCrawlsPrescottActivityForm Sold Out Date
async function fetchClassicRockPubCrawlsPrescottActivitySoldDate(queryData) {
    try {
        const { skip = undefined, limit = undefined, search } = queryData;
        const query = { isDeleted: false, date: { $gte: new Date() }, ridesId: "63db5b371a312cc4b3c207c3" };
        const projection = { date: 1 };
        const options = { sort: { _id: -1 } }

        if (typeof skip !== "undefined" && typeof limit !== "undefined") {
            options = { skip: skip, limit: limit, sort: { _id: -1 } }
        }
        if (search)
            query.name = new RegExp(search, "ig");
        let data = await Service.getData(Model.RidesBooking, query, projection, options);
        const upcomingTrip = await Service.getData(Model.UpcomingTrip, query, projection, options);
        return {
            SoldDate: data,
            upcomingTrip: upcomingTrip
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Fetch UpcomingTrip
async function fetchClassicRockPubCrawlsPrescottActivityUpcomingTrip(queryData) {
    try {
        const { skip = undefined, limit = undefined, search } = queryData;
        const query = { isDeleted: false, date: { $gte: new Date() }, ridesId: "63db5b371a312cc4b3c207c3" };
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
    addEditBookClassicRockPubCrawlsPrescottActivity,
    fetchBookClassicRockPubCrawlsPrescottActivity,
    fetchClassicRockPubCrawlsPrescottActivitySoldDate,
    fetchClassicRockPubCrawlsPrescottActivityUpcomingTrip
}