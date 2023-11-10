import {tansParams} from "~/server/utils/urlUtils";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    // Use the GET parameters to make a GET request to `/album/list`
    const response = await fetch(`https://admin.aiavr.uk/album/error?id=`+query.id);
    const dataJson = await response.json();
    // console.log(dataJson.data)
    return {
        code:dataJson.code,
        data: dataJson.data,
    };
});
