"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");
const { promises } = require("fs-extra");
const { gamesConfiguration_v1configuration } = require("googleapis");
const { payload } = require("@hapi/hapi/lib/validation");

//add Edit OurCrawls
async function addEditOurCrawls(payloadData, userData) {
    try {
        let data;
        if (payloadData.OurCrawlsId) {
            data = await Service.findAndUpdate(
                Model.OurCrawls,
                { _id: payloadData.OurCrawlsId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            const exit = await Service.findOne(Model.OurCrawls,
                { title: payloadData.title, isDeleted: false });
            if (exit) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EXIST)
            }
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.OurCrawls, payloadData);
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
            }
        }
        return data;
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
    }
}

//Fetch OurCrawls
async function fetchOurCrawls(queryData) {
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
        let data = await Service.getData(Model.OurCrawls, query, projection, options);
        let total = await Service.count(Model.OurCrawls, query)
        return {
            OurCrawlsData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Delete OurCrawls
async function deleteOurCrawlsById(paramsData) {
    try {
        const { OurCrawlsId } = paramsData;
        const resp = await Service.findAndUpdate(
            Model.OurCrawls,
            { _id: OurCrawlsId },
            { $set: { isDeleted: true } }
        );
        if (resp) return Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DELETED
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST);
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
    }
}

module.exports = {
    addEditOurCrawls,
    fetchOurCrawls,
    deleteOurCrawlsById
}