
export default defineSitemapEventHandler(async () => {
    const config = useRuntimeConfig();
    try {
        let urls=[];
        for(let i=1;i<20;i++) {
            const response = await fetch(config.public.baseUrl+`/album/list?pageNum=`+i.toString()+`&title=秀人网`);
            // console.log(config.public.baseUrl+`/album/list?page=`+i.toString()+`&title=秀人网`)

            const dataJson = await response.json();
            // console.log(dataJson.data)
            if (dataJson.code == 200) {
                // 假设API返回的是URL数组
                urls.push(...dataJson.data.map(item => ({
                    loc: `/detail?aid=${item.id}`,
                    _sitemap: 'pages',
                })));
            } else {
                console.error('API Error:', dataJson.message);
            }
        }
        for(let i=1;i<20;i++) {
            const response = await fetch(config.public.baseUrl+`/album/list?pageNum=`+i.toString());
            // console.log(config.public.baseUrl+`/album/list?page=`+i.toString())

            const dataJson = await response.json();
            // console.log(dataJson.data)
            if (dataJson.code == 200) {
                // 假设API返回的是URL数组
                urls.push(...dataJson.data.map(item => ({
                    loc: `/detail?aid=${item.id}`,
                    _sitemap: 'pages',
                })));
            } else {
                console.error('API Error:', dataJson.message);
            }
        }
        for(let i=1;i<20;i++) {
            // console.log(config.public.baseUrl+`/album/listSee?page=`+i.toString())
            const response = await fetch(config.public.baseUrl+`/album/listSee?pageNum=`+i.toString());
            const dataJson = await response.json();
            // console.log(dataJson.data)
            if (dataJson.code == 200) {
                // 假设API返回的是URL数组
                urls.push(...dataJson.data.map(item => ({
                    loc: `/detail?aid=${item.id}`,
                    _sitemap: 'pages',
                })));
            } else {
                console.error('API Error:', dataJson.message);
            }
        }
        //console.log(JSON.stringify(urls))
        return urls;
    } catch (error) {
        console.error('Fetch Error:', error);
        return [];
    }
});