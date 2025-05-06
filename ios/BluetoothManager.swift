import Foundation
import CoreBluetooth

@objc(BluetoothManager)
class BluetoothManager: NSObject, CBCentralManagerDelegate {
  
  var centralManager: CBCentralManager?
  var resolve: RCTPromiseResolveBlock?
  var reject: RCTPromiseRejectBlock?
  
  @objc
  func startScanning(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    self.resolve = resolve
    self.reject = reject
    centralManager = CBCentralManager(delegate: self, queue: nil)
  }

  func centralManagerDidUpdateState(_ central: CBCentralManager) {
    if central.state == .poweredOn {
      centralManager?.scanForPeripherals(withServices: nil, options: nil)
    } else {
      reject?("Bluetooth Off", "Bluetooth is not available", nil)
    }
  }

  func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
    if let deviceName = peripheral.name, deviceName.contains("Watch") {
      centralManager?.stopScan()
      resolve?("Apple Watch found: \(deviceName)")
    } else {
      resolve?("No Apple Watch found")
    }
  }
  
}
