<template>
    <div>
        <h2>登录</h2>
        <input v-model="username" placeholder="用户名" />
        <input v-model="password" type="password" placeholder="密码" />
        <button @click="login">登录</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            axios.post('http://localhost:8000/api/auth/login/', {
                username: this.username,
                password: this.password
            }).then(res => {
                localStorage.setItem('token', res.data.token)
                this.$emit('login-success', this.username)
            }).catch(() => {
                alert('登录失败')
            })
        }
    }
}
</script>
