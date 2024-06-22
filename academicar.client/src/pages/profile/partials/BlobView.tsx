import React from 'react';
// we'll need InteractiveBrowserCredential here to force a user to sign-in through the browser
import { DefaultAzureCredential  } from "@azure/identity";
// we're using these objects from the storage sdk - there are others for different needs
import { BlobServiceClient, BlobItem } from "@azure/storage-blob";

interface Props {}
interface State {
    // a place to store our blob item metadata after we query them from the service
    blobsWeFound: BlobItem[];
    containerUrl: string;
}

export class BlobView extends React.Component<Props, State> {
    state: State;

    constructor(props: Props, state: State) {
        //super(state);
        super(props, state);
        this.state = { blobsWeFound: [], containerUrl: "" }
    }

    // here's our azure identity config
    async componentDidMount() {
 /*       const signInOptions = {
            // the client id is the application id, from your earlier app registration
            clientId: "6a88bd44-fb43-4e2e-be79-7df666b70b23",
            // this is your tenant id - the id of your azure ad tenant. available from your app registration overview
            tenantId: "4caa5dc8-1da7-4c89-8c89-dc816e05f20b"
        }
*/
        const blobStorageClient = new BlobServiceClient(
            // this is the blob endpoint of your storage acccount. Available from the portal 
            // they follow this format: <accountname>.blob.core.windows.net for Azure global
            // the endpoints may be slightly different from national clouds like US Gov or Azure China
            "https://academicar.blob.core.windows.net/",
            new DefaultAzureCredential()
        
        );

       // console.log(`token = ${defaultCredentials.ar()}`)
        // this uses our container we created earlier - I named mine "private"
        var containerClient = blobStorageClient.getContainerClient("private");
        var localBlobList = [];
        // now let's query our container for some blobs!
        for await (const blob of containerClient.listBlobsFlat()) {
            // and plunk them in a local array...
            localBlobList.push(blob);
        }
        // ...that we push into our state
        this.setState({ blobsWeFound: localBlobList, containerUrl: containerClient.url });
    }

    render() {
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
                        this.state.blobsWeFound.map((x, i) => {
                            return <tr key={i}>
                                <td>{x.name}</td>
                                <td>{x.properties.contentLength}</td>
                                <td>
                                    <img src={this.state.containerUrl + x.name} />
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}