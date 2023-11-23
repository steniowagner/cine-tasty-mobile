import { formatDate } from './format-date';

describe('Utils/format-date', () => {
  describe('When formating successfully', () => {
    it('should return correctly when the language selected is "en"', () => {
      const formattedDate = formatDate('en', '1994-02-21');
      expect(formattedDate).toEqual('1994-02-21');
    });

    it('should return correctly when the language selected is other than "en"', () => {
      const formattedDate = formatDate('pt', '1994-02-21');
      expect(formattedDate).toEqual('21/02/1994');
    });
  });

  describe('When formating with error', () => {
    it('should return correctly when "date" is not defined', () => {
      const formattedDate = formatDate('en');
      expect(formattedDate).toEqual('-');
    });

    it('should return correctly when "date" has an unexpected format', () => {
      const formattedDate = formatDate('en', '21/02-1994');
      expect(formattedDate).toEqual('-');
    });
  });
});
