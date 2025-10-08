type JestFn<TArgs extends any[] = any[], TReturn = any> = jest.Mock<
	TReturn,
	TArgs
>;

type UserDelegateMock = {
	findUnique: JestFn<[any], any>;
	create: JestFn<[any], any>;
	update: JestFn<[any], any>;
};

export type PrismaServiceMock = {
	user: UserDelegateMock;
	$transaction: JestFn<[any], any>;
	$connect: JestFn;
	$disconnect: JestFn;
};

export const prismaServiceMock: PrismaServiceMock = {
	user: {
		findUnique: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
	},
	$transaction: jest.fn(),
	$connect: jest.fn(),
	$disconnect: jest.fn(),
};

// (Opcional) se você usa $transaction com callback:
prismaServiceMock.$transaction.mockImplementation(
	async (cb: (tx: PrismaServiceMock) => any) => cb(prismaServiceMock),
);
