"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit ContactUsForm
async function addEditContactUsForm(payloadData, userData) {
    try {
        let data;
        if (payloadData.contactUsFormId) {
            data = await Service.findAndUpdate(
                Model.ContactUsForm,
                { _id: payloadData.contactUsFormId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            if (await Service.findOne(Model.ContactUsForm, { email: payloadData.email })) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EMAIL_ALREADY_EXIST);
            }
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.ContactUsForm, payloadData);
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

//Fetch ContactUsForm
async function fetchContactUsForm(queryData) {
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
        let data = await Service.getData(Model.ContactUsForm, query, projection, options);
        let total = await Service.count(Model.ContactUsForm, query)
        return {
            ContactUsFormData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}


module.exports = {
    addEditContactUsForm,
    fetchContactUsForm,
}