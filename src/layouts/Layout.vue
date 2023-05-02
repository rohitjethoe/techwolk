<template>
    <Header />
    <main class="font-sarabun text-berryBlack">
        <slot/>
    </main>
    <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: 'Layout',
    components: {
        Header, Footer
    }
}
</script>

<style scoped>
main {
    min-height: calc(100vh - 80px - 96px)
}
</style>