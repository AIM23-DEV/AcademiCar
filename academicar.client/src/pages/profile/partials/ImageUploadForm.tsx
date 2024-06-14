import {ChangeEvent, useState} from "react";
import {Button} from "../../../components/Buttons.tsx";
import {Card} from "../../../components/Cards.tsx";
import {BlobServiceClient} from "@azure/storage-blob";


export const ImageUploadForm = () => {
    const [selectedFile, setSelectedFile] = useState<File|null>(null);
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
        
    };

    async function handleUpload() {

        console.log(`handleUpload: ${selectedFile}`);
        if(selectedFile == null)
            return;

        const connectionString = 'DefaultEndpointsProtocol=https;AccountName=academicar;AccountKey=mNaipDioJQ1IoDwVaR7BKDXgm+RYRX6IqlW4dXBvkBA63yOpteGM8jqUWAF4nEMiURmrPf43XphD+AStZeKFtA==;EndpointSuffix=core.windows.net';
        const containerName = 'academicar';

        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        console.log(`blobServiceClient-accountName: ${blobServiceClient.accountName}`);
        console.log(`blobServiceClient-url: ${blobServiceClient.url}`);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        console.log(`containerClient-accountName: ${containerClient.accountName}`);
        console.log(`containerClient-containerName: ${containerClient.containerName}`);
        console.log(`containerClient-url: ${containerClient.url}`);

      
// Example for file upload
            const blobName = `photos/${selectedFile.name}`;
            console.log(`Uploading with blobname: ${blobName}`);
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            try {
                await blockBlobClient.uploadData(selectedFile);
            }catch(error){
                // @ts-ignore
                console.log(`Error: ${error.message}`);
            }
        }
    

    return (
        <Card label="Suche" className="mt-6">
            <form aria-label="Suche" className="w-full grid grid-cols-12 gap-4">
                <input type="file" className={"col-span-full"} onChange={handleFileSelection} />

             
                
                <Button
                    variant={"primary"}
                    text={"Upload Image"}
                    type={"submit"}
                    className={"col-span-full"}
                    onClick={handleUpload}
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
