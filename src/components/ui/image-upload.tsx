'use client';

import * as React from 'react';
import { useDropzone, type Accept } from 'react-dropzone';
import { cn } from '~/lib/utils';
import Icons from '../shared/icons';
import { Button } from '~/components/ui/button';

export interface ImageUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilesAccepted?: (files: File[]) => void;
  accept?: Accept;
  maxSize?: number;
  multiple?: boolean;
}

const ImageUpload = React.forwardRef<HTMLDivElement, ImageUploadProps>(
  (
    {
      className,
      onFilesAccepted,
      accept = {
        'image/jpg': ['.jpg'],
        'image/png': ['.png'],
      },
      maxSize = 5 * 1024 * 1024,
      multiple = false,
      ...props
    },
    ref
  ) => {
    const [previews, setPreviews] = React.useState<string[]>([]);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const handleDrop = React.useCallback(
      (files: File[]) => {
        if (onFilesAccepted) onFilesAccepted(files);
        const urls = files.map((file) => URL.createObjectURL(file));
        setPreviews(urls);
      },
      [onFilesAccepted]
    );

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      onDrop: handleDrop,
      accept,
      maxSize,
      multiple: false,
    });

    React.useEffect(() => {
      return () => {
        previews.forEach((url) => URL.revokeObjectURL(url));
      };
    }, [previews]);

    const handleRemove = () => {
      setPreviews([]);
      if (onFilesAccepted) onFilesAccepted([]);
    };

    const handleReplace = () => {
      open();
    };

    return (
      <div className="flex w-full flex-col items-center" onClick={() => inputRef.current?.click()}>
        {previews.length === 0 ? (
          <div
            {...getRootProps()}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-brown-900 px-4 py-6 transition hover:border-grey-500',
              isDragActive && 'border-brown-900',
              className
            )}
            style={{ minHeight: 260 }}
            {...props}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brown-900">
                <Icons.picturePlusLine className="text-red" />
              </div>
              <div className="text-sm text-brown-700">
                <span className="text-sm font-semibold text-brown-900">Click to upload </span>or drag and drop
              </div>
              <div className="text-xs text-brown-700">PNG, JPG (max. 3MB)</div>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-md border-[3px] border-red-500" style={{ maxWidth: 480 }}>
              <img src={previews[0]} alt="preview" className="h-64 w-full object-cover" />
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                leadingIcon={<Icons.xMarkCircleLine />}
                className="w-full border-warning text-warning"
                typeStyle="round"
                onClick={handleRemove}
              >
                消去
              </Button>
              <Button
                variant="outline"
                size="sm"
                leadingIcon={<Icons.pictureLine />}
                className="w-full border-brown-900 text-brown-900"
                typeStyle="round"
                onClick={handleReplace}
              >
                交換する
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }
);

ImageUpload.displayName = 'ImageUpload';
export { ImageUpload };
