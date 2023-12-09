export default defineEventHandler((event) => {
    console.log("log")

    console.log('New request: ' + getRequestURL(event))
})
