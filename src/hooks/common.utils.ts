export const getTokenFromCookies = () => {
    const name = 'authToken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null; // Return null if token is not found
};

export const decodeToken = (token: string) => {
    if (!token) return null;

    // JWT consists of three parts: header, payload, signature
    const payload = token.split('.')[1];

    if (!payload) return null;

    // Decode payload from base64 to a JSON string
    try {
        const decodedPayload = atob(payload);
        return JSON.parse(decodedPayload);
    } catch (e) {
        console.error('Invalid token');
        return null;
    }
};

// Scroll left function
export const scrollLeft = (scrollRef: any) => {
    scrollRef.current.scrollBy({
        left: -300, // Adjust scroll amount as needed
        behavior: 'smooth'
    });
};

// Scroll right function
export const scrollRight = (scrollRef: any) => {
    scrollRef.current.scrollBy({
        left: 300, // Adjust scroll amount as needed
        behavior: 'smooth'
    });
};

// generate video thunmbnail
export function generateVideoThumbnail(videoUrl: string, timeInSeconds = 5) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const context: any = canvas.getContext('2d');

        video.src = videoUrl;
        video.crossOrigin = 'anonymous'; // Handle cross-origin videos

        video.addEventListener('loadeddata', () => {
            video.currentTime = timeInSeconds;
        });

        video.addEventListener('seeked', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageUrl = canvas.toDataURL('image/jpeg', 0.8); // Return thumbnail as base64 URL
            resolve(imageUrl);
        });

        video.addEventListener('error', () => {
            reject(new Error('Failed to load video.'));
        });
    });
}

export const validatePasswords = (currentPassword: string, newPassword: string, confirmPassword: string) => {
    const errors: any = {};

    // Validate Current Password
    if (!currentPassword) {
        errors.currentPassword = "Current Password is required.";
    } else {
        errors.currentPassword = ""; // No error
    }

    // Validate New Password
    if (newPassword === currentPassword) {
        errors.newPassword = "New Password must be different from Current Password.";
    } else if (!newPassword) {
        errors.newPassword = "New Password is required.";
    } else {
        errors.newPassword = ""; // No error
    }

    // Validate Confirm Password
    if (confirmPassword === currentPassword) {
        errors.confirmPassword = "Confirm Password must be different from Current Password.";
    } else if (newPassword !== confirmPassword) {
        errors.confirmPassword = "New Password and Confirm Password must match.";
    } else if (!confirmPassword) {
        errors.confirmPassword = "Confirm Password is required.";
    } else {
        errors.confirmPassword = ""; // No error
    }

    return errors;
};


export const getCategoryPathName = (categoryPath: string): string => {
    let basePath = null;
    const cat = categoryPath?.toLowerCase().trim().replace(/\s+/g, '-'); // Normalize categoryPath
    console.log(cat, 'normalized categoryPath');
    
    switch (cat) {
        case "games":
        case "game":
            basePath = "games";
            break;
        case "movies":
        case "movie":
            basePath = "movies";
            break;
        case "courses":
        case "course":
            basePath = "courses";
            break;
        case "apps":
        case "app":
        case "appps":
            basePath = "apps";
            break;
        case "ai":
        case "ai-products":
            basePath = "ai";
            break;
        case "services":
        case "service":
            basePath = "services";
            break;
        default:
            basePath = "apps";
    }
    return basePath; // Ensure the function returns the value.
};

