import { BigInt } from "@graphprotocol/graph-ts"
import {
  Transfer,
} from "../generated/Contract/Contract"
import { Token } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let token = new Token(event.params.id.toString());
  token.contractAddress = event.address;
  token.contractName = "Knownorigin Digital Asset";
  token.contractSymbol = "KODA";
  token.tokenId = event.params.id;
  token.tokenURI = "TODO";
  token.metadataName = "TODO";
  token.metadataDescription = "TODO";
  token.metadataImageURI = "TODO";
}
