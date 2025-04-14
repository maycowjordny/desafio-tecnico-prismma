"use client";

import { Box, Button } from "@mui/material";

type LoginButtonProps = {
  onClick: () => void;
};

export default function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        textTransform: "none",
        fontWeight: 600,
        paddingY: 1.2,
        borderRadius: 2,
        fontSize: "1rem",
        width: "100%",
        maxWidth: 360,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        borderColor: "#e0e0e0",
        color: "#5f6368",
        backgroundColor: "#fff",
        boxShadow: "0 1px 2px 0 rgba(60,64,67,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "#f7f8f8",
          boxShadow:
            "0 1px 3px 0 rgba(60,64,67,0.2), 0 1px 3px 1px rgba(60,64,67,0.15)",
          borderColor: "#dadce0",
        },
        "&:active": {
          backgroundColor: "#f1f3f4",
          boxShadow: "0 1px 2px 0 rgba(60,64,67,0.3)",
          transition: "none",
        },
      }}
    >
      <Box
        component="span"
        sx={{
          width: 20,
          height: 20,
          display: "inline-block",
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <img
          src="/google-icon.svg"
          alt="Google"
          width="100%"
          height="100%"
          style={{ display: "block" }}
        />
      </Box>
      Entrar com Google
    </Button>
  );
}
