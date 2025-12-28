// This file contains functions for saving files on a native device using Capacitor plugins.
// These functions will only work when the app is running in a native (iOS/Android) environment.

// We declare the Capacitor plugins here to satisfy TypeScript in a web environment.
// In a real Capacitor project, you would import these from '@capacitor/core' and '@capacitor/filesystem'.
declare const Capacitor: any;
declare const Filesystem: any;
declare const Directory: any;
declare const Encoding: any;

// Helper to check if running in a native Capacitor container
const isNative = () => typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform();

// Helper to extract base64 data from a data URL
const getBase64FromDataUrl = (dataUrl: string): string => {
    const parts = dataUrl.split(',');
    if (parts.length > 1) {
        return parts[1];
    }
    return ''; // Should not happen with valid data URLs
}

/**
 * Saves a base64 encoded image to the device's photo gallery.
 * @param dataUrl The data URL of the image from canvas.toDataURL().
 * @param fileName The desired file name for the image.
 * @returns A promise that resolves with the saved file path.
 */
export const saveImageToGallery = async (dataUrl: string, fileName: string): Promise<string> => {
    if (!isNative()) {
        throw new Error('This function is only available on native devices.');
    }
    try {
        const base64Data = getBase64FromDataUrl(dataUrl);
        if (!base64Data) throw new Error("Invalid data URL provided.");

        // writeFile will automatically request permissions if necessary on Android
        const result = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Photos,
        });
        
        return result.uri;
    } catch (e) {
        console.error('Unable to save image to gallery', e);
        throw e;
    }
};

/**
 * Saves a base64 encoded PDF to the device's Downloads directory.
 * @param dataUrl The data URL of the PDF from jspdf.output('datauristring').
 * @param fileName The desired file name for the PDF.
 * @returns A promise that resolves with the saved file path.
 */
export const savePdfToDownloads = async (dataUrl: string, fileName:string): Promise<string> => {
    if (!isNative()) {
        throw new Error('This function is only available on native devices.');
    }
    try {
        const base64Data = getBase64FromDataUrl(dataUrl);
        if (!base64Data) throw new Error("Invalid data URL provided.");

        // writeFile will automatically request permissions if necessary on Android
        const result = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Downloads,
        });

        return result.uri;
    } catch (e) {
        console.error('Unable to save PDF to Downloads', e);
        throw e;
    }
};

/**
 * A simple utility to check if the app is running in a native environment.
 */
export const isNativePlatform = isNative;
