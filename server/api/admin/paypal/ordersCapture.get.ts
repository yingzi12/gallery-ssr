export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    // 获取请求头
    const headers = event.req.headers;
    // 从请求头中获取 token
    const token = headers.authorization ? headers.authorization.split(' ')[1] : null;
    const query = getQuery(event)
    const change= headers.change ? headers.change:"pc";
    //console.log("--------------------change----------"+change)

    // Use the GET parameters to make a GET request to `/album/list`
    const response = await fetch(config.public.baseUrl+`/admin/payments/ordersCapture?orderId=${query.orderId}`,{
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'change': `${change}`,
            },
        }
    );
    const dataJson = await response.json();
    return {
        code:dataJson.code,
        message: dataJson.msg,
        data: dataJson.data,
    };
});
