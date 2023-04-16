import { CastExpr } from "@angular/compiler";

export class Category{
   
    idCategory:number;
    name:string;
    idStatus:number;
    status:string;
    creationDate:string;
    modificationDate:string;
    creationUser:string;
    modificationUser:string;



    constructor(idCategory?:number, name?:string, idStatus?:number) {
        this.idCategory=idCategory;
        this.name=name;
        this.idStatus=idStatus;
      }


    public getCopyObject(): Category {        
       return new Category(this.idCategory,this.name, this.idStatus);
    }

}