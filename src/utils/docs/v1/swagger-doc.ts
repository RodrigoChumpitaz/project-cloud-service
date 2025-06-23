import { HOST, SWAGGER_SCHEMA } from '../../../config';

export default {
	swagger: '2.0',
	info: {
		version: '1.0.0',
		title: 'Mecánica API',
		description: 'API Documentation'
	},
	host: HOST,
	basePath: '/api/v1',
	schemes: [SWAGGER_SCHEMA],
	consumes: ['application/json'],
	produces: ['application/json'],
	paths: {
		'/vehicles': {
			post: {
				tags: ['Vehicle'],
				summary: 'Create a new vehicle',
				parameters: [
					{
						name: 'body',
						in: 'body',
						required: true,
						schema: {
							$ref: '#/definitions/CreateVehicleRequestDto'
						}
					}
				],
				responses: {
					200: {
						description: 'Vehicle created successfully',
						schema: {
							$ref: '#/definitions/CreateVehicleResponseDto'
						}
					},
					400: {
						description: 'Bad request',
						schema: {
							$ref: '#/definitions/VehicleCreateBadRequestError'
						}
					}
				}
			},
			get: {
				tags: ['Vehicle'],
				summary: 'Get all vehicles',
				responses: {
					200: {
						description: 'List of vehicles',
						schema: {
							type: 'array',
							items: {
								$ref: '#/definitions/Vehicle'
							}
						}
					}
				}
			}
		},
		'/vehicles/{id}': {
			get: {
				tags: ['Vehicle'],
				summary: 'Get a vehicle by ID',
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						type: 'string',
						description: 'ID of the vehicle to retrieve'
					}
				],
				responses: {
					200: {
						description: 'Vehicle details',
						schema: {
							$ref: '#/definitions/Vehicle'
						}
					},
					404: {
						description: 'Vehicle not found',
						schema: {
							$ref: '#/definitions/NotFoundError'
						}
					}
				}
			},
			delete: {
				tags: ['Vehicle'],
				summary: 'Delete a vehicle by ID',
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						type: 'string',
						description: 'ID of the vehicle to delete'
					}
				],
				responses: {
					200: {
						description: 'Vehicle deleted successfully'
					},
					400: {
						description: 'Bad request',
						schema: {
							$ref: '#/definitions/BadRequestError'
						}
					},
					404: {
						description: 'Vehicle not found',
						schema: {
							$ref: '#/definitions/NotFoundError'
						}
					}
				}
			},
			patch: {
				tags: ['Vehicle'],
				summary: 'Update a vehicle by ID',
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						type: 'string',
						description: 'ID of the vehicle to update'
					},
					{
						name: 'body',
						in: 'body',
						required: true,
						schema: {
							$ref: '#/definitions/UpdateVehicleRequestDto'
						}
					}
				],
				responses: {
					200: {
						description: 'Vehicle updated successfully'
					},
					400: {
						description: 'Bad request',
						schema: {
							$ref: '#/definitions/BadRequestError'
						}
					},
					404: {
						description: 'Vehicle not found',
						schema: {
							$ref: '#/definitions/NotFoundError'
						}
					}
				}
			}
		},
		'/repair': {
            post: {
                tags: ['RepairLog'],
                summary: 'Crear un nuevo registro de reparación',
                parameters: [
                    {
                        name: 'body',
                        in: 'body',
                        required: true,
                        schema: {
                            $ref: '#/definitions/CreateRepairLogRequestDto'
                        }
                    }
                ],
                responses: {
                    201: {
                        description: 'Registro de reparación creado exitosamente',
                        schema: {
                            $ref: '#/definitions/RepairLog'
                        }
                    },
                    400: {
                        description: 'Solicitud incorrecta',
                        schema: {
                            $ref: '#/definitions/RepairLogCreateBadRequestError'
                        }
                    },
                    404: {
                        description: 'Vehículo no encontrado',
                        schema: {
                            $ref: '#/definitions/RepairLogCreateNotFoundError'
                        }
                    }
                }
            },
            get: {
                tags: ['RepairLog'],
                summary: 'Obtener registros de reparación paginados',
                parameters: [
                    {
                        name: 'page',
                        in: 'query',
                        required: false,
                        type: 'integer',
                        description: 'Página'
                    },
                    {
                        name: 'limit',
                        in: 'query',
                        required: false,
                        type: 'integer',
                        description: 'Cantidad por página'
                    },
                    {
                        name: 'paymentType',
                        in: 'query',
                        required: false,
                        type: 'string',
                        description: 'Filtrar por tipo de pago'
                    },
                    {
                        name: 'repairStatus',
                        in: 'query',
                        required: false,
                        type: 'string',
                        description: 'Filtrar por estado de reparación'
                    }
                ],
                responses: {
                    200: {
                        description: 'Lista de registros de reparación',
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/RepairLog'
                            }
                        }
                    },
                    400: {
                        description: 'Parámetros de paginación inválidos',
                        schema: {
                            $ref: '#/definitions/BadRequestError'
                        }
                    }
                }
            },
        },
        '/repair/{id}': {
			delete: {
				tags: ['RepairLog'],
				summary: 'Delete a repairLog by ID',
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						type: 'string',
						description: 'ID to delete the repair log'
					}
				],
				responses: {
					200: {
						description: 'Vehicle deleted successfully'
					},
					400: {
						description: 'Bad request',
						schema: {
							$ref: '#/definitions/BadRequestError'
						}
					},
					404: {
						description: 'Vehicle not found',
						schema: {
							$ref: '#/definitions/NotFoundError'
						}
					}
				}
			},
            patch: {
                tags: ['RepairLog'],
                summary: 'Actualizar un registro de reparación',
                parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						type: 'string',
						description: 'ID to delete the repair log'
					},
                    {
                        name: 'body',
                        in: 'body',
                        required: true,
                        schema: {
                            $ref: '#/definitions/BadRequestError'
                        }
                    }
                ],
                responses: {
                    200: {
                        description: 'Registro de reparación actualizado exitosamente',
                        schema: {
                            $ref: '#/definitions/RepairLog'
                        }
                    },
                    400: {
                        description: 'Solicitud incorrecta',
                        schema: {
                            $ref: '#/definitions/BadRequestError'
                        }
                    },
                    404: {
                        description: 'Vehicle not found',
                        schema: {
                            $ref: '#/definitions/NotFoundError'
                        }
                    }
                }
            }
        },
		'/owner': {
            post: {
                tags: ['Owner'],
                summary: 'Crear un nuevo propietario',
                parameters: [
                    {
                        name: 'body',
                        in: 'body',
                        required: true,
                        schema: {
                            $ref: '#/definitions/CreateOwnerRequestDto'
                        }
                    }
                ],
                responses: {
                    201: {
                        description: 'Propietario creado exitosamente',
                        schema: {
                            $ref: '#/definitions/CreateOwnerResponseDto'
                        }
                    },
                    400: {
                        description: 'Solicitud incorrecta',
                        schema: {
                            $ref: '#/definitions/BadRequestError'
                        }
                    }
                }
            },
            get: {
                tags: ['Owner'],
                summary: 'Obtener todos los propietarios',
                parameters: [],
                responses: {
                    200: {
                        description: 'Lista de propietarios',
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/CreateOwnerResponseDto'
                            }
                        }
                    },
                    400: {
                        description: 'Solicitud incorrecta',
                        schema: {
                            $ref: '#/definitions/BadRequestError'
                        }
                    }
                }
            }
        },
        '/owner/{id}': {
            get: {
                tags: ['Owner'],
                summary: 'Obtener propietario por ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string',
                        description: 'ID del propietario'
                    }
                ],
                responses: {
                    200: {
                        description: 'Detalles del propietario',
                        schema: {
                            $ref: '#/definitions/CreateOwnerResponseDto'
                        }
                    },
                    404: {
                        description: 'Propietario no encontrado',
                        schema: {
                            $ref: '#/definitions/NotFoundError'
                        }
                    }
                }
            },
            patch: {
                tags: ['Owner'],
                summary: 'Actualizar propietario por ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string',
                        description: 'ID del propietario'
                    },
                    {
                        name: 'body',
                        in: 'body',
                        required: true,
                        schema: {
                            $ref: '#/definitions/UpdateOwnerRequestDto'
                        }
                    }
                ],
                responses: {
                    200: {
                        description: 'Propietario actualizado exitosamente',
                        schema: {
                            $ref: '#/definitions/CreateOwnerResponseDto'
                        }
                    },
                    400: {
                        description: 'Solicitud incorrecta',
                        schema: {
                            $ref: '#/definitions/BadRequestError'
                        }
                    },
                    404: {
                        description: 'Propietario no encontrado',
                        schema: {
                            $ref: '#/definitions/NotFoundError'
                        }
                    }
                }
            },
            delete: {
                tags: ['Owner'],
                summary: 'Eliminar propietario por ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string',
                        description: 'ID del propietario'
                    }
                ],
                responses: {
                    200: {
                        description: 'Propietario eliminado exitosamente'
                    },
                    404: {
                        description: 'Propietario no encontrado',
                        schema: {
                            $ref: '#/definitions/NotFoundError'
                        }
                    }
                }
            }
        },
	},
	definitions: {
		CreateVehicleRequestDto: {
			type: 'object',
			properties: {
				make: { type: 'string' },
				model: { type: 'string' },
				year: { type: 'number' },
				category: { type: 'string' },
				licensePlate: { type: 'string' },
				notes: { type: 'string' },
				ownerId: { type: 'string' },
				registrationDate: { type: 'string' }
			},
			required: ['make', 'licensePlate', 'model', 'year', 'ownerId', 'licensePlate', 'registrationDate', 'category']
		},
		CreateVehicleResponseDto: {
			type: 'object',
			properties: {
				id: { type: 'string' },
				make: { type: 'string' },
				model: { type: 'string' },
				year: { type: 'number' },
				category: { type: 'string' },
				licensePlate: { type: 'string' },
				registrationDate: { type: 'string' },
				notes: { type: 'string' },
				ownerId: { type: 'string' },
				createdAt: { type: 'string' },
				updatedAt: { type: 'string' }
			}
		},
		Vehicle: {
			type: 'object',
			properties: {
				id: { type: 'string' },
				make: { type: 'string' },
				model: { type: 'string' },
				year: { type: 'number' },
				category: { type: 'string' },
				licensePlate: { type: 'string' },
				registrationDate: { type: 'string' },
				notes: { type: 'string' },
				ownerId: { type: 'string' },
				createdAt: { type: 'string' },
				updatedAt: { type: 'string' }
			}
		},
		VehicleCreateBadRequestError: {
			type: 'object',
			properties: {
				success: { type: 'boolean', example: false },
				error: { type: 'string', example: 'Bad request' },
				statusCode: { type: 'number', example: 400 },
				type: { type: 'string', example: 'VehicleCreateBadRequestError' }
			}
		},
		VehicleAlreadyRegisteredError: {
			type: 'object',
			properties: {
				message: { type: 'string' }
			}
		},
		GetVehicleBadRequestError: {
			type: 'object',
			properties: {
				message: { type: 'string' }
			}
		},
		NotFoundError: {
			type: 'object',
			properties: {
				success: { type: 'boolean', example: false },
				error: { type: 'string', example: 'Not found' },
				statusCode: { type: 'number', example: 404 },
				type: { type: 'string', example: 'NotFoundError' }
			}
		},
		UpdateVehicleRequestDto: {
			type: 'object',
			properties: {
				licensePlate: { type: 'string', example: 'ABC123' },
				model: { type: 'string', example: 'Civic' },
				year: { type: 'number', example: 2025 },
				ownerId: { type: 'string', example: null }
			}
		},
		BadRequestError: {
			type: 'object',
			properties: {
				success: { type: 'boolean', example: false },
				error: { type: 'string', example: 'Bad request' },
				statusCode: { type: 'number', example: 400 },
				type: { type: 'string', example: 'BadRequestError' }
			}
		},
		RepairLog: {
			type: 'object',
			properties: {
				id: { type: 'string' },
				vehicle: { type: 'string' },
				repairNumber: { type: 'string' },
				technicalReview: { type: 'string', nullable: true },
				observation: { type: 'string', nullable: true },
				subTotal: { type: 'number' },
				discount: { type: 'number', nullable: true },
				total: { type: 'number' },
				paymentType: { type: 'string' },
				repairStatus: { type: 'string' }
			}
		},
		CreateOwnerRequestDto: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                middleName: { type: 'string' },
                lastName: { type: 'string' },
                secondLastName: { type: 'string' },
                documentType: { type: 'string' },
                documentNumber: { type: 'string' },
                phoneNumber: { type: 'string' },
                email: { type: 'string' }
            },
            required: ['name', 'lastName', 'documentType', 'documentNumber']
        },
        CreateOwnerResponseDto: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                middleName: { type: 'string' },
                lastName: { type: 'string' },
                secondLastName: { type: 'string' },
                documentType: { type: 'string' },
                documentNumber: { type: 'string' },
                phoneNumber: { type: 'string' },
                email: { type: 'string' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            }
        },
        UpdateOwnerRequestDto: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                middleName: { type: 'string' },
                lastName: { type: 'string' },
                secondLastName: { type: 'string' },
                documentType: { type: 'string' },
                documentNumber: { type: 'string' },
                phoneNumber: { type: 'string' },
                email: { type: 'string' }
            }
        }
	}
};
