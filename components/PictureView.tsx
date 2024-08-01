import { View, Text, Alert, StyleSheet, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import { Image } from "expo-image";
import IconButton from "./IconButton";
import EmojiPicker from "./EmojiPicker";
import EmojiList from "./EmojiList";
import EmojiSticker from "./EmojiSticker";
import { saveToLibraryAsync } from "expo-media-library";
import { shareAsync } from "expo-sharing";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

interface PictureViewProps {
  picture: string;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
  colors: string;
}

export default function PictureView({
  picture,
  setPicture,
  colors,
}: PictureViewProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const imageRef = useRef(null);

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          right: 6,
          marginTop: 50,
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
          iosName="arrow.down.to.line"
          androidName="save"
          onPress={async () => {
            const localUri = await captureRef(imageRef, {
              height: 440,
              quality: 1,
            });
            await saveToLibraryAsync(localUri);
            Alert.alert("Picture saved");
          }}
        />
        <IconButton
          onPress={() => setPicture("")}
          iosName={"scribble"}
          androidName="close"
        />
        <IconButton
          onPress={() => setPicture("")}
          iosName={"circle.dashed"}
          androidName="close"
        />
        <IconButton
          onPress={() => setPicture("")}
          iosName={"triangle"}
          androidName="close"
        />
        <IconButton
          onPress={onAddSticker}
          iosName={"smiley"}
          androidName="close"
        />
        <IconButton
          onPress={async () => await shareAsync(picture)}
          iosName={"square.and.arrow.up"}
          androidName="close"
        />
      </View>
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          paddingTop: 50,
          left: 6,
        }}
      >
        <IconButton
          onPress={() => setPicture("")}
          iosName={"xmark"}
          androidName="close"
        />
      </View>
      <View ref={imageRef} collapsable={false}>
        <Image
          ref={imageRef}
          source={{ uri: picture }}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        {pickedEmoji !== null ? (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        ) : null}
      </View>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}
