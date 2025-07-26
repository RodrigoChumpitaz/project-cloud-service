import { err, ok, Result } from 'neverthrow';
import { UpdateRepairLogResponseDto } from './updateRepairLogResponseDto';
import {
	RepairLogUpdateBadRequestError,
	RepairLogUpdateInvalidIdError,
	RepairLogUpdateLogNotFoundError,
	RepairLogUpdateVehicleNotFoundError
} from './updateRepairLogErrors';
import { UseCase } from '../../../utils';
import { UpdateRepairLogRequestDto } from './updateRepairLogRequestDto';
import { IRepairLogRepository } from '../../../repositories';
import { RepairLog } from '../../../domain/repair/repairLog';
import { isValidObjectId } from 'mongoose';
import { IVehicleRepository } from '../../../repositories/vehicle.repository';

type Response = Result<
	UpdateRepairLogResponseDto,
	| RepairLogUpdateBadRequestError
	| RepairLogUpdateLogNotFoundError
	| RepairLogUpdateInvalidIdError
	| RepairLogUpdateVehicleNotFoundError
>;

class UpdateRepairLog implements UseCase<UpdateRepairLogRequestDto, Response> {
	private readonly repairLogRepository: IRepairLogRepository;

	private readonly vehicleRepository: IVehicleRepository;

	constructor(repairLogRepo: IRepairLogRepository, vehicleRepo: IVehicleRepository) {
		this.repairLogRepository = repairLogRepo;
		this.vehicleRepository = vehicleRepo;
	}

	async execute(request: UpdateRepairLogRequestDto, service?: any): Promise<Response> {
		try {
			if (!isValidObjectId(request.id)) {
				return err(new RepairLogUpdateInvalidIdError());
			}
			const vehicleExist = await this.vehicleRepository.getVehicleById(request.vehicle);
			if (!vehicleExist) {
				return err(new RepairLogUpdateVehicleNotFoundError());
			}

			const result = await this.repairLogRepository.updateRepairLog(request);
			if (!result) {
				return err(new RepairLogUpdateLogNotFoundError());
			}
			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}

export default UpdateRepairLog;
