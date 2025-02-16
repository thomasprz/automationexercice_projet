import {APIRequestContext} from '@playwright/test'

export class CreateAccountAPIPage {
    private readonly request: APIRequestContext;
    private createAccountEndPoint : string

    constructor(request: APIRequestContext){
        this.request = request
        this.createAccountEndPoint = '/api/createAccount'
    }

    async createUser(user){
        return this.request.post(this.createAccountEndPoint, {
            headers: {
              Accept: '*/*',
              ContentType: 'application/json',
            },
            form: {
              name: user.name,
              email: user.email,
              password: user.password,
              title: user.title,
              birth_date: user.birth_date,
              birth_month: user.birth_month,
              birth_year: user.birth_year,
              firstname: user.firstname,
              lastname: user.lastname,
              company: user.company,
              address1: user.address1,
              address2: user.address2,
              country: user.country,
              zipcode: user.zipcode,
              state: user.state,
              city: user.city,
              mobile_number: user.mobile_number,
            },
        });
    }
}