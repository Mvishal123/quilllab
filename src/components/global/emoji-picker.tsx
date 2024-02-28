"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface EmojiPickerProps {
  children: React.ReactNode;
  getValue?: (emoji: string) => void;
}
const EmojiPicker = ({ children, getValue }: EmojiPickerProps) => {
  const Picker = dynamic(() => import("emoji-picker-react"));

  const onClick = (emoji: any) => {
    if (getValue) {
      getValue(emoji.emoji);
    }
  };
  return <div className="flex items-center">
    <Popover>
        <PopoverTrigger className="cursor-pointer">
            {children}
        </PopoverTrigger>
        <PopoverContent>
            <Picker onEmojiClick={onClick}/>
        </PopoverContent>
    </Popover>
  </div>;
};

export default EmojiPicker;
