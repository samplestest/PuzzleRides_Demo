"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//add Edit BestThingDoTO
async function addEditBestThingDoTO(payloadData, userData) {
    try {
        let data;
        if (payloadData.BestThingDoTOId) {
            data = await Service.findAndUpdate(
                Model.BestThingToDo,
                { _id: payloadData.BestThingDoTOId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            const exit = await Service.findOne(Model.BestThingToDo,
                { title: payloadData.title, isDeleted: false });
            if (exit) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EXIST)
            }
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.BestThingToDo, payloadData);
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

//Fetch BestThingDoTO
async function fetchBestThingDoTO(queryData) {
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
        let data = await Service.getData(Model.BestThingToDo, query, projection, options);
        let total = await Service.count(Model.BestThingToDo, query)
        return {
            BestThingToDoData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Delete BestThingDoTO
async function deleteBestThingDoTOById(paramsData) {
    try {
        const { BestThingDoTOId } = paramsData;
        const resp = await Service.findAndUpdate(
            Model.BestThingToDo,
            { _id: BestThingDoTOId },
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
    addEditBestThingDoTO,
    fetchBestThingDoTO,
    deleteBestThingDoTOById
}