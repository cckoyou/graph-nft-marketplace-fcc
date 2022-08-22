import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  ItemBought  as ItemBoughtEvent,
  ItemCancelled as ItemCancelledEvent,
  ItemListed as ItemListedEvent
} from "../generated/NftMarketplace/NftMarketplace"
import { ItemBought,ActiveItem,ItemListed,ItemCancelled } from '../generated/schema'

export function handleItemBought(event: ItemBoughtEvent): void {
    let itemBought = ItemBought.load(getIdFromEventParams(event.params.tokenId,event.params.nftAddress))
    let activeItem = ActiveItem.load(getIdFromEventParams(event.params.tokenId,event.params.nftAddress))
    if(!itemBought){
        itemBought = new ItemBought(getIdFromEventParams(event.params.tokenId,event.params.nftAddress))
    }
    itemBought.buyer=event.params.buyer
    itemBought.nftAddress=event.params.nftAddress
    itemBought.tokenId=event.params.tokenId
    activeItem!.buyer=event.params.buyer

    itemBought.save()
    activeItem!.save()
}

export function handleItemCancelled(event: ItemCancelledEvent): void {
    let itemcancelled=ItemCancelled.load(getIdFromEventParams(event.params.tokenId,event.params.nftAddress))
    let activeItem = ActiveItem.load(getIdFromEventParams(event.params.tokenId,event.params.nftAddress))
    if(!itemcancelled){
        itemcancelled = new ItemCancelled(getIdFromEventParams(event.params.tokenId,event.params.nftAddress))
    }
    itemcancelled.seller=event.params.seller
    itemcancelled.nftAddress=event.params.nftAddress
    itemcancelled.tokenId=event.params.tokenId
    activeItem!.buyer = Address.fromString("0x000000000000000000000000000000000000dEaD")

    itemcancelled.save()
    activeItem!.save()
}

export function handleItemListed(event: ItemListedEvent): void {
    let itemListed = ItemListed.load(getIdFromEventParams(event.params.tokenId,event.params.nftAddress))
    let activeItem = ActiveItem.load(getIdFromEventParams(event.params.tokenId,event.params.nftAddress))
    if(!itemListed){
        itemListed = new ItemListed(getIdFromEventParams(event.params.tokenId,event.params.nftAddress))
    }
    if(!activeItem){
        activeItem=new ActiveItem(getIdFromEventParams(event.params.tokenId,event.params.nftAddress))
    }
    itemListed.seller=event.params.seller
    activeItem.seller=event.params.seller
    itemListed.nftAddress=event.params.nftAddress
    activeItem.nftAddress=event.params.nftAddress
    itemListed.tokenId=event.params.tokenId
    activeItem.tokenId=event.params.tokenId
    itemListed.price=event.params.price
    activeItem.price=event.params.price
    
    itemListed.save()
    activeItem.save()
}

function getIdFromEventParams(tokenId:BigInt, nftAddress:Address):string{
    return tokenId.toHexString() + nftAddress.toHexString()
}