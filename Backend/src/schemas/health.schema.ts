import { ApiProperty } from '@nestjs/swagger'

export class HealthSchema {
  @ApiProperty({
    type: String,
    example: 'OK'
  })
  message: string
}