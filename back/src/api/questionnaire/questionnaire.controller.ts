import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreditResultDto } from './dto/credit-result.dto';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire } from './questionnaire.entity';

@Controller('questionnaire')
export class QuestionnaireController {
  @Inject(QuestionnaireService)
  private readonly service: QuestionnaireService;

  @Post()
  public getCredit(@Body() body: Questionnaire): Promise<CreditResultDto> {
    return this.service.getCredit(body);
  }
}
