import {
	CallHandler,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Controller } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { Action } from '@prisma/client';
import { Observable } from 'rxjs';
import { PERMISSION_KEY } from 'src/auth/decorators/permission.decorator';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public.decorator';
import { ROLES_KEY } from 'src/auth/decorators/route-role.decorator';
import { PrismaService } from 'src/database/prisma.service';
import { User } from 'src/user/models/user.model';

@Injectable()
export class RolePermissionInterceptor {
	constructor(
		private readonly _reflector: Reflector,
		private readonly prisma: PrismaService,
	) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<any>> {
		const handler = context.getHandler();
		const controller = context.getClass<Controller>();

		const routeRole =
			this._reflector.getAllAndOverride<string>(ROLES_KEY, [
				handler,
				controller,
			]) || '';
		if (!routeRole || routeRole.length === 0) return next.handle();

		const routeAction = this._reflector.getAllAndOverride<Action>(
			PERMISSION_KEY,
			[handler, controller],
		);
		if (!routeAction || routeAction.length === 0) return next.handle();

		const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			handler,
			controller,
		]);
		const { user }: { user: User } = context.switchToHttp().getRequest();
		if (isPublic || user.isAdmin) return next.handle();

		if (!user) throw new ForbiddenException('User not found. Access denied.');

		const userRole = user.roleId;

		if (!userRole)
			throw new ForbiddenException('User has no role. Access denied.');

		const isAuthorized = await this._checkPermission(
			{ roleId: userRole },
			routeRole,
			routeAction,
		);
		if (!isAuthorized) throw new ForbiddenException('Access denied.');

		return next.handle();
	}

	private async _checkPermission(
		{ roleId }: { roleId: string },
		routeRole: string,
		action: Action,
	): Promise<boolean> {
		const permissions = await this.prisma.permission.findMany({
			where: {
				roleId,
				routePermission: {
					some: {
						OR: [{ expiresIn: null }, { expiresIn: { gte: new Date() } }],
						routeRole: { name: routeRole },
					},
				},
			},
			select: {
				canCreate: true,
				canRead: true,
				canUpdate: true,
				canDelete: true,
				canRestore: true,
			},
		});
		return permissions.some((permission) =>
			this.hasPermissionForAction(action, permission),
		);
	}

	private hasPermissionForAction(
		action: Action,
		permission: {
			canCreate: boolean;
			canRead: boolean;
			canUpdate: boolean;
			canDelete: boolean;
			canRestore: boolean;
		},
	): boolean {
		const actionMap: Record<Action, boolean> = {
			[Action.CREATE]: permission.canCreate,
			[Action.READ]: permission.canRead,
			[Action.UPDATE]: permission.canUpdate,
			[Action.DELETE]: permission.canDelete,
			[Action.RESTORE]: permission.canRestore,
		};
		return actionMap[action] || false;
	}
}
