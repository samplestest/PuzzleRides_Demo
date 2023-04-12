"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit BookCopperCanyonScottsdale
async function addEditBookCopperCanyonScottsdale(payloadData, userData) {
    try {
        let data;
        if (payloadData.bookCopperCanyonScottsdaleId) {
            data = await Service.findAndUpdate(
                Model.BookCopperCanyonScottsdale,
                { _id: payloadData.bookCopperCanyonScottsdaleId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.BookCopperCanyonScottsdale, payloadData);
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

//Fetch BookCopperCanyonScottsdale
async function fetchBookCopperCanyonScottsdale(queryData) {
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
        let data = await Service.getData(Model.BookCopperCanyonScottsdale, query, projection, options);
        let total = await Service.count(Model.BookCopperCanyonScottsdale, query)
        return {
            BookCopperCanyonScottsdaleData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Fetch BookCopperCanyonScottsdale Sold Out Date
async function fetchCopperCanyonScottsdaleSoldDateSoldDate(queryData) {
    try {
        const { skip = undefined, limit = undefined, search } = queryData;
        const query = { isDeleted: false, date: { $gte: new Date() }, ridesId: ("63ce65125a6770d5455c16b5") };
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
    addEditBookCopperCanyonScottsdale,
    fetchBookCopperCanyonScottsdale,
    fetchCopperCanyonScottsdaleSoldDateSoldDate
}