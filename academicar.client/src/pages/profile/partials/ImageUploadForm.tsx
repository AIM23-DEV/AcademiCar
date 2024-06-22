import {ChangeEvent, useState} from "react";
import {Button} from "../../../components/Buttons.tsx";
import {Card} from "../../../components/Cards.tsx";
import {
    AnonymousCredential,
    BlockBlobClient,
    ContainerSASPermissions,
    generateBlobSASQueryParameters,
    StorageSharedKeyCredential
} from "@azure/storage-blob";

export const ImageUploadForm = () => {
    const [selectedFile, setSelectedFile] = useState<File|null>(null);
    // @ts-ignore
    const [list] = useState<string[]>([]);
        // Other component code...
    const { extractConnectionStringParts } = require('../../../../utils.js');

    function generateSasToken(connectionString:any, container:string, permissions:string) {
        console.log('generateSasToken');
        const { accountKey, accountName, url } = extractConnectionStringParts(connectionString);
        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey.toString('base64'));

        var expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 2);

        const sasKey = generateBlobSASQueryParameters({
            containerName: container,
            permissions: ContainerSASPermissions.parse(permissions),
            expiresOn: expiryDate,
        }, sharedKeyCredential);

        return {
            sasKey: sasKey.toString(),
            url: url
        };
    }
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

        if (target.files.length >= 0) {
            setSelectedFile(target.files[0]);
            console.log(`target: items = ${target.files?.length}`)
            console.log(`target: name = ${target.files[0]?.name}\ntype = ${target.files[0]?.type}`)
         
            
            uploadFileToBlob(target?.files[0]).then(r => {
                console.log(`promise...`);
                if (r === null)
                    return;
                console.log(`promise: ${typeof (r)}`);
                console.log(`promise-sasKey = ${r.sasKey}`);
                console.log(`promise-url = ${r.url}`);
            });


            list.push(selectedFile?.name as string);
        }
    };

    function buildBlobName(file:File) {
        console.log('buildBlobName');
        var filename = file.name.substring(0, file.name.lastIndexOf('.'));
        var ext = file.name.substring(file.name.lastIndexOf('.'));
        return filename + '_' + Math.random().toString(16).slice(2) + ext;
    }
     async function uploadFileToBlob (file:File)  {
         console.log('uploadFileToBlob');
         const permissions = 'profile-images-permissions';
         const containerName = 'profile-images';
         const blobName = `${containerName}/${buildBlobName(file)}`;
        const sasToken = generateSasToken(process.env.AzureWebJobsStorage, blobName,permissions);
        

       //  const sasUrl = "https://academicar.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=c&sp=rwdlacupiytfx&se=2024-06-22T16:09:04Z&st=2024-06-22T08:09:04Z&spr=https&sig=Rvvx00Nlt8pi0QH5CHIY6GNlp0xSjYiperKlEJiUORQ%3D";
         blobUpload(file, sasToken.url, containerName, sasToken.sasKey);
         return sasToken;
    }
    function blobUpload (file:File, url:URL, container:String, sasKey:String) {
        console.log('blobUpload');
        var blobName = buildBlobName(file);
        var login = `${url}/${container}/${blobName}?${sasKey}`;
        var blockBlobClient = new BlockBlobClient(login, new AnonymousCredential());
        blockBlobClient.uploadFile(`${container}/${blobName}`);
    }
  /*
  async function handleUpload(selectedFile:File) {

      console.log(`handleUpload`);
     
      const connectionString = 'BlobEndpoint=https://academicar.blob.core.windows.net/;QueueEndpoint=https://academicar.queue.core.windows.net/;FileEndpoint=https://academicar.file.core.windows.net/;TableEndpoint=https://academicar.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=c&sp=rwdlacupiytfx&se=2024-06-15T10:04:03Z&st=2024-06-15T02:04:03Z&spr=https&sig=and%2BWbKzZeBXVymd%2FsQQFl7NTqOCPZ%2FcAqYSJ5vz%2BOg%3D';
      const containerName = 'profile-images';

     
          const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

          const containerClient = blobServiceClient.getContainerClient(containerName);


         
          // this uses our container we created earlier
     //     var containerClient = blobStorageClient.getContainerClient(containerName);
          let i= 0;
          let blobs = containerClient.listBlobsFlat();
          for await (const blob of blobs) {
             
              console.log(`Blob ${i++}: ${blob.name}`);
          }
      //    await createBlobInContainer(containerClient, file);

          /*    console.log(`blobServiceClient-accountName: ${blobServiceClient.accountName}`);
              console.log(`blobServiceClient-url: ${blobServiceClient.url}`);
              console.log(`containerClient-accountName: ${containerClient.accountName}`);
              console.log(`containerClient-containerName: ${containerClient.containerName}`);
              console.log(`containerClient-url: ${containerClient.url}`);
      */

// Example for file upload
  /*        const promises = [];
          const blobName = `profile-images/${selectedFile.name}`;
          console.log(`Uploading with blobname: ${blobName}`);
          const blockBlobClient = containerClient.getBlockBlobClient(blobName);
          try {
             
              const response = await blockBlobClient.uploadData(selectedFile);
            
              promises.push(response);
            
              if (response._response.status == 200) {
                  console.log(`Response: OK`)
              } else {
                  console.error('Error fetching blob:', response.errorCode, response._response.status);
              }
         
              return response;
          } catch (error) {
              // @ts-ignore
              console.log(`Error: ${error.message}`);
          }
      */
//   const blobUrl = 'https://academicar.blob.core.windows.net/profile-images/test.jpg';

     
  //}


    return (
        <Card label="Suche" className="mt-6">
            <form aria-label="Suche" className="w-full grid grid-cols-12 gap-4" encType="multipart/form-data" method={"POST"}>
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
