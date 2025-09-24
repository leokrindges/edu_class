import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const _prisma = new PrismaClient();
export const teacherId = 'cmab4u9ym00010cl29sfv8sbh';

async function main() {
	const teacherPassword = await bcrypt.hash('123456', 10);
    console.log({ teacherPassword });
	await _prisma.teacher.upsert({
		where: { id: teacherId },
		update: { },
		create: {
			id: teacherId,
			email: 'teacher@teacher.com',
			name: 'Leonardo Krindges',
            password: teacherPassword,
        },
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await _prisma.$disconnect();
	});
