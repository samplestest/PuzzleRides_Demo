"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");
const { promises } = require("fs-extra");
const { gamesConfiguration_v1configuration } = require("googleapis");
const { payload } = require("@hapi/hapi/lib/validation");

//add Edit What Are Puzzle
async function addEditWhatArePuzzle(payloadData, userData) {
    try {
        let data;
        if (payloadData.whatArePuzzleId) {
            data = await Service.findAndUpdate(
                Model.WhatArePuzzle,
                { _id: payloadData.whatArePuzzleId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            const exit = await Service.findOne(Model.WhatArePuzzle,
                { title: payloadData.title, isDeleted: false });
            if (exit) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EXIST)
            }
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.WhatArePuzzle, payloadData);
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

//Fetch WhatArePuzzle
async function fetchWhatArePuzzle(queryData) {
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
        let data = await Service.getData(Model.WhatArePuzzle, query, projection, options);
        let total = await Service.count(Model.WhatArePuzzle, query)
        return {
            WhatArePuzzleData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Delete WhatArePuzzle
async function deleteWhatArePuzzleById(paramsData) {
    try {
        const { whatArePuzzleId } = paramsData;
        const resp = await Service.findAndUpdate(
            Model.WhatArePuzzle,
            { _id: whatArePuzzleId },
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
    addEditWhatArePuzzle,
    fetchWhatArePuzzle,
    deleteWhatArePuzzleById
}