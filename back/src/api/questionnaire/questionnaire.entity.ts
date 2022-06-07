import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export enum Employment {
  Contract = 'Contract',
  Individual = 'Individual',
  Freelancer = 'Freelancer',
  Pensioner = 'Pensioner',
  Unemployed = 'Unemployed',
}

export enum Goal {
  Consumer = 'Consumer',
  RealEstate = 'RealEstate',
  OnLending = 'OnLending',
}

export enum Pledge {
  RealEstate = 'RealEstate',
  Auto = 'Auto',
  Guarantee = 'Guarantee',
  NonPledge = 'NonPledge',
}

export class Questionnaire {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  public fio: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 4)
  public passportSeries?: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  public passportNumber?: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 40)
  public passportGiven: string;

  @IsDateString()
  @IsNotEmpty()
  public passportGivenDate?: Date;

  @IsString()
  @IsNotEmpty()
  @Length(5, 40)
  public passportRegistration: string;

  @IsInt()
  @IsNotEmpty()
  @Min(18)
  @Max(100)
  public age?: number;

  @IsBoolean()
  @IsNotEmpty()
  public criminalRecord: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(10000000)
  public sum?: number;

  @IsEnum(Goal)
  @IsNotEmpty()
  public goal?: Goal;

  @IsEnum(Employment)
  @IsNotEmpty()
  public employment?: Employment;

  @IsBoolean()
  @IsNotEmpty()
  public otherCredits: boolean;

  @IsEnum(Pledge)
  @IsNotEmpty()
  public pledge: Pledge;

  @IsInt()
  public autoAge?: number;
}
