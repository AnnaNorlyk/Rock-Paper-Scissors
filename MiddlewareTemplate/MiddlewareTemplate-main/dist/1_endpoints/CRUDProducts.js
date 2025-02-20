class CRUDProduct {
    // En mockup af en database (in memory) - se REDIS senere
    static products = new Map();
    static size = 0;
    // CRUD Create
    static async insert(request, response) {
        try {
            // (1) Vi henter body'en i http-requestet - og laver typetjek med modellen!!
            const product = request.body;
            // lidt debug...
            console.log("produkttitlen = " + product.title);
            // (2) Vi vil finde nummeret på næste produkt som autonummer
            CRUDProduct.size++;
            let no = CRUDProduct.size;
            // lidt debug...
            console.log("det næste produkt-id er = " + no);
            // (3) Vi indsætter det nye produkt (i mappen)
            CRUDProduct.products.set(no, product);
            // (4) Vi returnerer en positiv status til klienten + det indsatte produkt
            return response.status(201).json(product);
        }
        catch (e) {
            console.error(e);
        }
    }
}
export { CRUDProduct };
//# sourceMappingURL=CRUDProducts.js.map