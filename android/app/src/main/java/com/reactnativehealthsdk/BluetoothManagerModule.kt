package com.reactnativehealthsdk;

import android.annotation.SuppressLint
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import androidx.activity.result.contract.ActivityResultContracts
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.util.Locale

class BluetoothManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "BluetoothManagerModule"
    }

    @SuppressLint("MissingPermission")
    @ReactMethod
    fun startScanning(promise: Promise) {
        val bluetoothAdapter: BluetoothAdapter? = BluetoothAdapter.getDefaultAdapter()

        if (bluetoothAdapter == null) {
            promise.reject("Bluetooth not supported", "This device does not support Bluetooth.")
            return
        }

        if (!bluetoothAdapter.isEnabled) {
            promise.reject("Bluetooth off", "Bluetooth is not enabled.")
            return
        }

        val watchDevices = mutableListOf<Map<String, Any>>()

        val pairedDevices: MutableSet<BluetoothDevice>? = bluetoothAdapter.bondedDevices
        if (pairedDevices != null) {
            for (device in pairedDevices) {
                //     println("device", device)
                //     if (ActivityCompat.checkSelfPermission(this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                //         // TODO: Consider calling
                //         //    ActivityCompat#requestPermissions
                //         // here to request the missing permissions, and then overriding
                //         //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                //         //                                          int[] grantResults)
                //         // to handle the case where the user grants the permission. See the documentation
                //         // for ActivityCompat#requestPermissions for more details.
                //         return
                //     }
                device.name?.let {
                    if (it.lowercase().contains("watch")) {
                        promise.resolve("Found wearable: ${device.name}, MAC: ${device.address}, Device Type: ${device.type}, Device UUIDs: ${device.uuids}")
                        return
                    }
                }
            }
        }

        promise.resolve("No wearable found.")
    }
}