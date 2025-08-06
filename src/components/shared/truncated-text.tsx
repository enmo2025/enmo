import React, { useState, useRef, useLayoutEffect, useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface TruncatedTextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  maxLines?: number;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ children, style, className, maxLines = 1, ...props }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const checkTruncation = () => {
      if (!textRef.current) return;

      const element = textRef.current;
      const isTruncatedNow =
        maxLines === 1 ? element.scrollWidth > element.clientWidth : element.scrollHeight > element.clientHeight;

      setIsTruncated(isTruncatedNow);
    };

    checkTruncation();

    if (window.ResizeObserver) {
      const observer = new ResizeObserver(() => requestAnimationFrame(checkTruncation));
      observer.observe(element);
      return () => observer.disconnect();
    }

    const handleResize = () => requestAnimationFrame(checkTruncation);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [children, maxLines]);

  const truncationStyle = useMemo((): React.CSSProperties => {
    const baseStyle = { overflow: 'hidden', ...style };

    return maxLines === 1
      ? { ...baseStyle, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
      : {
          ...baseStyle,
          display: '-webkit-box',
          WebkitLineClamp: maxLines,
          WebkitBoxOrient: 'vertical',
          wordBreak: 'break-word',
          lineHeight: '1.5',
        };
  }, [maxLines, style]);

  const content = (
    <div ref={textRef} style={truncationStyle} className={className} {...props}>
      {children}
    </div>
  );

  if (!isTruncated) return content;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent>
          <div className="max-w-xs whitespace-pre-wrap break-words">{children}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TruncatedText;
