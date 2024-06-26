import { Injectable } from '@nestjs/common'
import { config } from 'dotenv'
import OpenAI from 'openai'

config()

const {
  OPENAI_ORGANIZATION,
  OPENAI_PROJECT,
  OPENAI_MODEL
} = process.env

@Injectable()
export class OpenAiProvider {
  constructor() {}

  async use(content: string): Promise<string> {
    const openai = new OpenAI({
      organization: OPENAI_ORGANIZATION,
      project: OPENAI_PROJECT,
    })

    const response: any = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [{ role: "user", content }],
      stream: false,
    })
    
    const choices = response.choices.map((choice) => choice.message)
  
    return choices[0].content
  }
}