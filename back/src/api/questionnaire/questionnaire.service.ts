import { Inject, Injectable } from '@nestjs/common';
import { Questionnaire } from './questionnaire.entity';
import { CreditRateService } from '../credit-rate/credit-rate.service';
import { CreditResultDto } from '@/api/questionnaire/dto/credit-result.dto';
import { CreditScoreService } from '@/api/credit-score/credit-score.service';
import { CriminalStatusVerification } from '@/external-services/criminal-status.verification';

@Injectable()
export class QuestionnaireService {
  @Inject(CreditRateService)
  private readonly creditRateService: CreditRateService;

  @Inject(CreditScoreService)
  private readonly creditScoreService: CreditScoreService;

  @Inject(CriminalStatusVerification)
  private readonly criminalStatusVerification: CriminalStatusVerification;

  public async getCredit(body: Questionnaire): Promise<CreditResultDto> {
    const criminalStatusIsCorrect =
      await this.criminalStatusVerification.verifyCriminalStatus(
        +body.passportSeries,
        +body.passportNumber,
        body.criminalRecord,
      );

    if (!criminalStatusIsCorrect)
      return {
        Score: 0,
        Message: 'Статус судимости не соответствует действительности',
        Result: false,
        creditRate: 0,
      };

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
