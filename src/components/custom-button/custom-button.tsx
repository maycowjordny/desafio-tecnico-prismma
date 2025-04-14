"use client";
import { Button, ButtonProps } from "@mui/material";
import { ReactNode } from "react";

type FlexibleButtonProps = ButtonProps & {
  title: string;
  onClick: () => void;
  variant?: "contained" | "outlined" | "text";
  icon?: ReactNode;
};

export default function CustomButton({
  title,
  onClick,
  variant = "contained",
  icon,
}: FlexibleButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      startIcon={icon}
      sx={{
        display: "flex",
        height: "44px",
        padding: "0px 32px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: 500,
        boxShadow: "none",
      }}
    >
      {title}
    </Button>
  );
}
