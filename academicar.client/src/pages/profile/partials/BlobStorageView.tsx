
import {Card} from "../../../components/Cards.tsx";
import {
    AnonymousCredential,
    BlockBlobClient,
    ContainerSASPermissions,
    generateBlobSASQueryParameters,
    StorageSharedKeyCredential
} from "@azure/storage-blob";
import {Button} from "../../../components/Buttons.tsx";
import {ChangeEvent} from "react";

export const BlobStorageView = () => {
 
    const { extractConnectionStringParts } = require('../../../../utils.js');
    const AZURE_STORAGE_CONNECTION_STRING =
        "DefaultEndpointsProtocol=https;AccountName=academicar;AccountKey=mNaipDioJQ1IoDwVaR7BKDXgm+RYRX6IqlW4dXBvkBA63yOpteGM8jqUWAF4nEMiURmrPf43XphD+AStZeKFtA==;EndpointSuffix=core.windows.net";
    const permissions = 'c';
    const container = 'profile-images';
    const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('handleFileSelection');
        const {target} = event;

        console.log(`Blob-process.env.AzureWebJobsStorage: ${AZURE_STORAGE_CONNECTION_STRING}`);
        console.log(`process.env.AzureWebJobsStorage: ${process.env.AzureWebJobsStorage}`);
        
        if (!(target instanceof HTMLInputElement)) return;
        if (
            target?.files === null ||
            target?.files?.length === 0 ||
            target?.files[0] === null
        )
            return;
        
        const fileName = buildBlobName(target?.files[0]);
        console.log(`Blob filename = ${fileName}`)
       
        const token = generateSasToken(process.env.AzureWebJobsStorage, container, permissions);
        console.log(`Blob-Token: sasKey = ${token.sasKey}\n url = ${token.url.toString()}`);
        
        blobUpload(target.files[0], token.url, container, token.sasKey);
        }
  /*  async function startUpload(context:any) {
        const permissions = 'c';
        const container = 'profile-images';
        context.res = {
            body: generateSasToken(process.env.AzureWebJobsStorage, container, permissions)
        };
        context.done();
    };*/

    function generateSasToken(connectionString:any, container:string, permissions:string) {
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


    function blobUpload (file:File, url:URL, container:String, sasKey:String) {
        var blobName = buildBlobName(file);
        var login = `${url}/${container}/${blobName}?${sasKey}`;
        var blockBlobClient = new BlockBlobClient(login, new AnonymousCredential());
        blockBlobClient.uploadFile(file.name);
    }

    function buildBlobName(file:File) {
        var filename = file.name.substring(0, file.name.lastIndexOf('.'));
        var ext = file.name.substring(file.name.lastIndexOf('.'));
        return filename + '_' + Math.random().toString(16).slice(2) + ext;
    }
    
    return (
        <>
            <Card label="lob Storage" className="mt-6">

                <div className="w-full flex flex-col items-center justify-center pt-32">
                    <h1 className="headline-1 text-center">Fehler 404 - Seite nicht gefunden</h1>
                    <input type="file" className={"col-span-full"} onChange={handleFileSelection}/>
                    <Button
                        variant={"primary"}
                        text={"Upload Image"}
                        type={"submit"}
                        className={"col-span-full"}
                    />
                </div>

            </Card>
        </>
    );
};
