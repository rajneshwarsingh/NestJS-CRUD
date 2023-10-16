/*
 * @file: base.model.ts
 * @description: It contain base of responses.
 * @author: Rajneshwar Singh
 */

export interface IErrorObject {
  [key: string]: string;
}
//base service common success and error message
export abstract class BaseService {
  //common function to return success response
  responses = (data: object, statusCode: number, message: string) => {
    return { statusCode, data, message };
  };
  //common function to return error response
  errorResponses = (statusCode, message) => {
    return { statusCode, errorResponses: message };
  };
}
