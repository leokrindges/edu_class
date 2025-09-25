import { SetMetadata } from '@nestjs/common';
import { Action } from '@prisma/client';

export const PERMISSION_KEY = 'decorator:permission';
export const Permission = (permission: Action) =>
	SetMetadata(PERMISSION_KEY, permission);
