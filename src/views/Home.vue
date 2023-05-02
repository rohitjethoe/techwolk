<template>
    <Layout>
        <section class="w-11/12 mx-auto">
            <div class="md:w-2/3 lg:w-2/4">
                <div class="py-10 mb-16" v-if="post">
                    <p class="text-gray-500 font-semibold py-2">
                        {{`${new Date(post.date).getDate()} ${months[new Date(post.date).getMonth()]} ${new Date(post.date).getFullYear()}`}}
                    </p>
                    <h1 class="text-3xl sm:text-4xl font-semibold py-2">
                        <a :href="`/artikel/${post.slug}`">{{ post.title.rendered }}</a>
                    </h1>
                    <a :href="`/artikel/${post.slug}`">
                        <img class="w-full rounded" :src="post._embedded['wp:featuredmedia'][0]['source_url']" alt="">
                    </a>
                    <div class="py-4" v-html="post.content.rendered.slice(0, 100)">
                    </div>
                    <a class="bg-black text-white px-4 py-1 text-sm rounded-full" :href="`/artikel/${post.slug}`">
                        Lees artikel
                    </a>
                </div>
            </div>
        </section>

        <section class="bg-black text-2xl font-semibold py-6 text-white text-center">
            <a href="https://twitter.com/techwolk" target="_blank">
                <i class="fa-brands fa-twitter mx-2"></i>
            </a>
            <i class="fa-brands fa-ethereum mx-2"></i>
        </section>

        <section class="w-11/12 mx-auto my-12">
            <div v-if="posts.crypto" class="pb-20">
                <div class="bg-neonYellow text-4xl h-6 p-2 mb-12 rounded-md font-base">
                    Crypto & Web3
                </div>
                <div class="w-52 text-3xl my-5 uppercase">
                    <h2 class="font-bold">
                        BTC prijs
                    </h2>
                    <h2
                    v-if="btcPrice"
                    class="text-right font-bold">
                        € {{ btcPrice }}
                    </h2>
                </div>
                <div class="my-8">
                    <div v-for="post in posts.crypto.slice(0, 6)" class="w-full sm:w-2/3 md:w-1/3">
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

            <div v-if="posts.ai" class="pb-20">
                <div class="bg-neonYellow text-4xl h-6 p-2 mb-12 rounded-md font-base">
                    Artificial Intelligence
                </div>
                <div class="uppercase my-5 text-3xl font-bold w-64">
                    <h2 class="text-right">Singularity</h2>
                    <h2>Is coming</h2>
                </div>
                <div class="my-8">
                    <div v-for="post in posts.ai.slice(0, 6)" class="flex items-center gap-3">
                        <div class="w-32 h-24">
                            <a :href="`/artikel/${post.slug}`">
                                <img class="w-full h-full rounded object-cover aspect-auto rounded" :src="post._embedded['wp:featuredmedia'][0]['source_url']" alt="">
                            </a>
                        </div>
                        <div class="my-2 w-2/3 sm:w-96">
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

            <div v-if="posts.tech" class="pb-20">
                <div class="bg-neonYellow text-4xl h-6 p-2 mb-12 rounded-md font-base">
                    Technologie
                </div>
                <div class="uppercase my-5 text-3xl font-bold ">
                    <h2>ALGEMEEN TECH NIEUWS</h2>
                </div>
                <div class="my-8">
                    <div v-for="post in posts.tech.slice(0, 6)" class="flex items-center gap-3">
                        <a :href="`/artikel/${post.slug}`">
                            <img class="w-32 h-24 object-cover aspect-auto rounded" :src="post._embedded['wp:featuredmedia'][0]['source_url']" alt="">
                        </a>
                        <div class="my-2 w-2/3 sm:w-96">
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
        </section>
    </Layout>
</template>

<script>
import Layout from '@/layouts/Layout.vue';
export default {
    name: 'Home',
    data() {
        return {
            post: null,
            posts: {
                crypto: null,
                ai: null,
                tech: null
            },
            btcPrice: null,
            months: ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november', 'december']
        }
    },
    mounted() {
        this.getLatestPost();
        this.getAllPosts();
        this.getCurrentPrice();
    },
    methods: {
        getAllPosts: function () {
            fetch(`${import.meta.env.VITE_WP_ENDPOINT}/wp-json/wp/v2/posts?_embed`)
            .then((res) => res.json())
            .then((data) => {
                const cryptoPosts = data.filter((p) => {
                    if (p.categories[0] === 6) {
                        return p;
                    } 
                });

                const aiPosts = data.filter((p) => {
                    if (p.categories[0] === 5) {
                        return p;
                    } 
                });

                const techPosts = data.filter((p) => {
                    if (p.categories[0] === 7) {
                        return p;
                    } 
                });

                this.posts.crypto = cryptoPosts;
                this.posts.ai = aiPosts;
                this.posts.tech = techPosts;
            })
            .catch((err) => {
                return;
            })
        },
        getLatestPost: function () {
            fetch(`${import.meta.env.VITE_WP_ENDPOINT}/wp-json/wp/v2/posts?_embed`)
            .then((res) => res.json())
            .then((data) => {
                this.post = data[0];
            })
            .catch((err) => { 
                return;
            })
        },
        getCurrentPrice: function () {
            fetch(`https://blockchain.info/ticker`, {
                mode: 'cors'
            })
            .then((res) => res.json())
            .then((data) => {
                this.btcPrice = data['EUR'].buy;
            })
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