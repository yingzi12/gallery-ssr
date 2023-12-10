import { Request, Response, NextFunction } from 'express'
import ssrCache from '~/utils/cache'

export default function (req: Request, res: Response, next: NextFunction) {
    const url = req.url
    if (ssrCache.has(url)) {
        res.setHeader('x-cache-hit', 'true')
        res.end(ssrCache.get(url))
        return
    }

    const originalEnd = res.end
    res.end = (data: any) => {
        if (res.statusCode === 200) {
            ssrCache.set(url, data)
        }
        originalEnd.call(res, data)
    }

    next()
}