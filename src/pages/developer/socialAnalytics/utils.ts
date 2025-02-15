import { ICON_ENUM } from '../../../constants/icons.constant';
import {
    checkNullOrEmpty,
    fomatedDateMonthDY,
    roundToOneDecimal,
    sortDataByDateTime,
    typeDetector,
} from '../../../utils/utils';

export const gradientStrokes = {
    facebook: [
        { offset: '8.66%', stopColor: '#1C36B7' },
        { offset: '90.78%', stopColor: '#1C98D3' },
    ],

    linkedin: [
        { offset: '0.12%', stopColor: '#007BB8' },
        { offset: '99.98%', stopColor: '#0044E9' },
    ],
    youtube: [
        { offset: '14.6%', stopColor: '#FF0000' },
        { offset: '85.41%', stopColor: '#9B0000' },
    ],
    instagram: [
        { offset: '13.8%', stopColor: '#5342D6' },
        { offset: '18.4%', stopColor: '#7739C6' },
        { offset: '25.1%', stopColor: '#A52DB0' },
        { offset: '28.46%', stopColor: '#B729A8' },
        { offset: '37.01%', stopColor: '#CE257E' },
        { offset: '47.52%', stopColor: '#E82250' },
        { offset: '52.8%', stopColor: '#F2203E' },
        { offset: '65.79%', stopColor: '#F2203E' },
        { offset: '67.35%', stopColor: '#F32D40' },
        { offset: '75.25%', stopColor: '#F86C48' },
        { offset: '81.93%', stopColor: '#FB994E' },
        { offset: '87.06%', stopColor: '#FDB652' },
        { offset: '90.03%', stopColor: '#FEC053' },
    ],
    tiktok: [
        { offset: 0, stopColor: '#5B5760' },
        { offset: 0.6, stopColor: '#020003' },
        { offset: 1, stopColor: '#000000' },
    ],
    twich: [
        { offset: '0%', stopColor: '#A436D2' },
        { offset: '100%', stopColor: '#9146FF' },
    ],
    googlebusiness: [
        { offset: '14.6%', stopColor: '#006EF8' },
        { offset: '69.49%', stopColor: '#212CB1' },
        { offset: '85.41%', stopColor: '#2B189C' },
    ],
};

export const progressBarConfiguration = (
    tilesList: any[],
    data: any[],
): any[] => {
    const dataMap = data.reduce((acc: { [key: string]: any }, entry: any) => {
        if (entry?.name) {
            acc[entry.name.toLowerCase()] = entry;
        }
        return acc;
    }, {});

    return tilesList?.map((tile: any) => {
        let progressKeyData: { [key: string]: any } = {};

        const findData = dataMap[tile?.targetKey?.toLowerCase()] ?? {};

        const progressValArr = tile?.progressList?.map((progress: any) => {
            const findVal = dataMap[progress?.targetKey?.toLowerCase()] ?? {};

            const value = getValueFromData(findVal, progress?.targetValKey);

            progressKeyData[progress.targetKey] = value;
            return value;
        }) ?? [];

        const valSum = progressValArr.reduce((a: number, b: number) => a + b, 0);

        const progressConfig = tile?.progressList?.map((platform: any) => {
            const percentage = valSum ? (progressKeyData[platform?.targetKey] ?? 0) / valSum * 100 : 0;
            return {
                ...platform,
                value: progressKeyData[platform?.targetKey],
                percentage: roundToOneDecimal(percentage),
                color: platform?.color ?? '#ffff',
            };
        }) ?? [];

        return {
            ...tile,
            count: getValueFromData(findData),
            bodyIcon: findData?.trend ? ICON_ENUM[findData?.trend as keyof typeof ICON_ENUM]?.icon : '',
            text: findData.changedValue && findData.changedValue !== 0
                ? `${findData.changedValue > 0 ? '+' : ''}${parseFloat(findData.changedValue).toFixed(2)} (${parseFloat(findData.percentage).toFixed(2)}%)`
                : '',
            progressConfig
        };
    }) ?? [];
};

const getValueFromData = (data: any, key: string = 'value'): number => {
    return data?.[key] && !isNaN(data[key]) ? roundToOneDecimal(data[key]) : 0;
};


