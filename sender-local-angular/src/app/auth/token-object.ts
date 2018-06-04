export interface TokenObject {
  senderId: string;
  tokenObject: Token;
}

interface Token {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
