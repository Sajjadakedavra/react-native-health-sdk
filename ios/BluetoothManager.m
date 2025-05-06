#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BluetoothManager, NSObject)

RCT_EXTERN_METHOD(startScanning:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end
