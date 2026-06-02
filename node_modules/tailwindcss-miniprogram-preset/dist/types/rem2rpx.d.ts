import type { IPresetOption } from './types';
export declare const remUnitRegex: RegExp;
export declare function toFixed(number: number, precision: number): number;
export declare function createRemReplace(rootValue: number, unitPrecision: number, minRemValue: number): (m: string, $1?: string | undefined) => string;
export declare function createRem2rpx(option: IPresetOption): (str: string) => string;
export declare const rem2rpx: (str: string) => string;
