import {tansParams} from "~/server/utils/urlUtils";

export default defineEventHandler(async (event) => {
    console.log("---------edit-------")
    const config = useRuntimeConfig();
    const cookies = parseCookies(event)
    console.log(cookies)

    const token = cookies["token"]; // 从用户存储库中获取token
    console.log("token:"+token)
    const body = await readBody(event)
    // console.log(body)

    // Use the GET parameters to make a GET request to `/album/list`
    const response = await fetch(config.public.baseUrl+`/admin/userSettingVip/edit`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }
    );
    console.log(response)
    const dataJson = await response.json();
    return {
        code:dataJson.code,
        message: dataJson.message,
        data: dataJson.data,
    };
});