export const tilesConfiguration = (tilesList: any[], data: any[]): any[] => {
    const newTilesList = tilesList?.map((tile: any, index: number) => {
        let findData =
            data?.find(
                (entry: any) =>
                    entry?.name?.toLowerCase() === tile?.targetKey?.toLowerCase(),
            ) ?? {};
        return {
            ...tile,
            count:
                findData?.value && !isNaN(findData?.value)
                    ? roundToOneDecimal(findData.value)
                    : 0,
            // count: findData?.value && !isNaN(findData?.value)
            //     ? tile?.valueDecimal
            //         ? parseFloat(findData?.value)?.toFixed(tile.valueDecimal)
            //         : findData.value
            //     : 0,
            bodyIcon: findData.trend
                ? ICON_ENUM?.[findData.trend as keyof typeof ICON_ENUM]?.icon
                : '',
            text:
                findData?.changedValue && findData?.changedValue !== 0
                    ? findData?.changedValue > 0
                        ? `+${parseFloat(findData?.changedValue)?.toFixed(2)} (${parseFloat(
                            findData?.percentage,
                        )?.toFixed(2)}%)`
                        : `${parseFloat(findData?.changedValue)?.toFixed(2)} (${parseFloat(
                            findData?.percentage,
                        )?.toFixed(2)}%)`
                    : '',
        };
    });

    return newTilesList ?? [];
};

export const graphConfigGenerator = (
    keySet: string[],
    dataSet: { [key: string]: any },
) => {
    let newDataSet: { [key: string]: any }[] = [];
    const dateMap: { [date: string]: { [key: string]: any } } = {};

    keySet?.forEach((key: string, index: number) => {
        const currentData = dataSet?.[key] ?? null;

        if (!checkNullOrEmpty(currentData)) {
            currentData?.data?.forEach(({ dateTime, values }: any) => {
                if (values && values.length !== 0) {
                    currentData?.forEach((entry: any) => {
                        const formattedDate = fomatedDateMonthDY(dateTime);

                        if (index === 0) {
                            const newEntry = {
                                dateTime: formattedDate,
                                [key]: entry.value ?? 0,
                            };
                            newDataSet?.push(newEntry);
                            dateMap[formattedDate] = newEntry;
                        } else {
                            const existingData = dateMap[formattedDate];

                            if (existingData) {
                                existingData[key] = entry.value ?? 0;
                            } else {
                                const newEntry = {
                                    dateTime: formattedDate,
                                    [key]: entry.value ?? 0,
                                };
                                newDataSet?.push(newEntry);
                                dateMap[formattedDate] = newEntry;
                            }
                        }
                    });
                }
            });
        }
    });

    return newDataSet;
};

export const graphConfigGeneratorInsta = (
    keySet: string[],
    dataSet: { [key: string]: any },
    baseKey: string = 'dateTime',
) => {
    let newDataSet: { [key: string]: any }[] = [];
    const dateMap: { [date: string]: { [key: string]: any } } = {};

    keySet.forEach((key: string, index: number) => {
        let currentData = dataSet?.[key] ?? null;
        if (
            typeDetector(currentData) === 'object' &&
            currentData.hasOwnProperty('data')
        ) {
            currentData = currentData.data
                ?.map((member: any) => member?.values ?? [])
                .flat();
        }

        if (
            !checkNullOrEmpty(currentData) &&
            typeDetector(currentData) === 'array' &&
            currentData[0].hasOwnProperty('values')
        ) {
            currentData = currentData[0]?.values ?? [];
        }

        if (!checkNullOrEmpty(currentData)) {
            currentData?.forEach((entry: any) => {
                const formattedDate =
                    baseKey === 'dateTime'
                        ? fomatedDateMonthDY(entry?.dateTime?.split('T')[0])
                        : entry[baseKey];

                if (index === 0) {
                    const newEntry = { [baseKey]: formattedDate, [key]: entry.value ?? 0 };
                    newDataSet?.push(newEntry);
                    dateMap[formattedDate] = newEntry;
                } else {
                    const existingData = dateMap[formattedDate];

                    if (existingData) {
                        existingData[key] = entry.value ?? 0;
                    } else {
                        const newEntry = {
                            [baseKey]: formattedDate,
                            [key]: entry.value ?? 0,
                        };
                        newDataSet.push(newEntry);
                        dateMap[formattedDate] = newEntry;
                    }
                }
            });
        }
    });

    return baseKey === 'dateTime' ? sortDataByDateTime(newDataSet) : newDataSet;
};
