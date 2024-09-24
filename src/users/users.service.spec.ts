import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear un nuevo usuario', async () => {
    const createUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const savedUser = { ...createUserDto };

    mockUserRepository.create.mockReturnValue(savedUser);
    mockUserRepository.save.mockResolvedValue(savedUser);

    const result = await service.create(createUserDto);

    expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
    expect(mockUserRepository.save).toHaveBeenCalledWith(savedUser);
    expect(result).toEqual(savedUser);
  });
});
