'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { useDropzone, type Accept, type FileRejection } from 'react-dropzone';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { PictureLineIcon, PicturePlusLineIcon, XMarkCircleLineIcon } from '../shared/icons';
import { Spinner } from './spinner';
import Image from 'next/image';
import { deleteImage, uploadImage } from '~/services/clientService/misc/misc.api';
import { getLastPathSegment } from '~/lib/utils';
import { useNavigationCleanup } from '~/hooks/use-navigation-cleanup';

export interface ImageUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  preview?: string;
  onFilesAccepted?: (files: File[], url?: string) => void;
  accept?: Accept;
  maxSize?: number;
  multiple?: boolean;
  errorMessage?: string;
  isDisabledDelete?: boolean;
  onFormSubmit?: () => void;
}

export interface ImageUploadRef {
  handleFormSubmit: () => Promise<void>;
}

const ImageUpload = React.forwardRef<ImageUploadRef, ImageUploadProps>(
  (
    {
      className,
      preview,
      onFilesAccepted,
      accept = {
        'image/jpg': ['.jpg'],
        'image/png': ['.png'],
      },
      maxSize = 3 * 1024 * 1024,
      multiple = false,
      errorMessage: errorMessageProp,
      isDisabledDelete = false,
      onFormSubmit,
      ...props
    },
    ref
  ) => {
    const [previews, setPreviews] = React.useState<string>(preview || '');
    const [filename, setFilename] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);

    const [originalImage, setOriginalImage] = React.useState<{ url: string; filename: string } | null>(null);
    const [tempImage, setTempImage] = React.useState<{ url: string; filename: string } | null>(null);

    useEffect(() => {
      console.log(previews);
      if (previews) {
        const newFilename = getLastPathSegment(previews);
        setFilename(newFilename);

        if (preview && !originalImage) {
          setOriginalImage({
            url: preview,
            filename: newFilename,
          });
        }
      }
    }, [previews, preview, originalImage]);

    const uploadFile = async (file: File) => {
      const res = await uploadImage(file);
      setFilename(res.pathname);
      return res.url;
    };

    const deleteFile = async (filenameToDelete?: string) => {
      if (!filenameToDelete) return;
      await deleteImage(filenameToDelete);
    };

    const handleDrop = React.useCallback(
      async (files: File[]) => {
        if (files.length === 0) return;
        setLoading(true);
        setErrorMessage(undefined);
        try {
          const file = files[0];
          const url = await uploadFile(file);
          if (url) {
            const newFilename = getLastPathSegment(url);

            setTempImage({
              url: url,
              filename: newFilename,
            });

            setPreviews(url);
            setFilename(newFilename);
            if (onFilesAccepted) onFilesAccepted([file], url);
          }
        } finally {
          setLoading(false);
        }
      },
      [onFilesAccepted]
    );

    const handleDropRejected = React.useCallback((fileRejections: FileRejection[]) => {
      if (fileRejections && fileRejections.length > 0) {
        const reason = fileRejections[0]?.errors?.[0]?.code;
        if (reason === 'file-too-large') {
          setErrorMessage('3MBを超えています。');
        }
        if (reason === 'file-invalid-type') {
          setErrorMessage('ファイルが無効です。');
        }
      }
    }, []);

    const { getRootProps, getInputProps, open } = useDropzone({
      onDrop: handleDrop,
      onDropRejected: handleDropRejected,
      accept,
      maxSize,
      multiple: false,
      noClick: true,
      noKeyboard: true,
    });

    const cleanupTempImage = React.useCallback(async () => {
      if (tempImage) {
        await deleteFile(tempImage.filename);
      }
    }, [tempImage]);

    useNavigationCleanup(cleanupTempImage);

    const handleRemove = async () => {
      if (tempImage) {
        await deleteFile(tempImage.filename);
        setTempImage(null);
      }
    
      if (originalImage) {
        await deleteFile(originalImage.filename);
        setOriginalImage(null);
      }
    
      setPreviews('');
      setFilename(null);
      if (onFilesAccepted) onFilesAccepted([], undefined);
      setErrorMessage(undefined);
    };

    const handleFormSubmit = React.useCallback(async () => {
      if (tempImage && originalImage) {
        await deleteFile(originalImage.filename);
        setOriginalImage(null);
        setTempImage(null);
      }

      if (onFormSubmit) {
        onFormSubmit();
      }
    }, [tempImage, originalImage, onFormSubmit]);

    React.useImperativeHandle(
      ref,
      () => ({
        handleFormSubmit,
      }),
      [handleFormSubmit]
    );

    return (
      <div>
        <div className="relative flex w-full flex-col items-center">
          {loading && (
            <div className="bg-white/70 absolute inset-0 z-10 flex items-center justify-center">
              <Spinner />
            </div>
          )}
          {previews === '' ? (
            <div
              {...getRootProps()}
              className={cn(
                'flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-brown-900 px-4 py-6 transition hover:border-grey-500',
                (errorMessage || errorMessageProp) && 'border-warning',
                className
              )}
              style={{ minHeight: 180 }}
              onClick={open}
              {...props}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brown-900">
                  <PicturePlusLineIcon className="text-red" />
                </div>
                <div className="text-sm text-brown-700 mt-2">
                  画像をアップロード
                </div>
                <div className="text-[9px] text-brown-700">PNG、JPG（最大5MB）</div>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-hidden rounded-md border-[3px] border-red-500" style={{ maxWidth: 480 }}>
                <Image src={previews} alt="preview" width={2000} height={2000} className="h-64 w-full object-cover" />
                <input {...getInputProps()} />
              </div>
              <div className="mt-4 flex justify-center gap-4">
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  leadingIcon={<XMarkCircleLineIcon />}
                  className="w-full border-warning text-warning"
                  typeStyle="round"
                  disabled={loading || isDisabledDelete}
                  onClick={handleRemove}
                >
                  消去
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  leadingIcon={<PictureLineIcon />}
                  className="w-full border-brown-900 text-brown-900"
                  typeStyle="round"
                  disabled={loading}
                  onClick={open}
                >
                  交換する
                </Button>
              </div>
            </>
          )}
        </div>
        {(errorMessage || errorMessageProp) && (
          <span className="text-sm text-warning">{errorMessage || errorMessageProp}</span>
        )}
      </div>
    );
  }
);

ImageUpload.displayName = 'ImageUpload';
export { ImageUpload };
