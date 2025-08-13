import { KeystrokeService } from './keystroke.service';
export declare class KeystrokeController {
    private readonly keystrokeService;
    constructor(keystrokeService: KeystrokeService);
    getKeystrokeStats(): Promise<{
        totalCount: number;
        keyCounts: {
            key: any;
            count: number;
        }[];
    }>;
}
