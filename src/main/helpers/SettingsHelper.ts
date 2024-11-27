import os from 'os';
import Store from 'electron-store';
import { app } from 'electron';
import { parse } from 'path';

import { SettingsFormat } from '../../common/types';
import { StorageHelper } from './StorageHelper';

export class SettingsHelper {
    static store: any;

    static init() {
        this.store = new Store({
            cwd: parse(app.getPath('userData')).dir,
            defaults: {
                client: this.defaultsValue(),
            },
        });
    }

    static defaultsValue(): SettingsFormat {
        return {
            token: '0',
            dir: StorageHelper.storageDir,
            autoConnect: false,
            fullScreen: false,
            memory: 1024,
            startDebug: false,
        };
    }

    static getStore() {
        return this.store;
    }

    static getAllFields(): SettingsFormat {
        return this.getStore().get('client');
    }

    static getField(name: string) {
        return this.getStore().get('client.' + name);
    }

    static setField(field: string, value: string | boolean | number): void {
        return this.getStore().set('client.' + field, value);
    }

    static getTotalMemory(): number {
        const remainingMemMegabytes = Math.floor(os.totalmem() / 1024 ** 2) / 2;

        return (
            remainingMemMegabytes -
            (remainingMemMegabytes % 1024) +
            (remainingMemMegabytes % 1024 ? 1024 : 0)
        );
    }
}
