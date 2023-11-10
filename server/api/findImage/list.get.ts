
export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    // Use the GET parameters to make a GET request to `/album/list`
    const response = await fetch(`https://admin.aiavr.uk/findImage/list`);
    const dataJson = await response.json();
    // console.log(dataJson.data)
    return {
        code:dataJson.code,
        message: "Album list retrieved!",
        data: dataJson.data,
        total: dataJson.total,
    };
});
