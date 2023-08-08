import request from "../request"

const prefix = '/database'

/********增删改查*********/
export const getDataBase = (id) => {
    return request({
        url: `${prefix}/${id}`,
        method: "get"
    })
}

export const add = (data) => {
    return request({
        url: `${prefix}`,
        method: "post",
        data
    })
}

export const update = (data) => {
    return request({
        url: `${prefix}`,
        method: "put",
        data
    })
}

export const deleteDb = (id) => {
    return request({
        url: `${prefix}/${id}`,
        method: "delete",
    })
}


/********* **** *********/
export const getDatabaseList = () => {
    return request({
        url: `${prefix}/list`,
        method: "get"
    })
}

export const getDbs = (id) => {
    return request({
        url: `${prefix}/list/${id}`,
        method: "get"
    })
}

export const getTableList = (id, dbName) => {
    return request({
        url: `${prefix}/table/list/datasource-id/${id}/db-name/${dbName}`,
        method: "get"
    })
}

export const getColumnList = (id : number, dbName : string, tableName : string) => {
    return request({
        url: `${prefix}/column/list/datasource-id/${id}/db-name/${dbName}/table-name/${tableName}`,
        method: "get"
    })
}