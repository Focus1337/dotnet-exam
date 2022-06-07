import { Inject, Injectable } from '@nestjs/common';
import { Questionnaire } from './questionnaire.entity';
import { CreditRateService } from '../credit-rate/credit-rate.service';
import { CreditResultDto } from '@/api/questionnaire/dto/credit-result.dto';
import { CreditScoreService } from '@/api/credit-score/credit-score.service';

@Injectable()
export class QuestionnaireService {
  @Inject(CreditRateService)
  private readonly creditRateService: CreditRateService;

  @Inject(CreditScoreService)
  private readonly creditScoreService: CreditScoreService;

  public async getCredit(body: Questionnaire): Promise<CreditResultDto> {
    // let criminalStatusIsCorrect = await _criminalStatusChecker.IsCriminalStatusCorrect(questionnaire);
    // if (!criminalStatusIsCorrect)
    //   return new JsonResult(new CreditResultModel(null, false, "Статус судимости не соответствует действительности", null));

    console.warn(body.passportGivenDate);
    console.warn(body.employment);
    console.warn(body.pledge);

    const score = this.creditScoreService.calculateScore(body);

    if (score <= 80)
      return {
        Score: score,
        Message: 'Кредит не будет выдан, набрано 80 или менее баллов',
        Result: false,
        creditRate: 0,
      };

    const creditRate = this.creditRateService.calculateRate(score);

    return {
      Score: score,
      Message: 'Кредит будет выдан, набрано более 80 баллов',
      Result: true,
      creditRate: creditRate,
    };
  }
}
