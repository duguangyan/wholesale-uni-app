import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        agencyImgUpload1: '',
		agencyImgUpload2: ''
    },
    mutations: {
		setAgencyImgUpload1(state,payload){
			if(payload.hasOwnProperty('agencyImgUpload1')){
				state.agencyImgUpload1 = payload.agencyImgUpload1
			}
		},
		setAgencyImgUpload2(state,payload){
			if(payload.hasOwnProperty('agencyImgUpload2')){
				state.agencyImgUpload1 = payload.agencyImgUpload2
			}
		},
    }
})

export default store
