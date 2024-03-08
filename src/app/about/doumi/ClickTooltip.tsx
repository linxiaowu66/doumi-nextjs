"use client";
import * as React from "react";
import { Fab, Tooltip, ClickAwayListener } from "@mui/material";

interface ClickTooltipProps {
  title: string;
  children: React.ReactElement;
  extraAction?: (extra: string) => void;
}

export default function ClickTooltip(props: ClickTooltipProps) {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
    copyTextToClipboard(props.title);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
    if (props.extraAction) {
      props.extraAction(props.title);
    }
  };
  const copyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");

    textArea.style.position = "fixed";
    textArea.style.top = "0px";
    textArea.style.left = "0px";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0px";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";

    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
    } catch (err) {
      // setIsOpenSnackbar(true);
      // setSnackbarMsg("浏览器不支持复制！！");
    }

    document.body.removeChild(textArea);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={props.title}
        >
          <Fab onClick={handleTooltipOpen} color="secondary">
            {props.children}
          </Fab>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
}
