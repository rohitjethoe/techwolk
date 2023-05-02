import pinia from '@/stores/index.js'

export function registerPlugins(app) {
    app.use(pinia)
}