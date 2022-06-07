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
  Unemployed = 1,
  Contract = 2,
  Individual = 3,
  Freelancer = 4,
  Pensioner = 5,
}

export enum Goal {
  Consumer = 1,
  RealEstate = 2,
  OnLending = 3,
}

export enum Pledge {
  NonPledge = 1,
  RealEstate = 2,
  Car = 3,
  Guarantee = 4,
}

export class Questionnaire {
  // @IsNumber()
  // public id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  public fullName: string;

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
  public otherLoans: boolean;

  @IsEnum(Pledge)
  @IsNotEmpty()
  public pledge: Pledge;

  @IsInt()
  @Min(0)
  @Max(50)
  public carAge?: number;
}
