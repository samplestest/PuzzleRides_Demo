"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");


//Add Edit FooterLink
async function addEditFooterLink(payloadData, userData) {
    try {
        let data;
        if (payloadData.footerLinkId) {
            data = await Service.findAndUpdate(
                Model.FooterLink,
                { _id: payloadData.footerLinkId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            payloadData.addedBy = userData._id;
            data = await Service.saveData(Model.FooterLink, payloadData);
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
            }
        }
        return data;
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Fetch Footer
async function fetchFooterLink(queryData) {
    try {
        const { skip = undefined, limit = undefined, search } = queryData;
        const query = { isDeleted: false };
        const projection = { isDeleted: 0, __v: 0 };
        // const options = { sort: { _id: -1 } };

        if (typeof skip !== "undefined" && typeof limit !== "undefined") {
            options = { skip: skip, limit: limit, sort: { _id: -1 } }
        }
        if (search)
            query.name = new RegExp(search, "ig");

        const data = await Service.getData(Model.FooterLink, query, projection);
        const total = await Service.count(Model.FooterLink, query);
        return {
            FooterLink: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
    }
}

//Delete FooterLink
async function deleteFooterLinkById(paramsData) {
    try {
        const { footerLinkId } = paramsData;
        const resp = await Service.findAndUpdate(
            Model.FooterLink,
            { _id: footerLinkId },
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
    addEditFooterLink,
    fetchFooterLink,
    deleteFooterLinkById,
}
