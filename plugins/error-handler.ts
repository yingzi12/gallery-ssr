export default defineNuxtPlugin((nuxtApp) => {
    console.log("------------error handler--")
    nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
        console.log("--------------errorHandler")
        console.log(error,instance,info)
        // handle error, e.g. report to a service
    }

    // Also possible
    nuxtApp.hook('vue:error', (error, instance, info) => {
        console.log("--------------error")
        console.log(error,instance,info)
        // handle error, e.g. report to a service
    })

})
