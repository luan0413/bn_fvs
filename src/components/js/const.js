import axios from 'axios'
import Vue from 'vue'
const token = new Vue();

import { infor, title, alertObj, vue } from './error.js'

export const template = (action, data) => {

    var request = {
        data: data,
        token: token.$cookies.get('token')
    };
    const url = 'http://' + window.config.BaseHttpUrl + '/bana_fvs' + `/${action}`;

    return axios.post(url, request).then(function(response) {
        // console.log(response)
        if (response.status === 200) {
            return response.data
        } else {
            vue.$alert(infor, title, alertObj);
        }
    })
}