import i18n from 'i18n-iso-countries';

i18n.registerLocale(require('i18n-iso-countries/langs/en.json'));

const useGetCountry = (language = 'en') => {

    const getCountryByCode = (code: string) => {
        let country = i18n.getName(code.toUpperCase(), language ?? 'en');
        // setCountryName(country ?? '');
        return country;
    };

    const getCountryFlag = (code: string) => {
        const codePoints = code
            .toUpperCase()
            .split('')
            .map(c => 0x1f1e6 - 65 + c.charCodeAt(0));
        let flag = String.fromCodePoint(...codePoints);
        // setCountryFlag(flag);
        return flag;
    };

    const getCountryAndFlag = (code: string) => {
        const country = getCountryByCode(code);
        const flag = getCountryFlag(code);

        return { country, flag }
    }

    return {
        getCountry: getCountryByCode,
        getFlag: getCountryFlag,
        getCountryAndFlag
    };
};

export default useGetCountry;
