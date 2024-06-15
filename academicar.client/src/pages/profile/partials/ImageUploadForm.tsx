import {ChangeEvent, useState} from "react";
import {Button} from "../../../components/Buttons.tsx";
import {Card} from "../../../components/Cards.tsx";
import { BlockBlobClient} from "@azure/storage-blob";
/*
import { ClientSecretCredential } from '@azure/identity';

const clientId = 'your_client_id_here';
const clientSecret = 'your_client_secret_here';

const credential = new ClientSecretCredential(clientId, clientSecret);*/
// Use the credential to access Azure Blob Storage

/*const convertFileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
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
};*/
export const ImageUploadForm = () => {
   // const [selectedFile, setSelectedFile] = useState<File|null>(null);
    const [list] = useState<string[]>([]);
        // Other component code...
    
    const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;

        if (!(target instanceof HTMLInputElement)) return;
        if (
            target?.files === null ||
            target?.files?.length === 0 ||
            target?.files[0] === null
        )
            return;
        console.log(`Selected file: ${target?.files[0].name}`);
       // setSelectedFile(target?.files[0]);
        uploadFileToBlob(target?.files[0])
        /*
        convertFileToArrayBuffer(target?.files[0]).then((fileArrayBuffer) => {
            if (fileArrayBuffer === null ||
        fileArrayBuffer.byteLength < 1 ||
        fileArrayBuffer.byteLength > 256000
    )
        return;

        const blockBlobClient = new BlockBlobClient("https://academicar.blob.core.windows.net/profile-images?sp=racwdl&st=2024-06-15T00:09:52Z&se=2024-06-15T08:09:52Z&sv=2022-11-02&sr=c&sig=L45L1BM15PFjqVVKKy7xyJo%2FCDLmry9Y1KyHxkGgjA4%3D");
        return blockBlobClient.uploadData(fileArrayBuffer);
    });
        */
        
    };
   
    const sasUrl = "https://academicar.blob.core.windows.net/profile-images?sp=racwdl&st=2024-06-15T00:09:52Z&se=2024-06-15T08:09:52Z&sv=2022-11-02&sr=c&sig=L45L1BM15PFjqVVKKy7xyJo%2FCDLmry9Y1KyHxkGgjA4%3D";
    const uploadFileToBlob = async (file:File) => {
        try {
            const blockBlobClient = new BlockBlobClient(sasUrl);

            // Fetch the file as an ArrayBuffer
            const arrayBuffer = await file.arrayBuffer();

            // Upload the file
            await blockBlobClient.uploadData(arrayBuffer, {
                blobHTTPHeaders: {
                    blobContentType: file.type,
                    blobContentDisposition: `attachment; filename="${file.name}"`
                }
            });

            console.log('Upload successful');
        } catch (error) {
            // @ts-ignore
            console.error('Error uploading file:', error.message);
        }
    };
 /*   async function handleUpload(selectedFile:File) {

        console.log(`handleUpload: ${selectedFile.name}`);
        if(!selectedFile)
            return;

        const connectionString = 'DefaultEndpointsProtocol=https;AccountName=academicar;AccountKey=mNaipDioJQ1IoDwVaR7BKDXgm+RYRX6IqlW4dXBvkBA63yOpteGM8jqUWAF4nEMiURmrPf43XphD+AStZeKFtA==;EndpointSuffix=core.windows.net';
        const containerName = 'profile-images';

        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
       
        const containerClient = blobServiceClient.getContainerClient(containerName);
    /*    console.log(`blobServiceClient-accountName: ${blobServiceClient.accountName}`);
        console.log(`blobServiceClient-url: ${blobServiceClient.url}`);
        console.log(`containerClient-accountName: ${containerClient.accountName}`);
        console.log(`containerClient-containerName: ${containerClient.containerName}`);
        console.log(`containerClient-url: ${containerClient.url}`);
*/
      
// Example for file upload
    /*        const blobName = `${selectedFile.name}`;
            console.log(`Uploading with blobname: ${blobName}`);
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            try {
                const response = await blockBlobClient.uploadData(selectedFile);
                if(response._response.status == 200){
                    console.log(`Response: OK`)
                }else {
                    console.error('Error fetching blob:', response.errorCode, response._response.status);
                }
            }catch(error){
                // @ts-ignore
                console.log(`Error: ${error.message}`);
            }
        }
    const blobUrl = 'https://academicar.blob.core.windows.net/profile-images/test.jpg';
*/
// Create a function to download the blob
    async function downloadBlob() {/*
        try {
            const response = await fetch(blobUrl);
            if (response.ok) {
                // Get the blob content
                const blobContent = await response.blob();
                // Do something with the blob content (e.g., display, save, etc.)
                console.log('Blob content:', blobContent);
            } else {
                console.error('Error fetching blob:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching blob:', error);
        }
 */   }


    return (
        <Card label="Suche" className="mt-6">
            <form aria-label="Suche" className="w-full grid grid-cols-12 gap-4">
                <input type="file" className={"col-span-full"} onChange={handleFileSelection} />

             
                
                <Button
                    variant={"primary"}
                    text={"Upload Image"}
                    type={"submit"}
                    className={"col-span-full"}
                    onClick={downloadBlob}
                />
                

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
