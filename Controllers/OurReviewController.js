"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");
const { promises } = require("fs-extra");
const { gamesConfiguration_v1configuration } = require("googleapis");
const { payload } = require("@hapi/hapi/lib/validation");

//add Edit OurReview
async function addEditOurReview(payloadData, userData) {
    try {
        let data;
        if (payloadData.OurReviewId) {
            data = await Service.findAndUpdate(
                Model.OurReview,
                { _id: payloadData.OurReviewId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            const exit = await Service.findOne(Model.OurReview,
                { name: payloadData.name, isDeleted: false });
            if (exit) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EXIST)
            }
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.OurReview, payloadData);
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

//Fetch OurReview
async function fetchOurReview(queryData) {
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
        let title = await Service.getData(Model.Title, query, { Our_Review: 1, _id: 0 });
        console.log("title:", title);
        let data = await Service.getData(Model.OurReview, query, projection, options);
        let total = await Service.count(Model.OurReview, query)
        return {
            title: title,
            OurReviewData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Delete OurReview
async function deleteOurReviewById(paramsData) {
    try {
        const { OurReviewId } = paramsData;
        const resp = await Service.findAndUpdate(
            Model.OurReview,
            { _id: OurReviewId },
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
    addEditOurReview,
    fetchOurReview,
    deleteOurReviewById
}