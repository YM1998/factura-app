import { AttributteProduct } from "./attributes_product";

export class Product {
    idProduct:number;
    codigo:string;
    inventoryQuantity:number;
    description:string;
    creationDate:string;
    modificationDate:string;
    name:string;
    price:number;
    cost:number;
    iva:number;
    userCreation:string;
    userModification:string;
    idCategory:string;
    categoryName:string;
    statusName:string;
    statusId:number;
    attributes:AttributteProduct[];
 }