import request from "../request"

export const getDatabaseList = () => {
    return request({
        url: "/database/list",
        method: "get"
    })
}

export const getDataBase = (id) => {
    return request({
        url: `/database/${id}`,
        method: "get"
    })
}

export const add = (data) => {
    return request({
        url: `/database`,
        method: "post",
        data
    })
}

export const update = (data) => {
    return request({
        url: `/database`,
        method: "put",
        data
    })
}


export const getTableList = (id) => {
    return request({
        url: `/database/table/list/${id}`,
        method: "get"
    })
}

export const getColumnList = () => {
    return request({
        url: "/database/column/list",
        method: "get"
    })
}