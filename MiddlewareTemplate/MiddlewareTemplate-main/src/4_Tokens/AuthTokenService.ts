import jwt from "jsonwebtoken";

//Class for generating and verifying JWT tokens
export class AuthTokenService {
  private _secretKey: string;
  private _expiresIn: number;
  private _algorithm: jwt.Algorithm;
  private _issuer: string;
  private _audience: string;

  constructor(
    secretKey: string,
    expiresIn: number,
    algorithm: jwt.Algorithm,
    issuer: string,
    audience: string
  ) {
    this._secretKey = secretKey;
    this._expiresIn = expiresIn;
    this._algorithm = algorithm;
    this._issuer = issuer;
    this._audience = audience;
  }

  //Decodes a token without verifying its signature.
  //Returns the decoded payload if valid, and null if not.
  public decodeToken(token: string) {
    return jwt.decode(token);
  }

  //Verifies a Bearer token from the authorisation header
  public verifyToken(authHeader: string): boolean {
    try {
      const bearerToken = authHeader.split(" ")[1]; // "Bearer <token>"
      jwt.verify(bearerToken, this._secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  //Generates signed JWT token using the payload
  public generateToken(payload: object): string {
    return jwt.sign(payload, this._secretKey, {
      algorithm: this._algorithm,
      expiresIn: this._expiresIn,
      issuer: this._issuer,
      audience: this._audience,
    });
  }
}
