import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  Transfer,
} from "../generated/Contract/Contract"
import { Token } from "../generated/schema"

let zeroAddress = '0x0000000000000000000000000000000000000000';

export function handleTransfer(event: Transfer): void {
  let tokenId = event.params.id;
  let contractAddress = event.address.toHexString();
  let id = contractAddress + '_' + tokenId.toString();
  let from = event.params.from.toHexString();
  let to = event.params.to.toHexString();

  if (from == zeroAddress && to != zeroAddress) {
    let token = new Token(id);
    token.contractAddress = contractAddress;
    token.tokenId = event.params.id;

    // get the rest of the params from the contract
    const contract = Contract.bind(event.address);

    token.contractName = contract.name();
    token.contractSymbol = contract.symbol();
    token.tokenURI = contract.tokenURI(tokenId);
    token.metadataName = "TODO";
    token.metadataDescription = "TODO";
    token.metadataImageURI = "TODO";

    token.save()
  }
}
