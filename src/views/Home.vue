<template>
    <Layout>
        <section class="w-11/12 md:w-9/12 md:mb-24 min-h-[60vh] md:flex md:justify-between mx-auto">
            <div class="w-4/5 mt-32 md:w-96">
                <div class="flex items-center gap-3">
                    <p class="text-lg">
                        Techwolk
                    </p>
                    <div class="w-12 mt-1 h-px bg-black"></div>
                </div>
                <h1 class="text-4xl font-semibold my-6">
                    Het <span class="bg-neonYellow px-2">huis</span> van de crypto belegger
                </h1>
                <p class="text-gray-600">
                    Technologie beweegt razendsnel. Wij zorgen ervoor dat de meest spraakmakende technologieën in een simpel overzicht klaar staan voor jou
                </p>
                <div class="my-6">
                    <svg width="50" height="25" viewBox="0 0 50 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M49.5 1.5H6.5V23M6.5 23L1 17.5M6.5 23L11.5 17.5" stroke="black" stroke-width="2"/>
                    </svg>
                </div>
            </div>
            
            <div class="hidden md:block mt-40">
                <div class="bg-gray-200 w-12 h-12 flex items-center ">
                    <img class="w-6 h-6 mx-auto" src="@/assets/bitcoin.svg" alt="">
                </div>
                <div class="bg-gray-200 w-12 h-12 flex items-center -translate-x-12">
                    <img class="w-6 h-6 mx-auto" src="@/assets/dogecoin.svg" alt="">
                </div>
                <div class="bg-gray-200 w-12 h-12 flex items-center -translate-y-12">
                    <img class="w-6 h-6 mx-auto" src="@/assets/uniswap.svg" alt="">
                </div>
                <div class="bg-gray-200 w-12 h-12 flex items-center -translate-y-12">
                    <img class="w-6 h-6 mx-auto" src="@/assets/tether.svg" alt="">
                </div>
                <div class="bg-gray-200 w-12 h-12 flex items-center -translate-y-12">
                    <img class="w-6 h-6 mx-auto" src="@/assets/vechain.svg" alt="">
                </div>
                <div class="bg-gray-200 w-12 h-12 flex items-center -translate-y-24 -translate-x-12">
                    <img class="w-6 h-6 mx-auto" src="@/assets/monero.svg" alt="">
                </div>
                <div class="bg-gray-200 w-12 h-12 flex items-center -translate-y-52 translate-x-12">
                    <img class="w-6 h-6 mx-auto" src="@/assets/litecoin.svg" alt="">
                </div>
            </div>
        </section>

        <section>
            <div>
                <div class="bg-neonYellow w-12 h-12 flex items-center translate-x-36">
                    <img class="w-6 h-6 mx-auto" src="@/assets/ethereum.svg" alt="">
                </div>
                <div class="bg-neonYellow w-12 h-12 flex items-center translate-x-24">
                    <img class="w-6 h-6 mx-auto" src="@/assets/bnb.svg" alt="">
                </div>
            </div>
            <div class="bg-gray-900 text-white text-center py-8 text-lg"></div>
        </section>

        <section class="h-screen">
            <div class="py-10 mb-16 bg-neonYellow h-96" v-if="post">
                <div class="w-10/12 md:w-2/3 lg:w-1/3 mx-auto">
                    <p class="text-gray-500 font-semibold py-2">
                        {{`${new Date(post.date).getDate()} ${months[new Date(post.date).getMonth()]} ${new Date(post.date).getFullYear()}`}}
                    </p>
                    <h1 class="text-3xl sm:text-4xl font-semibold py-2">
                        <a :href="`/artikel/${post.slug}`">{{ post.title.rendered }}</a>
                    </h1>
                    <a :href="`/artikel/${post.slug}`">
                        <img class="w-full h-96 object-cover aspect-video my-4 rounded mx-auto" :src="post._embedded['wp:featuredmedia'][0]['source_url']" alt="">
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
        
        <section class="w-11/12 md:9/12 mx-auto my-12 mb-32">
            <h2 class="text-3xl">Nieuws</h2>
            <ul class="flex gap-2 flex-wrap my-4">
                <li 
                @click="posts.current = 'all'"
                :class="posts.current === 'all' ? 'bg-neonYellow' : 'bg-gray-200'"
                class="p-2 hover:cursor-pointer">
                    Alles
                </li>
                <li 
                @click="posts.current = 'crypto'"
                :class="posts.current === 'crypto' ? 'bg-neonYellow' : 'bg-gray-200'"
                class="p-2 hover:cursor-pointer">
                    Crypto & Web3
                </li>
                <li 
                @click="posts.current = 'ai'"
                :class="posts.current === 'ai' ? 'bg-neonYellow' : 'bg-gray-200'"
                class="p-2 hover:cursor-pointer">
                    AI
                </li>
                <li 
                @click="posts.current = 'tech'"
                :class="posts.current === 'tech' ? 'bg-neonYellow' : 'bg-gray-200'"
                class="p-2 hover:cursor-pointer">
                    Tech
                </li>
            </ul>
            <div class="my-6">
                <div v-for="post in posts[posts.current]" class="my-4 bg-gray-100 md:w-3/5">
                    <a :href="`/artikel/${post.slug}`">
                        <img class="w-full h-16 object-cover" :src="post._embedded['wp:featuredmedia'][0]['source_url']" alt="">
                        <div class="p-4">
                            <p class="text-gray-600">
                                {{`${new Date(post.date).getDate()} ${months[new Date(post.date).getMonth()]} ${new Date(post.date).getFullYear()}`}}
                            </p>
                            <h3 class="font-semibold my-2 text-lg">{{ post.title.rendered }}</h3>
                        </div>
                    </a>
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
                current: 'all',
                all: null,
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
                this.posts.all = data;
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