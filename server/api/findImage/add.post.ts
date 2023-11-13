import {tansParams} from "~/server/utils/urlUtils";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // console.log(body)

    // Use the GET parameters to make a GET request to `/album/list`
    const response = await fetch(`http://127.0.0.1:8098/findImage/add`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
           body: JSON.stringify(body
        )
    }
    );
    const dataJson = await response.json();
    return {
        code:dataJson.code,
        message: dataJson.message,
        data: dataJson.data,
    };
});
