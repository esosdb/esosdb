import { AdvancedDatabase } from "./AdvancedDatabase";

declare type PropsTypes = {
    string: string;
    number: number;
    boolean: boolean;
    object: object;
    "string[]": string[];
    "number[]": number[];
    "boolean[]": boolean[];
    "object[]": object[];
    date: Date;
    any: any;
    "any[]": any[];
};

declare type SchemaProps<T extends PropsTypes> = {
    [key: string]: {
        type: keyof T;
        required?: boolean;
        default?: any;
        error?: string;
        props?: SchemaProps<T>;
    };
};

declare type PropsInstance<T> =  {
    [K in keyof T]: T[K]["type"] extends "object"
        ? T[K]["required"] extends true
            ? PropsInstance<T[K]["props"]>
            : PropsInstance<T[K]["props"]> | undefined
        : T[K]["required"] extends true
        ? PropsTypes[T[K]["type"]]
        : PropsTypes[T[K]["type"]] | undefined;
};

declare type ResponseInstance<T> = { id: string } & {
    [K in keyof T]: T[K]["type"] extends "object"
        ? T[K]["required"] extends true
            ? PropsInstance<T[K]["props"]>
            : PropsInstance<T[K]["props"]> | undefined
        : T[K]["required"] extends true
        ? PropsTypes[T[K]["type"]]
        : PropsTypes[T[K]["type"]] | undefined;
};

declare type SpecificElementType<T> = {
    [K in keyof T]?: T[K]["type"] extends "object"
        ? SpecificElementType<T[K]["props"]>
        : PropsTypes[T[K]["type"]];
};

declare class CreateSchema<T extends SchemaProps<PropsTypes>> {
    constructor({
        connect,
        name,
        props,
        timestamps = false,
    }: {
        connect: AdvancedDatabase;
        name: string;
        props: T;
        timestamps?: boolean;
    });
    create(
        value: {
            [K in keyof PropsInstance<T>]: T[K]["type"] extends "object"
                ? {
                      [R in keyof T[K]["props"]]: PropsInstance<
                          T[K]["props"]
                      >[R];
                  }
                : PropsInstance<T>[K];
        },
        listener?: (
            err: Error,
            data: {
                [K in keyof ResponseInstance<T>]: T[K]["type"] extends "object"
                    ? {
                          [R in keyof T[K]["props"]]: ResponseInstance<
                              T[K]["props"]
                          >[R];
                      }
                    : ResponseInstance<T>[K];
            }
        ) => any
    ): any;

    deleteById(id: string, listener?: (err: Error, data: {}) => any): any;

    findById(
        id: string,
        listener?: (
            err: Error,
            data: {
                [K in keyof ResponseInstance<T>]: T[K]["type"] extends "object"
                    ? {
                          [R in keyof T[K]["props"]]: ResponseInstance<
                              T[K]["props"]
                          >[R];
                      }
                    : ResponseInstance<T>[K];
            }
        ) => any
    ): any;

    findByElement(
        element: {
            [K in keyof SpecificElementType<T>]?: T[K]["type"] extends "object"
                ? {
                      [R in keyof T[K]["props"]]: SpecificElementType<
                          T[K]["props"]
                      >[R];
                  }
                : SpecificElementType<T>[K];
        },
        listener?: (
            err: Error,
            data: [
                {
                    [K in keyof ResponseInstance<T>]: T[K]["type"] extends "object"
                        ? {
                              [R in keyof T[K]["props"]]: ResponseInstance<
                                  T[K]["props"]
                              >[R];
                          }
                        : ResponseInstance<T>[K];
                }
            ]
        ) => any
    ): any;

    updateById(
        id: string,
        value: {
            [K in keyof SpecificElementType<T>]?: T[K]["type"] extends "object"
                ? {
                      [R in keyof T[K]["props"]]?: SpecificElementType<
                          T[K]["props"]
                      >[R];
                  }
                : SpecificElementType<T>[K];
        },
        listener?: (
            err: Error,
            data: {
                [K in keyof ResponseInstance<T>]: T[K]["type"] extends "object"
                    ? {
                          [R in keyof T[K]["props"]]: ResponseInstance<
                              T[K]["props"]
                          >[R];
                      }
                    : ResponseInstance<T>[K];
            }
        ) => any
    ): any;
}

export { CreateSchema };
