"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit Title
async function addEditTitle(payloadData, userData) {
    try {
        let data;
        if (payloadData.titleId) {
            data = await Service.findAndUpdate(
                Model.Title,
                { _id: payloadData.titleId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.Title, payloadData);
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

//add edit Title
async function addEditTitleDemo(payloadData, userData) {
    try {
        let data;
        data = await Service.getData(Model.Title)
        if (data && data.length > 0) {
            // update 
            data = data[0];
            data = await Service.findAndUpdate(
                Model.Title,
                { _id: data._id },
                payloadData,
                { new: true, lean: true }
            );
            console.log("data:", data);
            if (!data)
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST);
            else
                return data;
        }
        // add 
        else {
            data = await Service.saveData(Model.Title, payloadData);
            if (!data)
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
            else
                return data
        }

    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}


//Fetch Title
async function fetchTitle(queryData) {
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
        let data = await Service.getData(Model.Title, query, projection, options);
        let total = await Service.count(Model.Title, query)
        return {
            TitleData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Delete Title
// async function deletetitleById(paramsData) {
//     try {
//         const { titleId } = paramsData;
//         const resp = await Service.findAndUpdate(
//             Model.Title,
//             { _id: titleId },
//             { $set: { isDeleted: true } }
//         );
//         if (resp) return Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DELETED
//         return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST);
//     } catch (err) {
//         console.log(err);
//         return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
//     }
// }

module.exports = {
    addEditTitle,
    fetchTitle,
    addEditTitleDemo
    // deletetitleById
}