import {CaptureStatusContext} from '../context/CaptureStatusContext';
import {useContext} from 'react';

export const useCapture = () => {
    const context = useContext(CaptureStatusContext);

    if (!context) {
        throw new Error("useCaptureStatusContext must be used within a CaptureStatusContextProvider");
    }

    return context;
}
