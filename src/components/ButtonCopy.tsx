import React, { useState } from "react";
import { Button, Text, Toast, IButtonProps } from "native-base";
import * as Clipboard from "expo-clipboard";

export const ButtonCopy = ({ ...rest }: IButtonProps) => {
  const emojis = ["😀", "🤰", "😍", "🌈", "🎉", "🌞"];
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const randomEmoji = emojis[randomIndex];

  const [id, setId] = useState("151408");

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(id);
    Toast.show({
      title: `Copiado ${randomEmoji}`,
      duration: 3000, // 3 seconds
      placement: "top",
      backgroundColor: "secondary.700",
    });
  };

  return (
    <Button
      bg="primary.700"
      width={"full"}
      height={12}
      _pressed={{ bgColor: "primary.500" }}
      onPress={copyToClipboard}
      {...rest}
    >
      <Text color="secondary.100" fontFamily={"body"} fontSize={16}>
        ID:{id}
      </Text>
    </Button>
  );
};
