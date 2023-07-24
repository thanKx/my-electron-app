import request from "../request"

export const getTableList = () => {
    return request({
        url: "/database/table/list",
        method: "get"
    })
}


export const getColumnList = () => {
    return request({
        url: "/database/column/list",
        method: "get"
    })
}