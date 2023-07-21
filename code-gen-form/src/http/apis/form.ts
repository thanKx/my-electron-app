import request from "../request"

export const getTableList = () => {
    return request({
        url: "/database/table-list",
        method: "get"
    })
}