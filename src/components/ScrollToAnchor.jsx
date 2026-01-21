import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToAnchor = () => {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const attemptScroll = (retryCount = 0) => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else if (retryCount < 20) {
                    // Retry every 100ms up to 2 seconds to allow for page transitions/animations
                    setTimeout(() => attemptScroll(retryCount + 1), 100);
                }
            };

            // Start attempting to scroll
            attemptScroll();
        } else {
            // Optional: Scroll to top on normal route change if you want that behavior
            // window.scrollTo(0, 0);
        }
    }, [pathname, hash, key]);

    return null;
};

export default ScrollToAnchor;
