import { Module } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireController } from './questionnaire.controller';
import { CreditRateModule } from '../credit-rate/credit-rate.module';
import { CreditScoreModule } from '@/api/credit-score/credit-score.module';

@Module({
  imports: [CreditRateModule, CreditScoreModule],
  providers: [QuestionnaireService],
  controllers: [QuestionnaireController],
})
export class QuestionnaireModule {}
