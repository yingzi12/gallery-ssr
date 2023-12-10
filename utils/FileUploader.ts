// FileUploader.ts
import ssrCache from "~/utils/cache";

class FileUploader {
    private baseUrl: string;
    private onProgress: (chunkNumber: number, totalChunks: number) => void;

    constructor(baseUrl: string, onProgress: (chunkNumber: number, totalChunks: number) => void) {
        this.baseUrl = baseUrl;
        this.onProgress = onProgress;
    }

    async checkChunkExists(identifier: string, chunkNumber: number,token:string): Promise<boolean> {
        try {
            var url=`${this.baseUrl}/userVideo/check?identifier=${identifier}&chunkNumber=${chunkNumber}`;
            const response = await fetch(url,{
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const dataJson = await response.json();

            console.log(dataJson)
            console.log(dataJson.code)
            if(dataJson.code == 200){
                return true;
            }else {
                return false;
            }
        } catch (error) {
            console.error('Error checking chunk:', error);
            return false;
        }
    }

    async uploadChunk(fileChunk: Blob, identifier: string, chunkNumber: number, totalChunks: number,token:string): Promise<void> {
        const exists = await this.checkChunkExists(identifier, chunkNumber,token);
        if (exists) {
            console.log(`Chunk ${chunkNumber} already uploaded.`);
            this.onProgress(chunkNumber, totalChunks);
            return;
        }

        const formData = new FormData();
        formData.append('file', fileChunk);
        formData.append('chunkNumber', chunkNumber.toString());
        formData.append('totalChunks', totalChunks.toString());
        formData.append('identifier', identifier);
        var url=`${this.baseUrl}/userVideo/upload`;
        await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        this.onProgress(chunkNumber, totalChunks);
    }

    async uploadFile(file: File, identifier: string,token:string ="", chunkSize: number = 1024 * 1024): Promise<void> {
        const totalChunks = Math.ceil(file.size / chunkSize);
        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);

            await this.uploadChunk(chunk, identifier, i, totalChunks,token);
        }
    }
}
export default FileUploader
// export default FileUploader;

// import FileUploader from './FileUploader';

// // ...
//
// const uploader = new FileUploader('http://localhost:3000/api/upload', (chunkNumber, totalChunks) => {
//     console.log(`Uploading chunk ${chunkNumber} of ${totalChunks}`);
// });
//
// const file = /* 获取文件对象 */;
// const identifier = 'unique-file-id';
// uploader.uploadFile(file, identifier)
//     .then(() => console.log('Upload complete'))
//     .catch(error => console.error('Upload failed', error));