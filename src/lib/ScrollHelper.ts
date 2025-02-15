export const enableHorizontalScroll = (element: HTMLElement | null): (() => void) => {
    if (!element) return () => {};
  
    const handleScroll = (event: WheelEvent) => {
      const canScrollHorizontally = element.scrollWidth > element.clientWidth;
      
      if (canScrollHorizontally) {
        // Handle horizontal scroll if possible
        if (event.deltaY !== 0) {
          event.preventDefault();
          element.scrollLeft += event.deltaY;
        }
      } else {
        // Handle vertical scroll on the page if horizontal scrolling is not possible
        if (event.deltaY !== 0) {
          event.preventDefault();
          window.scrollBy(0, event.deltaY);
        }
      }
    };
  
    element.addEventListener('wheel', handleScroll);
  
    // Return a cleanup function to remove the event listener
    return () => {
      element.removeEventListener('wheel', handleScroll);
    };
  };
  