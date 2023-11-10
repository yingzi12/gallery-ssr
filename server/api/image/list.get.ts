import {tansParams} from "~/server/utils/urlUtils";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const response = await fetch(`https://admin.aiavr.uk/image/list?${tansParams(query)}`);
    const dataJson = await response.json();
    return {
        code:dataJson.code,
        message: "Album list retrieved!",
        data: dataJson.data,
        total: dataJson.total,
    };
});
