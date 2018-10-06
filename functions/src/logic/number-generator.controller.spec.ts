import { Generator } from "./number-generator.controller";
import * as crypto from "crypto";

// use jest framework for stub random value
jest.mock('crypto');
const mockRandomBytes = <jest.Mock<typeof crypto.randomBytes>>crypto.randomBytes;

const POW_2_64 = Math.pow(2, 64);

describe('Generator', () => {

  describe('GetNumberBetween 1 - 6', () => {

    it('should be 1', () => {   
      const stubRand =  new Buffer(POW_2_64.toString(16), 'hex');
      mockRandomBytes.mockReturnValue(stubRand);    
      const result = Generator.GetNumberBetween(1, 6);
      expect(result).toBe(1);
    });
  
    it('should be 2', () => {
      const stubRand =  new Buffer((POW_2_64 * 0.2).toString(16), 'hex')
      mockRandomBytes.mockReturnValue(stubRand);    
      const result = Generator.GetNumberBetween(1, 6);
      expect(result).toBe(2);
    });
  
    it('should be 3', () => {    
      const stubRand =  new Buffer((POW_2_64 * 0.4).toString(16), 'hex')
      mockRandomBytes.mockReturnValue(stubRand);    
      const result = Generator.GetNumberBetween(1, 6);
      expect(result).toBe(3);
    });

    // TODO: need fix random function because it possible to be max value in this case is 6
    // it('should be 6', () => {    
    //   const stubRand =  new Buffer((POW_2_64 * 0.1).toString(16), 'hex')
    //   mockRandomBytes.mockReturnValue(stubRand);    
    //   const result = Generator.GetNumberBetween(1, 6);

    //   expect(result).toBe(6);

    //   let found = false;

    //   for(let i = 0 ; i < 1000000 ; i ++) {
    //     const result = Generator.GetNumberBetween(1, 6);
    //     if (result === 6) {
    //       console.log('found');
    //       found = true;
    //       break;
    //     }
    //   }
    //   console.log('found', found);
    // });

  });
});
