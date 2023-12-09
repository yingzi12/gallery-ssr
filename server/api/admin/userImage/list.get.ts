import {tansParams} from "~/server/utils/urlUtils";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const query = getQuery(event)
    const cookies = parseCookies(event)
    const token = cookies["token"]; // 从用户存储库中获取token
    // Use the GET parameters to make a GET request to `/album/list`
    const response = await fetch(config.public.baseUrl+`/admin/userImage/list?${tansParams(query)}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
    const dataJson = await response.json();
    console.log(dataJson.data)
    const sourceWeb=config.public.sourceWeb;
    const list= dataJson.data;
    for (let image of list) {
        console.log(image);
        try {
            image.url = await getBase64FromImageUrl(sourceWeb + image.imgUrl);
        } catch (error) {
            console.error('Error converting image:', error);
            image.url = ""; // 如果发生错误，则设置为空字符串
        }
    }
    console.log(dataJson.data)
    return {
        code:dataJson.code,
        message: "Album list retrieved!",
        data: list,
        total: dataJson.total,
    };
});
