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
const sasUrl = "https://academicar.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=c&sp=rwdlacupiytfx&se=2024-06-15T10:04:03Z&st=2024-06-15T02:04:03Z&spr=https&sig=and%2BWbKzZeBXVymd%2FsQQFl7NTqOCPZ%2FcAqYSJ5vz%2BOg%3D";

export const ImageUploadForm = () => {
    const [selectedFile, setSelectedFile] = useState<File|null>(null);
    // @ts-ignore
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
        setSelectedFile(target?.files[0]);
        console.log(`Selected file: ${selectedFile?.name}`);
        if(selectedFile != null)
            uploadFileToBlob(selectedFile);
    };
  
    
     const uploadFileToBlob = async (file:File) => {
         // Fetch the file as an ArrayBuffer
         const arrayBuffer = await file.arrayBuffer();
        try {
           const blockBlobClient = new BlockBlobClient(sasUrl);

           

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



    return (
        <Card label="Suche" className="mt-6">
            <form aria-label="Suche" className="w-full grid grid-cols-12 gap-4">
                <input type="file" className={"col-span-full"} onChange={handleFileSelection} />
                <Button
                    variant={"primary"}
                    text={"Upload Image"}
                    type={"submit"}
                    className={"col-span-full"}
                />
                
            </form>
        </Card>
    );
};
