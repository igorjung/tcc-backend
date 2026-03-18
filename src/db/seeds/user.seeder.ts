import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Seeder } from 'typeorm-extension';

import { UserEntity } from '../../modules/user/entities/user.entity';
import {
  UserAvailability,
  UserExperience,
  UserRole,
} from '../../enum/user.enum';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource) {
    const userRepository = dataSource.getRepository(UserEntity);
    await userRepository.save([
      {
        name: 'Admin User',
        email: 'admin@mail.com',
        password: await bcrypt.hash('Senha123@', 10),
        birthDate: '2021-06-11T00:00',
        role: UserRole.ADMIN,
        experience: UserExperience.ADVANCED,
        availability: UserAvailability.MORE_THAN_2_HOURS,
      },
      {
        name: 'Aluno User',
        email: 'aluno@mail.com',
        password: await bcrypt.hash('Senha123@', 10),
        birthDate: '2021-06-11T00:00',
        role: UserRole.STUDENT,
        experience: UserExperience.BEGINNER,
        availability: UserAvailability['1_TO_2_HOURS'],
      },
    ]);
  }
}
