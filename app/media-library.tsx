import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Asset, getAssetsAsync } from "expo-media-library";
import { Image } from "expo-image";

export default function MediaLibraryScreen() {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    const albumAssets = await getAssetsAsync({
      //   album: fetchedAlbums[0],
      mediaType: "photo",
      sortBy: "creationTime",
    });
    setAssets(albumAssets.assets);
  }
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {assets.map((photo) => (
          <Image
            key={photo.id}
            source={photo.uri}
            style={{ width: "25%", height: 100 }}
          />
        ))}
      </ScrollView>
    </>
  );
}
