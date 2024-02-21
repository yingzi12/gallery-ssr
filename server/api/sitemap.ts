export default defineSitemapEventHandler(async (e) => {
    const posts = await Promise.all([
        {
            _path: '/see',
            modifiedAt: new Date(),
        }
    ]);
    const config = useRuntimeConfig();
    console.log("--------start----defineSitemapEventHandler--------------------")
    for(let i=1;i<2;i++) {
        // console.log(config.public.baseUrl+`/album/listSee?page=`+i.toString())
        const response = await fetch(config.public.baseUrl+`/userAlbum/list?pageNum=`+i.toString());
        const dataJson = await response.json();
        // console.log(dataJson.data)
        if (dataJson.code == 200) {
            // 假设API返回的是URL数组
            posts.push(...dataJson.data.map(item => ({
                _path: `/detail?aid=${item.id}`,
                modifiedAt: new Date(),
            })));
        } else {
            console.error('API Error:', dataJson.message);
        }
    }
    console.log("--------start--2--defineSitemapEventHandler--------------------")
    for(let i=1;i<10;i++) {
        const response = await fetch(config.public.baseUrl+`/album/list?pageNum=`+i.toString()+`&title=秀人网`);
        // console.log(config.public.baseUrl+`/album/list?page=`+i.toString()+`&title=秀人网`)

        const dataJson = await response.json();
        // console.log(dataJson.data)
        if (dataJson.code == 200) {
            // 假设API返回的是URL数组
            posts.push(...dataJson.data.map(item => ({
                _path: `/detail?aid=${item.id}`,
                modifiedAt: new Date(),
            })));
        } else {
            console.error('API Error:', dataJson.message);
        }
    }
    for(let i=1;i<10;i++) {
        const response = await fetch(config.public.baseUrl+`/album/list?pageNum=`+i.toString());
        // console.log(config.public.baseUrl+`/album/list?page=`+i.toString())

        const dataJson = await response.json();
        // console.log(dataJson.data)
        if (dataJson.code == 200) {
            // 假设API返回的是URL数组
            posts.push(...dataJson.data.map(item => ({
                _path: `/detail?aid=${item.id}`,
                modifiedAt: new Date(),
            })));
        } else {
            console.error('API Error:', dataJson.message);
        }
    }
    for(let i=1;i<10;i++) {
        // console.log(config.public.baseUrl+`/album/listSee?page=`+i.toString())
        const response = await fetch(config.public.baseUrl+`/album/listSee?pageNum=`+i.toString());
        const dataJson = await response.json();
        // console.log(dataJson.data)
        if (dataJson.code == 200) {
            // 假设API返回的是URL数组
            posts.push(...dataJson.data.map(item => ({
                _path: `/detail?aid=${item.id}`,
                modifiedAt: new Date(),
            })));
        } else {
            console.error('API Error:', dataJson.message);
        }
    }

    console.log("--------stop----defineSitemapEventHandler--------------------")

    return posts.map((p) => {
        return {
            loc: p._path,
            lastmod: p.modifiedAt,
        };
    });
});
