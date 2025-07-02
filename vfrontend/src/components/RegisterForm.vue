<template>
    <div>
        <h2>注册</h2>
        <input v-model="username" placeholder="用户名" />
        <input v-model="password" type="password" placeholder="密码" />
        <button @click="register">注册</button>
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
        register() {
            axios.post('http://localhost:8000/api/auth/register/', {
                username: this.username,
                password: this.password
            }).then(res => {
                localStorage.setItem('token', res.data.token)
                this.$emit('register-success', this.username)
            }).catch(() => {
                alert('注册失败')
            })
        }
    }
}
</script>
