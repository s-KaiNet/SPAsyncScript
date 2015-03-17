declare module SPAsyncScripting {
    interface IAsyncScript {
        load(sync: boolean): void;
        registerDependency(asyncScripts: SPAsyncScript[]): void;
        registerDependencyByName(kies: string[]): void;
    }
    class SPAsyncScript implements IAsyncScript {
        private key;
        private src;
        private onLoad;
        constructor(key: string, src: string, onLoad?: () => any);
        private onLoadFunction;
        load: (sync: boolean) => void;
        registerDependency: (asyncScripts: SPAsyncScript[]) => void;
        registerDependencyByName: (kies: string[]) => void;
    }
}
