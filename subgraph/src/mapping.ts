import { store } from '@graphprotocol/graph-ts'
import {fillMetaData} from "./metadata-utils";
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

    // fetch info from the metadata if stored on ipfs
    fillMetaData(token);

    token.save()
  }

  else if (from != zeroAddress && to == zeroAddress) {
    store.remove('Token', id);
  }
}
