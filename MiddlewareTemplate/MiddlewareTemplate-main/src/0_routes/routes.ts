import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from "jsonwebtoken";

const currentTime = Math.floor(Date.now() / 1000);
const expiration_time:number = currentTime + 100;

const private_key = '1234'; 
const claims:object = {
'studentID': '123',
'studentName':'Jørgen Hansen',
'exp': expiration_time
};

const jwt_token = jwt.sign(claims, private_key, { algorithm: 'HS256' });
console.log(jwt_token);
console.log(jwt.verify(jwt_token,private_key));
console.log(jwt.decode(jwt_token)); 

dotenv.config({ path: 'config/middleware.env' });

const routes = express();

routes.use(cors());
routes.use(express.static('public'));

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json())


import { CRUDProduct } from '../1_endpoints/CRUDProducts.js';
import { CRUDCustomer } from '../1_endpoints/CRUDCustomer.js';

//Token route
routes.get('/generateToken', (req, res) => {
   const now = Math.floor(Date.now() / 1000);
   const exp = now + 100;
   const privateKey = '1234';
   const myClaims = {
     studentID: '123',
     studentName: 'Jørgen Hansen',
     exp: exp
   };
 
   const newToken = jwt.sign(myClaims, privateKey, { algorithm: 'HS256' });
   return res.json({ token: newToken });
 });
 
 //Verify a token route
 routes.post('/verifyToken', (req, res) => {
   const { token } = req.body;
   if (!token) {
     return res.status(400).json({ error: "No token sent" });
   }
 
   try {
     const decoded = jwt.verify(token, '1234');
     return res.json({ success: true, decoded });
   } catch (error) {
     return res.status(401).json({ success: false, message: "Invalid or expired token" });
   }
 });

// Vores (eneste) endpoint som der kan postes til...
routes.post('/api/products',  (req:any,res:any) => {
   return CRUDProduct.insert(req,res);
});


// Samler alle andre routes op...
routes.get('*', (req:any,res:any) =>{
     return res.status(404).send('no such route');
});

//---CUSTOMER ROUTES---

routes.post('/api/customer', (req:any,res:any) => {
   return CRUDCustomer.insert(req,res);
})

export {routes}

