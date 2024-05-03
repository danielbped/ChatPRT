import { Injectable } from '@nestjs/common'
import User, { ICreateUserDTO, ILoginDTO } from '../../entity/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import ErrorMessage from '../../utils/ErrorMessage'
import PasswordHandler from '../../helper/passwordHandler.helper'
import Token from '../../helper/token.helper'
import { CreateUserResponse, LoginResponse } from '../../interface/response.interface'

@Injectable()
export class UserService {
  private passwordHandler: PasswordHandler
  private token: Token

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    this.passwordHandler = new PasswordHandler()
    this.token = new Token()
  }

  async create(user: ICreateUserDTO): Promise<CreateUserResponse> {
    const hashPassword = this.passwordHandler.encode(user.password)

    if (!hashPassword) {
      throw new Error(ErrorMessage.EncodeError)
    }

    const newUser = new User({ ...user, password: hashPassword})

    const createdUser = await this.usersRepository.save(newUser)

    const token = this.token.generate(createdUser)

    return {
      user: {
        ...createdUser,
        password: null
      },
      token
    }
  }

  async login(data: ILoginDTO): Promise<LoginResponse> {
    const user = await this.usersRepository.findOne({ where: { email: data.email } })

    const token = this.token.generate(user)

    return {
      token,
      user: {
        ...user,
        password: null
      }
    }
  }
}
