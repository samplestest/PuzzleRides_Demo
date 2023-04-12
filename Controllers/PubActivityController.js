"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit PubActivity
async function addEditPubActivity(payloadData, userData) {
    try {
        let data;
        if (payloadData.pubActivityId) {
            data = await Service.findAndUpdate(
                Model.PubActivity,
                { _id: payloadData.PubActivity },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.PubActivity, payloadData);
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

//Fetch PubActivity
async function fetchPubActivity(queryData) {
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
        let data = await Service.getData(Model.PubActivity, query, projection, options);
        let total = await Service.count(Model.PubActivity, query)
        return {
            PubActivityData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Delete PubActivity
async function deletePubActivityById(paramsData) {
    try {
        const { PubActivityId } = paramsData;
        const resp = await Service.findAndUpdate(
            Model.PubActivity,
            { _id: PubActivityId },
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
    addEditPubActivity,
    fetchPubActivity,
    deletePubActivityById
}