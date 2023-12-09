export default defineEventHandler((event) => {
    console.log("defineEventHandler")

    console.log('New request: ' + getRequestURL(event))
})
