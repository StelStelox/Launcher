import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { homedir } from 'os';
import { resolve } from 'path';

import { appPath } from '@config';
import { app } from 'electron';

import { LogHelper } from '../helpers/LogHelper';
import { PlatformHelper } from './PlatformHelper';
import { SettingsHelper } from './SettingsHelper';

export class StorageHelper {
    static storageDir: string = this.getPlatformStorageDir();
    static assetsDir: string = resolve(this.storageDir, 'assets');
    static clientsDir: string = resolve(this.storageDir, 'clients');
    static librariesDir: string = resolve(
        this.storageDir,
        'libraries',
    );
    static javaDir: string = resolve(this.storageDir, 'java');
    static logFile: string = resolve(this.storageDir, 'Launcher.log');

    static createMissing(): void {
        if (!existsSync(this.storageDir)) mkdirSync(this.storageDir);
        if (
            SettingsHelper.getStore().get('client.dir') &&
            SettingsHelper.getStore().get('client.dir') !== this.storageDir
        ) {
            this.assetsDir = resolve(SettingsHelper.getStore().get('client.dir'), 'assets');
            this.librariesDir = resolve(
                SettingsHelper.getStore().get('client.dir'),
                'libraries',
            );
            this.clientsDir = resolve(SettingsHelper.getStore().get('client.dir'), 'clients');
            this.javaDir = resolve(SettingsHelper.getStore().get('client.dir'), 'java');
        } else {
            if (!existsSync(this.assetsDir)) mkdirSync(this.assetsDir);
            if (!existsSync(this.clientsDir)) mkdirSync(this.clientsDir);
            if (!existsSync(this.librariesDir)) mkdirSync(this.librariesDir);
            if (!existsSync(this.javaDir)) mkdirSync(this.javaDir);
        }
    }

    private static getPlatformStorageDir() {
        if (PlatformHelper.isMac) {
            return resolve(app.getPath('userData'), '../', appPath);
        }
        return resolve(homedir(), appPath);
    }

    static migration(path: string) {
        cpSync(this.storageDir, path, { recursive: true });
        rmSync(this.assetsDir, { recursive: true });
        rmSync(this.clientsDir, { recursive: true });
        rmSync(this.librariesDir, { recursive: true });
        rmSync(this.javaDir, { recursive: true });
        this.storageDir = path;

        SettingsHelper.setField('dir', path);
        LogHelper.info('Migration completed successfully');
    }
}
