import {tansParams} from "~/server/utils/urlUtils";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const query = getQuery(event)
    const cookies = parseCookies(event)
    const token = cookies["token"]; // 从用户存储库中获取token
    // Use the GET parameters to make a GET request to `/album/list`
    // const response = await fetch(config.public.baseUrl+`/album/info?id=`+query.id);
    const response = await fetch(config.public.baseUrl+`/admin/userVideo/updateIsFree?${tansParams(query)}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
    const dataJson = await response.json();
    // console.log(dataJson.data)
    return {
        code:dataJson.code,
        message: dataJson.message,
        data: dataJson.data,
    };
});
