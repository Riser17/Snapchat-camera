import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import IconButton from "./IconButton";
import { Link } from "expo-router";
import { ThemedText } from "./ThemedText";
import { CameraMode } from "expo-camera";

interface BottomRowToolsProps {
  setCameraMode: React.Dispatch<React.SetStateAction<CameraMode>>;
  cameraMode: CameraMode;
}

export default function BottomRowTools({
  cameraMode,
  setCameraMode,
}: BottomRowToolsProps) {
  return (
    <View style={[styles.bottomContainer, styles.directionRowItemsCenter]}>
      <Link href={"/media-library"} asChild>
        <IconButton
          androidName="library"
          iosName="photo.stack"
          onPress={() => {}}
        />
      </Link>
      <View style={styles.directionRowItemsCenter}>
        <TouchableOpacity onPress={() => setCameraMode("picture")}>
          <ThemedText
            style={{
              fontWeight: cameraMode === "picture" ? "bold" : "100",
            }}
          >
            Snap
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCameraMode("video")}>
          <ThemedText
            style={{
              fontWeight: cameraMode === "video" ? "bold" : "100",
            }}
          >
            Video
          </ThemedText>
        </TouchableOpacity>
      </View>
      <IconButton androidName="add" iosName="magnifyingglass" />
    </View>
  );
}

const styles = StyleSheet.create({
  directionRowItemsCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "space-between",
    position: "absolute",
    alignSelf: "center",
    bottom: 6,
  },
});
