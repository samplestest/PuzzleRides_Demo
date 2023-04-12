"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//add Edit AsSeenOn
async function addEditAsSeenOn(payloadData, userData) {
    try {
        let data;
        if (payloadData.AsSeenOnId) {
            data = await Service.findAndUpdate(
                Model.AsSeenOn,
                { _id: payloadData.AsSeenOnId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            const exit = await Service.findOne(Model.AsSeenOn,
                { link: payloadData.link, isDeleted: false });
            if (exit) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EXIST)
            }
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.AsSeenOn, payloadData);
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

//Fetch AsSeenOn
async function fetchAsSeenOn(queryData) {
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
        let data = await Service.getData(Model.AsSeenOn, query, projection, options);
        let total = await Service.count(Model.AsSeenOn, query)
        return {
            AsSeenOnData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Delete AsSeenOn
async function deleteAsSeenOnById(paramsData) {
    try {
        const { AsSeenOnId } = paramsData;
        const resp = await Service.findAndUpdate(
            Model.AsSeenOn,
            { _id: AsSeenOnId },
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
    addEditAsSeenOn,
    fetchAsSeenOn,
    deleteAsSeenOnById
}