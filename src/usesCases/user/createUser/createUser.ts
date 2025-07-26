import { err, ok, Result } from 'neverthrow';
import { CreateUserResponseDto } from './createUserResponseDto';
import { UseCase } from '../../../utils';
import { CreateUserRequestDto } from './createUserRequestDto';
import { User } from '../../../domain/auth/user';
import { IUserRepository } from '../../../repositories';
import { UserCreateBadRequestError, UserCreateUserAlreadyExistError } from './createUserErrors';
import { UserRole } from '../../../types';

type Response = Result<CreateUserResponseDto, UserCreateBadRequestError | UserCreateUserAlreadyExistError>;

class CreateUser implements UseCase<CreateUserRequestDto, Response> {
	private readonly userRepository: IUserRepository;

	constructor(userRepo: IUserRepository) {
		this.userRepository = userRepo;
	}

	async execute(request: CreateUserRequestDto, service?: any): Promise<Response> {
		try {
			if (!request.roles) {
				request.roles = [UserRole.USER];
			}
			const existUser = await this.userRepository.getUserByUsername(request.username);

			//Usuario existe
			if (existUser) {
				return err(new UserCreateUserAlreadyExistError());
			}

			const result = await this.userRepository.createUser(request);
			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}

export default CreateUser;
