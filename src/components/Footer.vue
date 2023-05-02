<template>
    <footer>
        <div class="w-11/12 mx-auto pt-4">
            <div class="text-center">
                Zie je een foutje op de site? Fix het op onze open source
                <a class="font-semibold" target="_blank" href="https://github.com/rohitjethoe/techwolk">GitHub
                repository</a>.
            </div>
            <div class="py-4 text-center">
                &copy; {{ new Date().getFullYear() }} Techwolk.nl 
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>