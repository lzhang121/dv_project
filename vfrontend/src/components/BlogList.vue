<template>
    <div>
        <h2>文章列表</h2>
        <ul>
            <li v-for="blog in blogs" :key="blog.id">
                <h3>{{ blog.title }}</h3>
                <p>{{ blog.content }}</p>

                <ul>
                    <li v-for="comment in blog.comments" :key="comment.id">
                        {{ comment.content }} - {{ comment.created_at }}
                    </li>
                </ul>

                <div v-if="token">
                    <input v-model="newComments[blog.id]" placeholder="写评论..." />
                    <button @click="submitComment(blog.id)">评论</button>
                </div>
            </li>
        </ul>

        <div style="margin-top: 20px;">
            <button @click="prevPage" :disabled="page === 1">上一页</button>
            <span>第 {{ page }} 页</span>
            <button @click="nextPage">下一页</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['token'],
    data() {
        return {
            blogs: [],
            page: 1,
            newComments: {}
        }
    },
    methods: {
        fetchBlogs() {
            axios.get(`http://localhost:8000/api/blogs/?page=${this.page}`)
                .then(res => {
                    this.blogs = res.data.results
                })
        },
        nextPage() {
            this.page++
            this.fetchBlogs()
        },
        prevPage() {
            if (this.page > 1) this.page--
            this.fetchBlogs()
        },
        submitComment(blogId) {
            axios.post('http://localhost:8000/api/comments/', {
                blog: blogId,
                content: this.newComments[blogId]
            }, {
                headers: { Authorization: `Token ${this.token}` }
            }).then(() => {
                this.newComments[blogId] = ''
                this.fetchBlogs()
            }).catch(() => {
                alert('评论失败，可能未登录')
            })
        }
    },
    mounted() {
        this.fetchBlogs()
    }
}
</script>
