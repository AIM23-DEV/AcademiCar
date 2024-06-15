import {ChangeEvent, useState} from "react";
import {Button} from "../../../components/Buttons.tsx";
import {Card} from "../../../components/Cards.tsx";
import axios, {AxiosResponse} from "axios";
import {BlockBlobClient} from "@azure/storage-blob";

// Used only for local development
const API_SERVER = import.meta.env.VITE_API_SERVER as string;

const request = axios.create({
    baseURL: API_SERVER,
    headers: {
        'Content-type': 'application/json'
    }
});

type SasResponse = {
    url: string;
};
interface ListResponse {
    list: string[];
}

const convertFileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as ArrayBuffer);
        };
        reader.onerror = () => {
            reject(new Error('Failed to read file as ArrayBuffer'));
        };
        reader.readAsArrayBuffer(file);
    });
};
export const SASForm = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [sasTokenUrl, setSasTokenUrl] = useState<string>('');
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [list, setList] = useState<string[]>([]);


    const uploadProfileImage = async () => {
        try{
           // const promises = [];
            if (sasTokenUrl === ''){
                // return;
                console.log("set SAS token ");
                setSasTokenUrl("https://academicar.blob.core.windows.net/profile-images?sp=racwdl&st=2024-06-15T00:09:52Z&se=2024-06-15T08:09:52Z&sv=2022-11-02&sr=c&sig=L45L1BM15PFjqVVKKy7xyJo%2FCDLmry9Y1KyHxkGgjA4%3D");
            }

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
                    setUploadStatus('Successfully finished upload');
                    const containerName = "profile-images";
                    return request.get(`/api/list?container=${containerName}`);
                })
                .then((result: AxiosResponse<ListResponse>) => {
                    // Axios response
                    const { data } = result;
                    const { list } = data;
                    setList(list);
                })
        }
        catch (error){
            // @ts-ignore
            alert(error.message);
            // @ts-ignore
            if (error instanceof  Error) {
                setUploadStatus(
                    `Failed to finish upload with error : ${error.message}`
                );
            } else {
                setUploadStatus(error as string)
            }
        }
    };


    const handleFileSasToken = () => {
        //   const permission = 'w'; //write
        //   const timerange = 5; //minutes

        if (!selectedFile) return;

        request
            .put(
                `https://academicar.blob.core.windows.net/profile-images?sv=2022-11-02&ss=bfqt&srt=o&sp=rwdlacupiytfx&se=2024-06-09T21:23:51Z&st=2024-06-09T13:23:51Z&spr=https&sig=GCh56CQUO%2FwS%2BSzRVBzHiEZBjrqgZMqjJrnT1CjVe3I%3D`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((result: AxiosResponse<SasResponse>) => {
                const { data } = result;
                const { url } = data;
                setSasTokenUrl(url);
            })
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    const { message, stack } = error;
                    setSasTokenUrl(`Error getting sas token: ${message} ${stack || ''}`);
                } else {
                    setUploadStatus(error as string);
                }
            });
    };


    const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;

        if (!(target instanceof HTMLInputElement)) return;
        if (
            target?.files === null ||
            target?.files?.length === 0 ||
            target?.files[0] === null
        )
            return;

        setSelectedFile(target?.files[0]);

        // reset
        setSasTokenUrl('');
        setUploadStatus('');
    };

    return (
        <Card label="Suche" className="mt-6">
            <form aria-label="Suche" className="w-full grid grid-cols-12 gap-4">
                <input type="file" className={"col-span-full"} onChange={handleFileSelection} />

                <Button
                    variant={"secondary"}
                    text={"Get SAS Token"}
                    className={"col-span-full"}
                    onClick={handleFileSasToken}
                />

                {sasTokenUrl && (
                    <div className="body-2">SAS-Token URL: {sasTokenUrl}</div>
                )}

                <Button
                    variant={"primary"}
                    text={"Upload Image"}
                    type={"submit"}
                    className={"col-span-full"}
                    onClick={uploadProfileImage}
                />

                {uploadStatus && (
                    <div className="body-2">
                        {uploadStatus}
                    </div>
                )}

                {list.map((item) => (

                    <Card>
                        {item.endsWith('.jpg') ||
                        item.endsWith('.png') ||
                        item.endsWith('.jpeg') ||
                        item.endsWith('.gif') ? (
                            <img
                                src={item}
                                alt="Profile Avatar"
                                className="rounded-full w-32 h-32"
                            />
                        ) : (
                            <div className="body-1" >
                                {item}
                            </div>
                        )}
                    </Card>

                ))}
            </form>
        </Card>
    );
};
