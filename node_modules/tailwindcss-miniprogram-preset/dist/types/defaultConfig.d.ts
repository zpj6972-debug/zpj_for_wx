import type { IPresetOption, TransformFunc } from './types';
import type { TailwindThemeValue, TailwindTheme } from 'tailwindcss/tailwind-config';
export declare function ObjectValueMap<T = TailwindThemeValue>(obj: T, fn: TransformFunc): T;
export declare function createExpandThemeConfig(option?: IPresetOption): TailwindTheme;
export declare const expandThemeConfig: TailwindTheme;
