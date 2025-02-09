import { APIResponse, expect } from "@playwright/test";

export class ResponseAPIPage {
    constructor(){
    }
    
      checkResponseCode(responseBody, code) {
        expect.soft(responseBody.responseCode).toBe(code);
      }
    
      checkResponseMessage(responseBody, message) {
        expect.soft(responseBody.message).toBe(message);
      }

}