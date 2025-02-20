class CRUDCustomer {
    // In memory database mockup
    static products = new Map();
    static size = 0;
    // CRUD Create
    static async insert(request, response) {
        try {
            //Retrieve body
            const customer = request.body;
            console.log("First name = " + customer.firstName);
            // Finding the next auto no.
            CRUDCustomer.size++;
            let no = CRUDCustomer.size;
            console.log("Next customer is = " + no);
            // Insert the new customer
            CRUDCustomer.products.set(no, customer);
            // Success message
            return response.status(201).json(customer);
        }
        catch (e) {
            console.error(e);
        }
    }
}
export { CRUDCustomer };
//# sourceMappingURL=CRUDCustomer.js.map