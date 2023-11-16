
export default defineSitemapEventHandler(async () => {
    try {
        let urls=[];
        for(let i=1;i<20;i++) {
            const response = await fetch('http://127.0.0.1:8098/album/list?page='+i.toString());
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
        console.log(JSON.stringify(urls))
        return urls;
    } catch (error) {
        console.error('Fetch Error:', error);
        return [];
    }
});