export const FACTURA_API:string ='http://127.0.0.1:9005/factura-api/';

export const CATEGORY_GET_ALL:string =FACTURA_API+'category/getAll';
export const CATEGORY_SAVE:string =FACTURA_API+'category/save';
export const CATEGORY_UPDATE:string =FACTURA_API+'category/update';
export const CATEGORY_DELETE:string =FACTURA_API+'category/delete/{idCategory}';

export const STATE_GET_ALL:string =FACTURA_API+'state/getAll';

export const PRODUCT_GET_ALL:string =FACTURA_API+'product/getAll';
export const PRODUCT_FIND_BY_CODE:string =FACTURA_API+'product/findByCode/{code}';
export const PRODUCT_SAVE:string =FACTURA_API+'product/save';
export const PRODUCT_UPDATE:string =FACTURA_API+'product/update';
export const PRODUCT_UPDATE_STATUS:string =FACTURA_API+'product/update/{productId}/status/{statusId}';
export const PRODUCT_DELETE:string =FACTURA_API+'product/delete';

export const ATTRIBUTE_GET_ALL:string =FACTURA_API+'attribute/getAll';