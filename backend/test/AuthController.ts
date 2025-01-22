import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/modules/auth/auth.controller';
import { AuthService } from '../src/modules/auth/auth.service';
import { AuthModule } from '../src/modules/auth/auth.module'; // Moduł, w którym zarejestrowano AuthService
import { TokenService } from '../src/modules/token/token.service';
import { Response } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    tokenService = module.get<TokenService>(TokenService);
  });

  it('should set cookies on login', () => {
    const mockResponse = {
      cookie: jest.fn(),
    } as unknown as Response;

    authController.login(1, mockResponse);

    expect(tokenService.createToken).toHaveBeenCalledWith(1);
    expect(mockResponse.cookie).toHaveBeenCalledWith(
      'access-token',
      'test-token',
      expect.objectContaining({ httpOnly: true }),
    );
    expect(mockResponse.cookie).toHaveBeenCalledWith(
      'is_logged',
      true,
      expect.any(Object),
    );
  });

  it('should clear cookies on logout', () => {
    const mockResponse = {
      clearCookie: jest.fn(),
    } as unknown as Response;

    authController.logout(mockResponse);

    expect(mockResponse.clearCookie).toHaveBeenCalledWith('access-token');
    expect(mockResponse.clearCookie).toHaveBeenCalledWith('is_logged');
  });
});
