export const FACTURA_API:string ='http://127.0.0.1:9005/factura-api/';

export const CATEGORY_GET_ALL:string = FACTURA_API+'category/getAll';
export const CATEGORY_SAVE:string = FACTURA_API+'category/save';
export const CATEGORY_UPDATE:string = FACTURA_API+'category/update';
export const CATEGORY_DELETE:string = FACTURA_API+'category/delete/{idCategory}';

export const STATE_GET_ALL:string = FACTURA_API+'state/getAll';

export const PRODUCT_GET_ALL:string = FACTURA_API+'product/getAll';
export const PRODUCT_FIND_BY_CODE:string = FACTURA_API+'product/findByCode/{code}';
export const PRODUCT_SAVE:string = FACTURA_API+'product/save';
export const PRODUCT_UPDATE:string = FACTURA_API+'product/update';
export const PRODUCT_UPDATE_STATUS:string = FACTURA_API+'product/update/{productId}/status/{statusId}';
export const PRODUCT_DELETE:string = FACTURA_API+'product/delete';

export const ATTRIBUTE_GET_ALL:string = FACTURA_API+'attribute/getAll';

export const CLIENT_FIND_ID:string = FACTURA_API+'client/find/{id}';

export const SELLING_POINT_FIND_ID:string = FACTURA_API+'selling/point/find/{id}';

export const PAYMENT_TYPE_GET_ALL:string = FACTURA_API+'payment-type/getAll';

export const INVOICE_SAVE:string = FACTURA_API+'invoice/save'