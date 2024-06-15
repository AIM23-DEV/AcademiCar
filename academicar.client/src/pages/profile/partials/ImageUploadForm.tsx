import {ChangeEvent} from "react";
import {Button} from "../../../components/Buttons.tsx";
import {Card} from "../../../components/Cards.tsx";
//import { BlockBlobClient} from "@azure/storage-blob";
import axios from "axios";
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
    const crypto = require('crypto');

 

  //  const sasUrl = "https://academicar.blob.core.windows.net/profile-images?sp=rw&st=2024-06-15T00:09:52Z&se=2024-06-15T08:09:52Z&sv=2022-11-02&sr=c&sig=79OlX2WBKzJ506j7pmn44jV8IpDYGdoEt9ffjkPBNWk%3D";
    const uploadFileToBlob = async (file:File) => {
       
        try {
            //   const blockBlobClient = new BlockBlobClient(sasUrl);

        // Fetch the file as an ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();

            // Upload the file
            /*    await blockBlobClient.uploadData(arrayBuffer, {
                    blobHTTPHeaders: {
                        blobContentType: selectedFile.type,
                        blobContentDisposition: `attachment; filename="${selectedFile.name}"`
                    }
                });
    
                console.log('Upload successful');
    if (!arrayBuffer || arrayBuffer.byteLength < 1 || arrayBuffer.byteLength > 256000) {
                    throw new Error('File size must be between 1 byte and 256 KB');
                }
    */
            
            const accountName = 'academicar';
            const accountKey = 'mNaipDioJQ1IoDwVaR7BKDXgm+RYRX6IqlW4dXBvkBA63yOpteGM8jqUWAF4nEMiURmrPf43XphD+AStZeKFtA==';
            const blobName = file.name;
            const containerName = 'profile-images';
            const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
            const method = 'PUT';
            const now = new Date().toUTCString();
            const contentLength = arrayBuffer.byteLength;
            const contentType = file.type;

            const generateAuthorizationHeader = (accountName:String, accountKey:String, 
                                                 method:String, now:String, contentLength:Number, 
                                                 contentType:String, containerName:String, blobName:String) => {
                const stringToSign =
                    `${method}\n\n\n${contentLength}\n\n${contentType}\n\n\n\n\n\n\nx-ms-date:${now}\nx-ms-version:2020-04-08\n/${accountName}/${containerName}/${blobName}`;

                const signature = crypto.createHmac('sha256', Buffer.from(accountKey, 'base64'))
                    .update(stringToSign, 'utf8')
                    .digest('base64');

                return `SharedKey ${accountName}:${signature}`;
            };


            const authorizationHeader = generateAuthorizationHeader(accountName, accountKey, method, now, contentLength, contentType, containerName, blobName);

            const headers = {
                'x-ms-date': now,
                'x-ms-version': '2020-04-08',
                'Content-Length': contentLength,
                'Content-Type': contentType,
                'x-ms-blob-type': 'BlockBlob',
                'Authorization': authorizationHeader,
                'x-ms-blob-content-disposition': `attachment; filename="${file.name}"`,
            };

            // Upload the file
            const response = await axios.put(url, arrayBuffer, { headers });
            console.log('Upload successful', response.data);

        } catch (error){
            console.log(`Error uploading file`)
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
