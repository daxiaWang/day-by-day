import request from './request'

export function getGrantVehicleByUser(params) {
    console.log("1")
    return request({
        url: '/getGrantVehicleByUser',
        method: 'post',
        params
    })
}