import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(userID: number): string {
    return this.jwtService.sign({ sub: userID }, { expiresIn: '1h' });
  }

  verifyToken(token: string): { sub: number } {
    return this.jwtService.verify(token);
  }
}
