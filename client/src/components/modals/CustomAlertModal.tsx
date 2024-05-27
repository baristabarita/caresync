import React from 'react';
import { FiX } from 'react-icons/fi';

// Define an interface for the component's props
interface CustomAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    buttonOneText: string;
    buttonOneOnClick: () => void;
    buttonTwoText: string;
    buttonTwoOnClick: () => void;
}

const CustomAlertModal: React.FC<CustomAlertModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    buttonOneText,
    buttonOneOnClick,
    buttonTwoText,
    buttonTwoOnClick
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
                <div className="flex justify-end p-2">
                    <button 
                        id="close"
                        onClick={onClose}>
                        <FiX className="text-black hover:text-red-600" />
                    </button>
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-lg text-alert font-roboto mb-2 text-left">{title}</h3>
                    <p className="font-light font-roboto text-left">{description}</p>
                </div>
                <div className="flex justify-evenly pb-4">
                    <button
                        id="button-1"
                        onClick={buttonOneOnClick}
                        className="font-roboto button text-primarydark p-[0.7em] w-[45%] rounded-full border-solid border-2 border-primarydark font-bold hover:bg-primarydark hover:text-white transition-colors delay-250 duration-[3000] ease-in"
                    >
                        {buttonOneText}
                    </button>
                    <button
                        id="button-2"
                        onClick={buttonTwoOnClick}
                        className="button bg-alert text-white p-[0.5em] w-[45%] rounded-full hover:bg-red-500 font-bold transition-colors delay-250 duration-[3000] ease-in"
                    >
                        {buttonTwoText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomAlertModal;
