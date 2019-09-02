export declare enum Method {
    rmi = 0,
    rmc = 1,
    rmv = 2,
    rmn = 3,
    stop = 4
}
export declare const dokcerFunction: (args: any, method: Method) => Promise<void>;
