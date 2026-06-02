export interface IPresetOption {
    /**
     * @default '1rem=32rpx'
     */
    rootValue: number;
    /**
     * @default 5(Number)
     */
    unitPrecision: number;
    /**
     * 'Set the minimum pixel value to replace'
     * @default 2(Number)
     */
    minRemValue: number;
    /**
     * default open rem -> rpx setting
     * @default true
     */
    rem2rpx: boolean;
}
export declare type ConfigArray = [
    string,
    {
        lineHeight: string;
        [key: string]: string;
    }
];
export declare type ConfigValue = string | ConfigArray;
export declare type TransformFunc = (value: ConfigValue, ...args: any[]) => ConfigValue;
