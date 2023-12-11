import {tansParams} from "~/server/utils/urlUtils";

export default defineEventHandler(async (event) => {
    console.log("dataJson.data start")
    const config = useRuntimeConfig();
    const query = getQuery(event)
    // 获取请求头
    const headers = event.req.headers;
    // 从请求头中获取 token
    const token = headers.authorization ? headers.authorization.split(' ')[1] : null;
    // const token = cookies["token"]; // 从用户存储库中获取token
    // Use the GET parameters to make a GET request to `/album/list`
    const response = await fetch(config.public.baseUrl+`/admin/userAlbum/list?${tansParams(query)}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
    const dataJson = await response.json();
    console.log("dataJson.data end")
    return {
        code:dataJson.code,
        message: "Album list retrieved!",
        data: dataJson.data,
        total: dataJson.total,
    };
});
