import { Injectable } from '@nestjs/common';

@Injectable()
export class CriminalStatusVerification {
  public async verifyCriminalStatus(
    passportSeries: number,
    passportNumber: number,
    criminalRecord: boolean,
  ): Promise<boolean> {
    return (
      ((passportNumber + passportSeries + new Date(Date.now()).getSeconds()) %
        2 ==
        0) ==
      criminalRecord
    );
  }
}
