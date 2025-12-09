import { useState, useEffect, type ImgHTMLAttributes } from 'react';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
}

function LazyImage({ src, alt, className, ...props }: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const element = document.querySelector(`[data-lazy-src="${src}"]`);
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, [src]);

    return (
        <div
            className={`lazy-image-wrapper ${isLoaded ? 'loaded' : 'loading'}`}
            data-lazy-src={src}
        >
            {!isLoaded && (
                <div className="image-skeleton">
                    <div className="skeleton-shimmer"></div>
                </div>
            )}
            {isInView && (
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    onLoad={() => setIsLoaded(true)}
                    style={{ opacity: isLoaded ? 1 : 0 }}
                    {...props}
                />
            )}
        </div>
    );
}

export default LazyImage;
