<template>
    <Layout>
        <div v-if="category" class="w-11/12 mx-auto">
            <div class="my-12">
                <div class="my-4">
                    <p>
                        <router-link to="/">Home</router-link> / Categorie
                    </p>
                </div>
                <div class="bg-neonYellow inline-block h-6">
                    <h1 class="text-3xl font-semibold translate-x-2" v-html="category.name"></h1>
                </div>
            </div>
            <div v-if="posts" class="pb-20">
                <div class="my-8">
                    <div v-for="post in posts" class="w-full sm:w-1/2 md:w-1/3">
                        <a :href="`/artikel/${post.slug}`">
                            <img class="w-full h-full object-contain rounded" :src="post._embedded['wp:featuredmedia'][0]['source_url']" alt="">
                        </a>
                        <div class="my-2">
                            <a :href="`/artikel/${post.slug}`">
                                <h2 class="font-semibold">
                                    {{ post.title.rendered }}
                                </h2>
                                <p class="text-gray-500">
                                    {{`${new Date(post.date).getDate()} ${months[new Date(post.date).getMonth()]} ${new Date(post.date).getFullYear()}`}} • {{ getReadingTime(post.content.rendered) }} min leestijd
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from '@/layouts/Layout.vue';

export default {
    name: 'Category',
    data() {
        return {
            category: null,
            posts: null,
            months: ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november', 'december']
        }
    },
    mounted() {
        this.getCategoryData();
    },
    methods: {
        getCategoryData: function () {
            fetch(`${import.meta.env.VITE_WP_ENDPOINT}/wp-json/wp/v2/categories?slug=${this.$route.params.id}&_embed`)
            .then(res => res.json())
            .then((data) => {
                this.category = data[0];
                this.getPosts()
                .then(res => res.json())
                .then((data) => {
                    this.posts = data;
                })
            })
            .catch((err) => {
                this.category = null;
                return;
            })
        },
        getPosts: function () {
            return fetch(`${import.meta.env.VITE_WP_ENDPOINT}/wp-json/wp/v2/posts?_embed&categories=${this.category.id}`);
        },
        getReadingTime: function (content) {
            const wpm = 225;
            const words = content.trim().split(/\s+/).length;
            return(Math.ceil(words / wpm));
        }    
    },
    components: {
        Layout
    }
}
</script>