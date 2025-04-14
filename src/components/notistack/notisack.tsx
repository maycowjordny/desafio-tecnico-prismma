"use client";
import { Slide } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import {
  SnackbarProvider as NotistackProvider,
  closeSnackbar,
} from "notistack";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export default function SnackbarProvider({ children }: Props) {
  const notistackRef = useRef<any>(null);

  return (
    <NotistackProvider
      ref={notistackRef}
      maxSnack={5}
      preventDuplicate
      autoHideDuration={3500}
      TransitionComponent={Slide}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      iconVariant={{
        info: (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              borderRadius: "4px",
              paddingRight: "8px",
            }}
          >
            <Info size={20} />
          </span>
        ),
        success: (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              borderRadius: "4px",
              paddingRight: "8px",
            }}
          >
            <CheckCircle size={20} />
          </span>
        ),
        warning: (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              borderRadius: "4px",
              paddingRight: "8px",
            }}
          >
            <AlertTriangle size={20} />
          </span>
        ),
        error: (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              borderRadius: "4px",
              paddingRight: "8px",
            }}
          >
            <AlertCircle size={20} />
          </span>
        ),
      }}
      action={(snackbarId) => (
        <IconButton
          size="medium"
          onClick={() => closeSnackbar(snackbarId)}
          sx={{ p: 0.5 }}
        >
          <X size={20} color="white" />
        </IconButton>
      )}
    >
      {children}
    </NotistackProvider>
  );
}
