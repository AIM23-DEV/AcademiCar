import {ChangeEvent, useState} from "react";
import {Button} from "../../../components/Buttons.tsx";
import {Card} from "../../../components/Cards.tsx";
import request, {AxiosResponse} from "axios";
import {BlockBlobClient} from "@azure/storage-blob";
import {Textarea} from "@headlessui/react";
/*
type SasResponse = {
    url: string;
};*/
type ListResponse = {
    list: string[];
};

export const ImageUploadForm = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [sasTokenUrl, setSasTokenUrl] = useState<string>('');
 //   const [uploadStatus, setUploadStatus] = useState<string>('');
    const [list, setList] = useState<string[]>([]);
   
    const blobUrl = "https://academicar.blob.core.windows.net";
    const container = "upload";
    const sasToken = "sv=2022-11-02&ss=bfqt&srt=co&sp=rwdlacupiytfx&se=2024-06-23T01:55:32Z&st=2024-06-22T17:55:32Z&spr=https&sig=OO9AQsjqev0DyZwwWtvfPlLoe77m%2BBtSICIqsLOtVZA%3D";

  //  const imgSasUrl = "https://academicar.blob.core.windows.net/profile-images?si=profile-images-permissions&spr=https&sv=2022-11-02&sr=c&sig=m%2Bfs0w4HEjXOgCoFFik%2B83qUyMCYefu0zXfYsIt9ncY%3D";
 
    const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('handleFileSelection');

        const {target} = event;

        if (!(target instanceof HTMLInputElement)) return;
        if (
            target?.files === null ||
            target?.files?.length === 0 ||
            target?.files[0] === null
        )
            return;

        setSelectedFile(target?.files[0]);

        // resetstring
        setSasTokenUrl(`${blobUrl}/${container}/${target?.files[0].name}?${sasToken}`);
    };

    
        const handleFileUpload = () => {

            if (sasTokenUrl === '') return;
        
            convertFileToArrayBuffer(selectedFile as File)
                .then((fileArrayBuffer) => {
                    if (
                        fileArrayBuffer === null ||
                        fileArrayBuffer.byteLength < 1 ||
                        fileArrayBuffer.byteLength > 256000
                    )
                        return;

                    const blockBlobClient = new BlockBlobClient(sasTokenUrl);
                    return blockBlobClient.uploadData(fileArrayBuffer);
                })
                .then(() => {
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
        };


        const convertStringToArrayBuffer = (str: string) => {
            const textEncoder = new TextEncoder();
            return textEncoder.encode(str).buffer;
        };
    
    function convertFileToArrayBuffer(
        file: File
    ): Promise<ArrayBuffer | null> {
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
            <form aria-label="Suche" className="w-full grid grid-cols-12 gap-4" encType="multipart/form-data" method={"POST"} 
                  onSubmit={handleFileUpload}>
                <input type="file" className={"col-span-full"} onChange={handleFileSelection} />
                <Textarea >{sasTokenUrl}</Textarea>
                
                <Button
                    variant={"primary"}
                    text={"Upload Image"}
                    type={"submit"}
                    className={"col-span-full"}
                />
                
                
            </form>
        </Card>
          
        <li>
        {list.map((item) => (
                <Card>
                    {item.endsWith('.jpg') ||
                    item.endsWith('.png') ||
                    item.endsWith('.jpeg') ||
                    item.endsWith('.gif') ? (
                        <img src={item} alt={item} />
                    ) : (
                        <div className="body-1" >
                            {item}
                        </div>
                    )}
                </Card>
            ))};
        </li>
        </div>
    );
};
