import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponse } from './response/user.response';

const route = 'user';
@Controller(route)
@ApiTags(route)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('by-email')
	async findByEmail(@Param('email') email: string) {
		const user = await this.userService.findByEmail(email);
		return UserResponse.fromEntity(user);
	}

	@Get('by-phone')
	async findByPhone(@Param('phone') phone: string) {
		const user = await this.userService.findByPhone(phone);
		return UserResponse.fromEntity(user);
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		const user = await this.userService.findById(id);
		return UserResponse.fromEntity(user);
	}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		const user = await this.userService.create(createUserDto);
		return UserResponse.fromEntity(user);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		const user = await this.userService.update(id, updateUserDto);
		return UserResponse.fromEntity(user);
	}

	@Patch(':id/restore')
	async restore(@Param('id') id: string) {
		const user = await this.userService.restore(id);
		return UserResponse.fromEntity(user);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const user = await this.userService.delete(id);
		return UserResponse.fromEntity(user);
	}
}
