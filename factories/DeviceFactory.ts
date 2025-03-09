export abstract class DeviceFactory<T> {
    abstract createDevice(): T;
}