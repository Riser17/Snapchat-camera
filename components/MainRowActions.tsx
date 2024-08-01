import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CameraMode } from "expo-camera";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/constants/Colors";
import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { Image } from "expo-image";

interface MainRowActionsProps {
  handleTakePicture: () => void;
  cameraMode: CameraMode;
  isRecording: boolean;
  filterColor: string;
  setFilterColor: (color: string) => void;
}

export default function MainRowActions({
  cameraMode,
  isRecording,
  handleTakePicture,
  filterColor,
  setFilterColor,
}: MainRowActionsProps) {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    const fetchedAlbums = await getAlbumsAsync();
    const albumAssets = await getAssetsAsync({
      mediaType: "photo",
      sortBy: "creationTime",
      first: 4,
    });
    setAssets(albumAssets.assets);
  }

  const filterColors = ["red", "blue", "green", "yellow"];

  function handleFilterColorPress(color: string) {
    if (filterColor === color) {
      setFilterColor("transparent");
    } else {
      setFilterColor(color);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        inverted
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            key={item.id}
            source={item.uri}
            style={{
              width: 40,
              height: 40,
              borderRadius: 5,
            }}
          />
        )}
        horizontal
        contentContainerStyle={{ gap: 6 }}
      />
      <TouchableOpacity onPress={handleTakePicture}>
        <SymbolView
          name={
            cameraMode === "picture"
              ? "circle"
              : isRecording
              ? "record.circle"
              : "circle.circle"
          }
          size={90}
          type="hierarchical"
          tintColor={isRecording ? Colors.light.snapPrimary : "white"}
          animationSpec={{
            effect: {
              type: isRecording ? "pulse" : "bounce",
            },
            repeating: isRecording,
          }}
        />
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 2 }}
        showsHorizontalScrollIndicator={false}
      >
        {filterColors.map((color, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleFilterColorPress(color)}
          >
            <SymbolView
              name="face.dashed"
              size={40}
              type="hierarchical"
              tintColor={color}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 45,
    height: 100,
  },
});
