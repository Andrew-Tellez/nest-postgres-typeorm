import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BadRequestException } from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { CreateUserSchema } from '../users/dto/create-user.dto';

// Mock del servicio de usuarios
const mockUsersService = {
  create: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería devolver un error si la contraseña es menor de 8 caracteres', async () => {
    const createUserDto = { email: 'test@example.com', password: 'short' };

    const pipe = new ZodValidationPipe(CreateUserSchema);

    try {
      await pipe.transform(createUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual(
        'Validation failed: password - la contraseña debe tener al menos 8 caracteres',
      );
    }
  });

  it('debería crear un usuario correctamente con datos válidos', async () => {
    const createUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const createdUser = { ...createUserDto };

    mockUsersService.create.mockResolvedValue(createdUser);

    const result = await controller.create(createUserDto);

    expect(result).toEqual(createdUser);
    expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
  });
});
