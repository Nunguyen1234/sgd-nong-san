"use client";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import toast from "react-hot-toast";

type ImageUploadModalProps = {
  open: boolean;
  onClose: () => void;
  onImageSelect: (file: File[]) => void;
  currentImages: File[];
};

export default function ImageUploadModal({
  open,
  onClose,
  onImageSelect,
  currentImages,
}: ImageUploadModalProps) {
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));

      const urls = currentImages.map((file) => URL.createObjectURL(file));

      setPreviewFiles(currentImages);
      setPreviewUrls(urls);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, currentImages]);

  const { getRootProps, getInputProps } = useDropzone({
    noClick: false,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      const newFilesCombined = [...previewFiles, ...acceptedFiles];

      if (newFilesCombined.length > 10) {
        const limitedFiles = newFilesCombined.slice(-10);

        previewUrls.forEach((url) => URL.revokeObjectURL(url));

        const limitedUrls = limitedFiles.map((file) =>
          URL.createObjectURL(file)
        );

        setPreviewFiles(limitedFiles);
        setPreviewUrls(limitedUrls);
        onImageSelect(limitedFiles);

        toast.error("Chỉ được chọn tối đa 10 ảnh!");
      } else {
        const newUrls = newFilesCombined.map((file) =>
          URL.createObjectURL(file)
        );

        setPreviewFiles(newFilesCombined);
        setPreviewUrls(newUrls);
        onImageSelect(newFilesCombined);
      }
    },
  });

  const handleRemoveAll = () => {
    previewUrls.forEach(URL.revokeObjectURL);
    setPreviewFiles([]);
    setPreviewUrls([]);
    onImageSelect([]);
  };

  const handleRemoveOne = (index: number) => {
    const newFiles = previewFiles.filter((_, i) => i !== index);
    const urlToRemove = previewUrls[index];

    if (urlToRemove) {
      URL.revokeObjectURL(urlToRemove);
    }

    const newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewFiles(newFiles);
    setPreviewUrls(newUrls);
    onImageSelect(newFiles);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle>Tải ảnh lên</DialogTitle>

        <DialogContent>
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed #ccc",
              borderRadius: 2,
              padding: 3,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <Typography>Thả ảnh vào đây hoặc click để chọn</Typography>
          </Box>

          {previewUrls.length > 0 && (
            <Box mt={2}>
              <Box display="flex" flexWrap="wrap" gap={2}>
                {previewUrls.map((url, idx) => (
                  <Box
                    key={url}
                    sx={{
                      position: "relative",
                      width: 100,
                      height: 100,
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={url}
                      alt={`Preview ${idx}`}
                      width={100}
                      height={100}
                      style={{ objectFit: "cover", borderRadius: 8 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveOne(idx)}
                      sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.7)",
                        },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              <Button
                onClick={handleRemoveAll}
                color="error"
                size="small"
                sx={{ mt: 2 }}
              >
                Xóa tất cả ảnh
              </Button>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>OK</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
