<template>
    <div>
        <h1>Vue 博客</h1>
        <div v-if="!token">
            <LoginForm @login-success="onLoginSuccess" />
            <RegisterForm @register-success="onLoginSuccess" />
        </div>
        <div v-else>
            <p>欢迎 {{ username }}！<button @click="logout">退出</button></p>
            <BlogList :token="token" />
        </div>
    </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import BlogList from './components/BlogList.vue'

export default {
    components: { LoginForm, RegisterForm, BlogList },
    data() {
        return {
            username: '',
            token: localStorage.getItem('token') || ''
        }
    },
    methods: {
        onLoginSuccess(username) {
            this.username = username
            this.token = localStorage.getItem('token')
        },
        logout() {
            this.username = ''
            this.token = ''
            localStorage.removeItem('token')
        }
    }
}
</script>
