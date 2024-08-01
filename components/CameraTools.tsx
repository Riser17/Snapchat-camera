import { View, Text } from "react-native";
import React from "react";
import { FlashMode } from "expo-camera";
import IconButton from "./IconButton";

interface CameraToolsProps {
  cameraZoom: number;
  cameraFlash: FlashMode;
  cameraTorch: boolean;
  setCameraZoom: React.Dispatch<React.SetStateAction<number>>;
  setCameraFacing: React.Dispatch<React.SetStateAction<"front" | "back">>;
  setCameraTorch: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraFlash: React.Dispatch<React.SetStateAction<FlashMode>>;
}
export default function CameraTools({
  cameraZoom,
  cameraFlash,
  cameraTorch,
  setCameraZoom,
  setCameraFacing,
  setCameraTorch,
  setCameraFlash,
}: CameraToolsProps) {
  return (
    <View
      style={{
        position: "absolute",
        right: 6,
        gap: 16,
        zIndex: 1,
        backgroundColor: "#C2C2C270",
        paddingHorizontal: 4,
        paddingVertical: 8,
        borderRadius: 22,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      }}
    >
      <IconButton
        iosName={
          cameraTorch ? "flashlight.off.circle" : "flashlight.slash.circle"
        }
        androidName="flash"
        onPress={() => setCameraTorch((prev) => !prev)}
      />
      <IconButton
        onPress={() =>
          setCameraFacing((prevValue) =>
            prevValue === "back" ? "front" : "back"
          )
        }
        iosName={"arrow.triangle.2.circlepath.camera"}
        androidName="close"
        width={25}
        height={21}
      />
      <IconButton
        onPress={() =>
          setCameraFlash((prevValue) => (prevValue === "off" ? "on" : "off"))
        }
        iosName={cameraFlash === "on" ? "bolt.circle" : "bolt.slash.circle"}
        androidName="close"
      />
      <IconButton
        onPress={() => {}}
        iosName={"speaker"}
        // iosName={"speaker.slash"}
        androidName="volume-high"
      />
      <IconButton
        onPress={() => {
          // increment by .01
          if (cameraZoom < 1) {
            setCameraZoom((prevValue) => prevValue + 0.01);
          }
        }}
        iosName={"plus.magnifyingglass"}
        androidName="close"
      />
      <IconButton
        onPress={() => {
          // decrement by .01
          if (cameraZoom > 0) {
            setCameraZoom((prevValue) => prevValue - 0.01);
          }
        }}
        iosName={"minus.magnifyingglass"}
        androidName="close"
      />
    </View>
  );
}
