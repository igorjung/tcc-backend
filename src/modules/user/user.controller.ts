import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Req, 
  Put 
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashPassowrdPipe } from 'src/resources/pipes/hash-password.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(
    @Body() { password, ...data }: CreateUserDto,
    @Body('password', HashPassowrdPipe) hashedPassword: string,
  ) {
    const user = await this.service.create({
      ...data,
      password: hashedPassword
    });

    return {
      user,
      message: 'usuário criado com sucesso',
    };
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  // @Put()
  // async update(
  //   @Req() req: UserRequest,
  //   @Body() data: UpdateUserDto,
  // ) {
  //   const id = req.user.sub;
  //   const user = await this.service.update(
  //     id,
  //     data,
  //   );

  //   return {
  //     user,
  //     message: 'Usuário atualizado com sucesso',
  //   };
  // }

  // @Delete()
  // async remove(@Req() req: UserRequest) {
  //   const id = req.user.sub;
  //   const user = await this.service.remove(id);

  //   return {
  //     user,
  //     message: 'Usuário removido com suceso',
  //   };
  // }
}
