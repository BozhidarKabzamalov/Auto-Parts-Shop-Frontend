import router from '../router'
import axios from 'axios'

const authentication = {
    state: {
        user: null
    },
    mutations: {
        setUser(state, user){
            state.user = user
            localStorage.setItem('userId', user.id);
            localStorage.setItem('username', user.username);
            localStorage.setItem('token', user.token);
        },
        removeUser(state){
            state.user = null
            localStorage.removeItem('userId')
            localStorage.removeItem('username')
            localStorage.removeItem('token')
        }
    },
    actions: {
        async login({commit, dispatch}, userInfo){
            try {
                let response = await axios.post('http://localhost:3000/login', userInfo)

                if (response.status == 401) {
                    console.log('Error')
                } else {
                    commit('setUser', response.data.user)
                    axios.interceptors.request.use(function (config) {
                        config.headers.Authorization = 'Bearer ' + response.data.user.token

                        return config
                    });

                    router.replace('/admin')
                }
            } catch (error) {
                console.log(error)
            }
        },
        autoLogin({commit, dispatch}){
            const userId = localStorage.getItem('userId')
            const username = localStorage.getItem('username')
            const token = localStorage.getItem('token')

            if (!token) {
                return
            }

            let user = {
                id: userId,
                username: username,
                token: token
            }

            commit('setUser', user)

            axios.interceptors.request.use(function (config) {
                config.headers.Authorization = 'Bearer ' + token

                return config
            });
        },
        logout({commit}){
            commit('removeUser')
            router.replace('/login')
        }
    }
}

export default authentication
