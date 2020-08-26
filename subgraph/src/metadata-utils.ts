import { ipfs, JSONValue, Result, json, Bytes } from "@graphprotocol/graph-ts";
import { Token } from "../generated/schema"

export function fillMetaData(token: Token): void {

    let ipfsParts: string[] = token.tokenURI.split('/')
    let ipfsHash: string = ipfsParts[ipfsParts.length - 1]

    if (ipfsParts.length > 0) {
        let data = ipfs.cat('/ipfs/' + ipfsHash)

        if (data !== null) {
            let result: Result<JSONValue, boolean> = json.try_fromBytes(data as Bytes)
            if (result.isOk) {
                let jsonData = result.value;
                let jsonObject = jsonData.toObject();
                token.metadataName = jsonObject.get('name').toString()
                token.metadataDescription = jsonObject.get('description').toString()
                token.metadataImageURI = jsonObject.get('image').toString();
            }
        }
    }
}