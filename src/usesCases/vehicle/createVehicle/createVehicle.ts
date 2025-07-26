import { err, ok, Result } from 'neverthrow';
import { UseCase } from './../../../utils';
import { CreateVehicleRequestDto } from './createVehicleRequestDto';
import {
	VehicleOwnerNotFoundError,
	VehicleAlreadyRegisteredError,
	VehicleCreateBadRequestError,
	VehicleInvalidLicensePlateError,
	VehicleInvalidYearError
} from './createVehicleErrors';
import { IVehicleRepository } from '../../../repositories/vehicle.repository';
import { CreateVehicleResponseDto } from './createVehicleResponse';

type Response = Result<
	CreateVehicleResponseDto,
	| VehicleCreateBadRequestError
	| VehicleOwnerNotFoundError
	| VehicleAlreadyRegisteredError
	| VehicleInvalidLicensePlateError
	| VehicleInvalidYearError
>;

class CreateVehicle implements UseCase<CreateVehicleRequestDto, Response> {
	private readonly vehicleRepository: IVehicleRepository;

	constructor(vehicleRepo: IVehicleRepository) {
		this.vehicleRepository = vehicleRepo;
	}

	async execute(request: CreateVehicleRequestDto, service?: any): Promise<Response> {
		try {
			//verificar si el vehiculo existe
			const existVehicle = await this.vehicleRepository.getVehicleByLicensePlate(
				request.licensePlate
			);
			if (existVehicle) {
				return err(new VehicleAlreadyRegisteredError());
			}
			// Crear el vehículo en el repositorio
			const result = await this.vehicleRepository.createVehicle(request);
			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}

export default CreateVehicle;
