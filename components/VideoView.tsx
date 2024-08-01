import { View, Text, Alert } from "react-native";
import * as React from "react";
import { Image } from "expo-image";
import IconButton from "./IconButton";
import { saveToLibraryAsync } from "expo-media-library";
import { shareAsync } from "expo-sharing";
import { useVideoPlayer, VideoView } from "expo-video";

interface VideoViewComponentProps {
  video: string;
  setVideo: React.Dispatch<React.SetStateAction<string>>;
}

export default function VideoViewComponent({
  video,
  setVideo,
}: VideoViewComponentProps) {
  const videoViewRef = React.useRef<VideoView>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  React.useEffect(() => {
    const subscription = player.addListener("playingChange", (isPlaying) => {
      setIsPlaying(isPlaying);
    });
    return () => subscription.remove();
  }, [player]);
  return (
    <View>
      <View
        style={{
          position: "absolute",
          right: 6,
          paddingTop: 50,
          gap: 16,
          zIndex: 1,
        }}
      >
        <IconButton
          iosName="arrow.down"
          androidName="save"
          onPress={async () => {
            await saveToLibraryAsync(video);
            Alert.alert("Video saved");
          }}
        />
        <IconButton
          onPress={() => setVideo("")}
          iosName={"square.dashed"}
          androidName="close"
        />
        <IconButton
          onPress={() => setVideo("")}
          iosName={"circle.dashed"}
          androidName="close"
        />
        <IconButton
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
            setIsPlaying(!isPlaying);
          }}
          iosName={isPlaying ? "play" : "pause"}
          androidName={isPlaying ? "play" : "pause"}
        />
        <IconButton
          onPress={async () => await shareAsync(video)}
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
          onPress={() => setVideo("")}
          iosName={"xmark"}
          androidName="close"
        />
      </View>
      <VideoView
        ref={videoViewRef}
        style={{ width: "100%", height: "100%" }}
        player={player}
        allowsFullscreen
        nativeControls
      />
    </View>
  );
}
