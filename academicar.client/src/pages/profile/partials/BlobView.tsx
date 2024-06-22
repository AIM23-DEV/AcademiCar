import{ChangeEvent} from 'react';
// we'll need InteractiveBrowserCredential here to force a user to sign-in through the browser
//import { DefaultAzureCredential  } from "@azure/identity";
// we're using these objects from the storage sdk - there are others for different needs
import { BlobServiceClient,  } from "@azure/storage-blob";
import {Button} from "../../../components/Buttons.tsx";



export const BlobView =() => {
   


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
                //  setSelectedFile(target.files[0]);
                console.log(`target: items = ${target.files?.length}`)
                console.log(`target: name = ${target.files[0]?.name}\ntype = ${target.files[0]?.type}`)
                handleUpload(target?.files[0]).then(r => {
                    console.log(`promise...`);
                    if (r === null)
                        return;
                    console.log(`promise: ${typeof (r)}`);
                  
                });
            }


        }
    
    
  
    async function handleUpload(selectedFile:File) {

        const AZURE_STORAGE_CONNECTION_STRING =
            "DefaultEndpointsProtocol=https;AccountName=academicar;AccountKey=mNaipDioJQ1IoDwVaR7BKDXgm+RYRX6IqlW4dXBvkBA63yOpteGM8jqUWAF4nEMiURmrPf43XphD+AStZeKFtA==;EndpointSuffix=core.windows.net";

        /*  if (!AZURE_STORAGE_CONNECTION_STRING) {
              throw Error('Azure Storage Connection string not found');
          }
  */
// Create the BlobServiceClient object with connection string
        const blobServiceClient1 = BlobServiceClient.fromConnectionString(
            AZURE_STORAGE_CONNECTION_STRING
        );

        // console.log(`token = ${defaultCredentials.ar()}`)
        // this uses our container we created earlier - I named mine "private"
        var containerClient1 = blobServiceClient1.getContainerClient("profile-images");
        var localBlobList = [];
        // now let's query our container for some blobs!
        for await (const blob of containerClient1.listBlobsFlat()) {
            // and plunk them in a local array...
            localBlobList.push(blob);
        }
        // ...that we push into our state


        console.log(`selectedFile: ${selectedFile.name}`);
        console.log(`handleUpload`);

        const connectionString = 'BlobEndpoint=https://academicar.blob.core.windows.net/;QueueEndpoint=https://academicar.queue.core.windows.net/;FileEndpoint=https://academicar.file.core.windows.net/;TableEndpoint=https://academicar.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=c&sp=rwdlacupiytfx&se=2024-06-15T10:04:03Z&st=2024-06-15T02:04:03Z&spr=https&sig=and%2BWbKzZeBXVymd%2FsQQFl7NTqOCPZ%2FcAqYSJ5vz%2BOg%3D';
        const containerName = 'profile-images';


        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

        const containerClient = blobServiceClient.getContainerClient(containerName);

     //   const arrayBuffer = await selectedFile.arrayBuffer();// Fetch the file as an ArrayBuffer
   
        const blobName = `${containerName}/${selectedFile.name}`;

        // this uses our container we created earlier
        let i = 0;
        let blobs = containerClient.listBlobsFlat();
        for await (const blob of blobs) {

            console.log(`Blob ${i++}: ${blob.name}`);


            // Upload the file
            const response = await containerClient.uploadBlockBlob(blob.name, selectedFile.type, 1, {
                blobHTTPHeaders: {
                    blobContentType: selectedFile.type,
                    blobContentDisposition: `attachment; filename="${blobName}"`
                }
            });
            return response;
        }

            console.log('Upload successful');
           
            //   await createBlobInContainer(containerClient, selectedFile);
        
    }
  //  render()

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>blob name</th>
                    <th>blob size</th>
                    <th>download url</th>
                </tr>
                </thead>
                <tbody>{
                    <form aria-label="Blob" className="w-full grid grid-cols-12 gap-4" encType="multipart/form-data"
                          method={"POST"}>
                        <input type="file" className={"col-span-full"} onChange={handleFileSelection}/>
                        <Button
                            variant={"primary"}
                            text={"Upload Image"}
                            type={"submit"}
                            className={"col-span-full"}
                        />

                    </form>
                }
                </tbody>
            </table>

        </div>

    );
};
