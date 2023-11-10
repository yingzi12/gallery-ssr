import {tansParams} from "~/server/utils/urlUtils";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const response = await fetch(`https://admin.aiavr.uk/album/listSee?${tansParams(query)}`);
    const dataJson = await response.json();
    // console.log(dataJson.data)
    return {
        code:dataJson.code,
        message: "Album list retrieved!",
        data: dataJson.data,
        total: dataJson.total,
    };
});
