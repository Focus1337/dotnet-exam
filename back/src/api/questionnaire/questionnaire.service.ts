import { Inject, Injectable } from '@nestjs/common';
import {
  Employment,
  Goal,
  Pledge,
  Questionnaire,
} from './questionnaire.entity';
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

  // public async getAll(): Promise<Questionnaire[]> {
  //   const credit: Questionnaire = {
  //     fullName: 'Test Testov Testovich',
  //     passportSeries: '9996',
  //     passportNumber: '777087',
  //     passportGiven: 'УФМС РФ ПО РТ г. Казань',
  //     passportGivenDate: new Date(Date.now()),
  //     passportRegistration: 'г. Казань, ул. Пушкина, д.18, кв. 12',
  //     age: 18,
  //     criminalRecord: false,
  //     sum: 1000000,
  //     goal: Goal.Consumer,
  //     employment: Employment.Unemployed,
  //     otherLoans: false,
  //     pledge: Pledge.Car,
  //     carAge: 2,
  //   };
  //
  //   // const creditList: Questionnaire[] = ;
  //
  //   // creditList.push(credit);
  //
  //   return [credit];
  // }

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
        Message: "Criminal record status doesn't match",
        Result: false,
        creditRate: 0,
      };

    const score = this.creditScoreService.calculateScore(body);

    if (score < 80)
      return {
        Score: score,
        Message: 'Credit will not be issued: 80 points or less are scored',
        Result: false,
        creditRate: 0,
      };

    const creditRate = this.creditRateService.calculateRate(score);

    return {
      Score: score,
      Message: 'Credit will be issued: more than 80 points scored',
      Result: true,
      creditRate: creditRate,
    };
  }
}
