import {ICustomer } from '../3_models/Customer.js';

class CRUDCustomer{
   // In memory database mockup
   private static products: Map<number, ICustomer> = new Map<number, ICustomer>();
   
   private static size: number = 0;

   // CRUD Create
   public static async insert(request:any, response:any){
    try{
        //Retrieve body
        const customer:ICustomer = request.body;
        
        console.log("First name = " + customer.firstName);

        // Finding the next auto no.
        CRUDCustomer.size++;
        let no:number = CRUDCustomer.size; 
       
        console.log("Next customer is = " + no);

        // Insert the new customer
        CRUDCustomer.products.set(no,customer);
        
        // Success message
        return response.status(201).json(customer);
     } catch(e){
       console.error(e);
     }
   }
}
export {CRUDCustomer}