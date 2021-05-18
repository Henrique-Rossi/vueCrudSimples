import Vue from 'vue'
import axios from 'axios'

// axios.defaults.baseURL ='https://vuejscrud-698a0-default-rtdb.firebaseio.com/'

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios
        /*assim é pra quando for chamar mais de axios ou api junto */
        Vue.prototype.$http = axios.create({
            baseURL :'https://vuejscrud-698a0-default-rtdb.firebaseio.com/',
            headers:{
                "Authorization":"abc123"
            }

        })
    }
})