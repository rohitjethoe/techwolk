<template>
    <Layout>
        <div v-if="post">
            <div class="w-11/12 mx-auto my-2 sm:mt-12">
                <div class="text-sm">
                    <router-link class="text-gray-500" to="/">Home</router-link> / Artikel
                </div>
                <div class="mt-4">
                    <h1 class="text-2xl">{{ post.title.rendered }}</h1>
                </div>
                <div class="mt-10 border-t-[1px] border-black text-sm w-32 py-2">
                    <p>{{`${new Date(post.date).getDate()} ${months[new Date(post.date).getMonth()]} ${new Date(post.date).getFullYear()}`}}</p>
                </div>
            </div>
            <div class="my-4 relative w-screen sm:w-11/12 mx-auto">
                <img class="w-full sm:w-2/3 md:w-1/2" :src="post._embedded['wp:featuredmedia'][0]['source_url']" alt="">
            </div>
            <div class="w-11/12 mx-auto mb-32">
                <div class="post-content md:w-2/3" v-html="post.content.rendered"></div>
            </div>
            <div class="bg-black text-2xl font-semibold py-6 mb-3 text-white text-center">
                <a href="https://twitter.com/techwolk" target="_blank">
                    <i class="fa-brands fa-twitter mx-2"></i>
                </a>
                <i class="fa-brands fa-ethereum mx-2"></i>
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from '@/layouts/Layout.vue';

export default {
    name: 'Post',
    data() {
        return {
            post: null,
            categories: {
                5: 'Artificial Intelligence',
                6: 'Crypto & Web3',
            },
            months: ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november', 'december']
        }
    },
    mounted() {
        this.getPost();
        
    },
    methods: {
        getPost: function () {
            fetch(`${import.meta.env.VITE_WP_ENDPOINT}/wp-json/wp/v2/posts?slug=${this.$route.params.id}&_embed`)
            .then(res => res.json())
            .then((data) => {
                this.post = data[0];
                document.title = `${data[0].title.rendered} | Techwolk.nl`;
                document.querySelectorAll('meta[property=og\\:image]')[0].setAttribute('content', data[0]._embedded['wp:featuredmedia'][0]['source_url']);
            })
            .catch((err) => {
                this.post = null;
                return;
            })
        }
    },
    components: {
        Layout
    }
}
</script>