import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { CameraMode, CameraView, FlashMode } from "expo-camera";
import * as WebBrowser from "expo-web-browser";

import BottomRowTools from "@/components/BottomRowTools";
import MainRowActions from "@/components/MainRowActions";
import { BarCodeScanningResult } from "expo-camera/build/legacy/Camera.types";
import QRCodeButton from "@/components/QRCodeButton";
import CameraTools from "@/components/CameraTools";
import PictureView from "@/components/PictureView";
import VideoViewComponent from "@/components/VideoView";

export default function HomeScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = useState<CameraMode>("picture");
  const [qrCodeDetected, setQrCodeDetected] = useState<string>("");
  const [isBrowsing, setIsBrowsing] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [cameraZoom, setCameraZoom] = useState<number>(0);
  const [cameraTorch, setCameraTorch] = useState<boolean>(false);
  const [cameraFlash, setCameraFlash] = useState<FlashMode>("off");
  const [cameraFacing, setCameraFacing] = useState<"front" | "back">("back");

  const [picture, setPicture] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [filterColor, setFilterColor] = useState<string>("transparent");

  async function toggleRecord() {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const response = await cameraRef.current?.recordAsync();
      setVideo(response!.uri);
    }
  }

  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync();

    console.log("Captured Image URI:", response!.uri);
    setPicture(response!.uri);
  }

  async function handleOpenQRCode() {
    setIsBrowsing(true);
    const browserResult = await WebBrowser.openBrowserAsync(qrCodeDetected, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
    });
    if (browserResult.type === "cancel") {
      setIsBrowsing(false);
    }
  }

  function handleBarcodeScanned(scanningResult: BarCodeScanningResult) {
    if (scanningResult.data) {
      console.log(scanningResult.data);
      setQrCodeDetected(scanningResult.data);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setQrCodeDetected("");
    }, 1000);
  }

  if (isBrowsing) return <></>;
  if (picture)
    return (
      <PictureView
        picture={picture}
        setPicture={setPicture}
        colors={filterColor}
      />
    );
  if (video) return <VideoViewComponent video={video} setVideo={setVideo} />;

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        mode={cameraMode}
        zoom={cameraZoom}
        flash={cameraFlash}
        enableTorch={cameraTorch}
        facing={cameraFacing}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleBarcodeScanned}
        style={{ flex: 1 }}
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: filterColor,
            opacity: filterColor === "transparent" ? 0 : 0.3,
          }}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {qrCodeDetected ? (
              <QRCodeButton handleOpenQRCode={handleOpenQRCode} />
            ) : null}
            <CameraTools
              cameraZoom={cameraZoom}
              cameraFlash={cameraFlash}
              cameraTorch={cameraTorch}
              setCameraZoom={setCameraZoom}
              setCameraFacing={setCameraFacing}
              setCameraTorch={setCameraTorch}
              setCameraFlash={setCameraFlash}
            />
            <MainRowActions
              cameraMode={cameraMode}
              handleTakePicture={
                cameraMode === "picture" ? handleTakePicture : toggleRecord
              }
              isRecording={isRecording}
              filterColor={filterColor}
              setFilterColor={setFilterColor}
            />
            <BottomRowTools
              setCameraMode={setCameraMode}
              cameraMode={cameraMode}
            />
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}
