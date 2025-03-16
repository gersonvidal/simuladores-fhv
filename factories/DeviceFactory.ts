import { Device } from "../core/device/Device";

export interface DeviceFactory<T extends Device> {
    createDevice(greenhouseId: string): T;
}