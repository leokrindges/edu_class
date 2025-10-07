import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const _prisma = new PrismaClient();
export const userId = 'admin_id_1234567890';
export const userTeacherId = 'teacher_id_1234567890';
export const userStudentId = 'student_id_1234567890';

async function main() {
	const userAdminPassword = await bcrypt.hash('123456', 10);
	await _prisma.user.upsert({
		where: { id: userId },
		update: {
			id: userId,
			email: 'admin@admin.com',
			name: 'Leonardo Krindges',
			password: userAdminPassword,
			type: 'ADMIN',
			isAdmin: true,
			address: 'Rua dos bobos, 0',
			phone: '1234567890',
			avatar: 'https://i.pravatar.cc/300',
			birthDate: new Date('1990-01-01'),
		},
		create: {
			id: userId,
			email: 'admin@admin.com',
			name: 'Leonardo Krindges',
			password: userAdminPassword,
			type: 'ADMIN',
			isAdmin: true,
			address: 'Rua dos bobos, 0',
			phone: '1234567890',
			avatar: 'https://i.pravatar.cc/300',
			birthDate: new Date('1990-01-01'),
		},
	});
	const userTeacherPassword = await bcrypt.hash('123456', 10);
	await _prisma.user.upsert({
		where: { id: userTeacherId },
		update: {},
		create: {
			id: userTeacherId,
			email: 'jhon@jhon.com',
			name: 'Jhon Doe',
			password: userTeacherPassword,
			type: 'TEACHER',
		},
	});
	const userStudentPassword = await bcrypt.hash('123456', 10);
	await _prisma.user.upsert({
		where: { id: userStudentId },
		update: {},
		create: {
			id: userStudentId,
			email: 'fulano@fulano.com',
			name: 'Fulano de Tal',
			password: userStudentPassword,
			type: 'STUDENT',
		},
	});

	const routes = await _prisma.routeRole.createMany({
		skipDuplicates: true,
		data: [{ name: '/teacher' }, { name: '/student' }],
	});
	if (!routes) throw new Error('No routes created');

	await _prisma.$transaction(
		async (tx) => {
			const listRoutes = await tx.routeRole.findMany();
			if (listRoutes.length === 0) throw new Error('No routes found');

			const adminId = randomUUID();
			const adminRole = await tx.role.upsert({
				where: { id: adminId },
				update: {
					id: adminId,
					name: 'Administrador',
					color: '#334155',
				},
				create: {
					id: adminId,
					name: 'Administrador',
					color: '#334155',
				},
			});

			const adminPermissionId = randomUUID();
			const adminPermissions = await tx.permission.upsert({
				create: {
					id: adminPermissionId,
					roleId: adminRole.id,
					canCreate: true,
					canRead: true,
					canUpdate: true,
					canDelete: true,
					canRestore: true,
				},
				update: {
					id: adminPermissionId,
					roleId: adminRole.id,
					canCreate: true,
					canRead: true,
					canUpdate: true,
					canDelete: true,
					canRestore: true,
				},
				where: { id: adminPermissionId },
			});

			await tx.routePermission.createMany({
				skipDuplicates: true,
				data: listRoutes.map((route) => {
					return {
						routeId: route.id,
						permissionId: adminPermissions.id,
					};
				}),
			});

			await tx.user.update({
				where: { id: userId },
				data: {
					roleId: adminRole.id,
				},
			});
		},
		{ isolationLevel: 'Serializable' },
	);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await _prisma.$disconnect();
	});
