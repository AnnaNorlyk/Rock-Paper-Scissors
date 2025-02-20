import jwt from "jsonwebtoken";
//Class for generating and verifying JWT tokens
export class AuthTokenService {
    _secretKey;
    _expiresIn;
    _algorithm;
    _issuer;
    _audience;
    constructor(secretKey, expiresIn, algorithm, issuer, audience) {
        this._secretKey = secretKey;
        this._expiresIn = expiresIn;
        this._algorithm = algorithm;
        this._issuer = issuer;
        this._audience = audience;
    }
    //Decodes a token without verifying its signature.
    //Returns the decoded payload if valid, and null if not.
    decodeToken(token) {
        return jwt.decode(token);
    }
    //Verifies a Bearer token from the authorisation header
    verifyToken(authHeader) {
        try {
            const bearerToken = authHeader.split(" ")[1]; // "Bearer <token>"
            jwt.verify(bearerToken, this._secretKey);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    //Generates signed JWT token using the payload
    generateToken(payload) {
        return jwt.sign(payload, this._secretKey, {
            algorithm: this._algorithm,
            expiresIn: this._expiresIn,
            issuer: this._issuer,
            audience: this._audience,
        });
    }
}
//# sourceMappingURL=AuthTokenService.js.map