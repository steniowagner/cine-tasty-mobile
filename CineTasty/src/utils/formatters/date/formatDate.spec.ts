const year = '1994';
const month = '02';
const day = '21';

const date = `${year}-${month}-${day}`;

describe('Testing useParseDate', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return correctly when an empty string is passed', () => {
    const { formatDate } = require('./formatDate');

    expect(formatDate('')).toEqual('-');
  });

  it('should return correctly when the language selected is "en"', () => {
    jest.mock('react-i18next', () => ({
      getI18n: () => ({ language: 'en' }),
    }));

    const { formatDate } = require('./formatDate');

    expect(formatDate(date)).toEqual(`${year}-${month}-${day}`);
  });

  it('should return correctly when the language selected is "sv"', () => {
    jest.mock('react-i18next', () => ({
      getI18n: () => ({ language: 'sv' }),
    }));

    const { formatDate } = require('./formatDate');

    expect(formatDate(date)).toEqual(`${year}-${month}-${day}`);
  });

  it('should return correctly when the language selected is "es"', () => {
    jest.mock('react-i18next', () => ({
      getI18n: () => ({ language: 'es' }),
    }));

    const { formatDate } = require('./formatDate');

    expect(formatDate(date)).toEqual(`${day}/${month}/${year}`);
  });

  it('should return correctly when the language selected is "ptPT"', () => {
    jest.mock('react-i18next', () => ({
      getI18n: () => ({ language: 'ptPT' }),
    }));

    const { formatDate } = require('./formatDate');

    expect(formatDate(date)).toEqual(`${day}/${month}/${year}`);
  });

  it('should return correctly when the language selected is "ptBR"', () => {
    jest.mock('react-i18next', () => ({
      getI18n: () => ({ language: 'ptBR' }),
    }));

    const { formatDate } = require('./formatDate');

    expect(formatDate(date)).toEqual(`${day}/${month}/${year}`);
  });
});
