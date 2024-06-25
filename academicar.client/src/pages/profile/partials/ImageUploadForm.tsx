import {ChangeEvent, useState} from "react";
import {Button} from "../../../components/Buttons.tsx";
import {Card} from "../../../components/Cards.tsx";
import {BlockBlobClient} from "@azure/storage-blob";
/*
import request, {AxiosResponse} from "axios";

type ListResponse = {
    list: string[];
};
*/
export const ImageUploadForm = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [sasTokenUrl, setSasTokenUrl] = useState<string>('');
 //   const [uploadStatus, setUploadStatus] = useState<string>('');
   // const [list, setList] = useState<string[]>([]);
   
    const blobUrl = "https://academicar.blob.core.windows.net";
    const container = "profile-images";
    const sasToken = "si=profile-images-permissions&sv=2022-11-02&sr=c&sig=hFROEUqanwqG3SSUn%2BxZb0HtCaTeokFCo7PdsaKy%2F0k%3D";
    
    const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('handleFileSelection');
        const {target} = event;

        if (!(target instanceof HTMLInputElement)) return;
        if (target?.files === null || target?.files?.length === 0 || target?.files[0] === null)
            return;

        setSelectedFile(target?.files[0]);
        // resetstring
        setSasTokenUrl(`${blobUrl}/${container}/${target?.files[0].name}?${sasToken}`);
    };
        const handleFileUpload = () => {
            console.log('handleFileUpload');
            if (sasTokenUrl === '') return;
            console.log(`sasTokenUrl: ${sasTokenUrl}`);
            
            convertFileToArrayBuffer(selectedFile as File)
                .then(async (fileArrayBuffer) => {
                    if (fileArrayBuffer === null || fileArrayBuffer.byteLength < 1 || fileArrayBuffer.byteLength > 256000)
                        return;

                    const blockBlobClient = new BlockBlobClient(sasTokenUrl);
                    const uploadBlobResponse = await blockBlobClient.uploadData(fileArrayBuffer);
                    console.log(`uploadBlobResponse - status: ${uploadBlobResponse._response.status}`);
                });
/*                .then(() => {
                    //     setUploadStatus('Successfully finished upload');
                    console.log('Successfully finished upload');
                    return request.get(`/api/list?container=${container}`);
                })
                .then((result: AxiosResponse<ListResponse>) => {
                    // Axios response
                    const {data} = result;
                    
                    const {list} = data;
                    setList(list);
                })
                .catch((error: unknown) => {
                    if (error instanceof Error) {
                        const {message, stack} = error;
                        //   setUploadStatus(
                        console.log(
                            `Failed to finish upload with error : ${message} ${stack || ''}`
                        );
                    } else {
                        // setUploadStatus(error as string);
                        console.log(error as string);
                    }
                });
            console.log(`list = ${list.toString()}`);
    */    }
        
        const convertStringToArrayBuffer = (str: string) => {
            const textEncoder = new TextEncoder();
            return textEncoder.encode(str).buffer;
        };
  
    function convertFileToArrayBuffer(file: File): Promise<ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
            if (!file || !file.name) {
                reject(new Error('Invalid or missing file.'));
            }
            const reader = new FileReader();

            reader.onload = () => {
                const arrayBuffer: ArrayBuffer | null | string = reader.result;
                if (arrayBuffer === null) {
                    resolve(null);
                    return;
                }
                if (typeof arrayBuffer === 'string') {
                    resolve(convertStringToArrayBuffer(arrayBuffer));
                    return;
                }
                if (!arrayBuffer) {
                    reject(new Error('Failed to read file into ArrayBuffer.'));
                    return;
                }
                resolve(arrayBuffer);
            };
            reader.onerror = () => {
                reject(new Error('Error reading file.'));
            };
            reader.readAsArrayBuffer(file);
        });
    }
    
    return (
        <div>
            <Card  className="mt-6">
                <form aria-label="Suche" className="w-full grid grid-cols-12 gap-4" encType="multipart/form-data"
                    method={"PUT"} onSubmit={handleFileUpload}>
                    <input type="file" className={"col-span-full"} onChange={handleFileSelection}/>
                    <Button variant={"primary"} text={"Upload Image"} type={"submit"} className={"col-span-full"}/>
                </form>
            </Card>
        </div>
    );
};
