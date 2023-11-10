import {tansParams} from "~/server/utils/urlUtils";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // console.log(body)

    // Use the GET parameters to make a GET request to `/album/list`
    const response = await fetch(`https://admin.aiavr.uk/findImage/add`,{body:body});
    const dataJson = await response.json();
    return {
        code:dataJson.code,
        message: dataJson.message,
        data: dataJson.data,
    };
});
