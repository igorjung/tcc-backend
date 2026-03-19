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
        email: process.env.ADMIN_USER,
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD ?? '', 10),
        birthDate: '2021-06-11T00:00',
        role: UserRole.ADMIN,
        experience: UserExperience.ADVANCED,
        availability: UserAvailability.MORE_THAN_2_HOURS,
      },
    ]);
  }
}
