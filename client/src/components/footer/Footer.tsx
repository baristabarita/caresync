import React from 'react';
import logo from '@/assets/icons/logo-title.png';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='flex flex-row justify-between items-center text-sm drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] p-5 bg-primarydark'>
            <img src={logo} alt="Site Logo" className="h-8" />
            <p className="text-center text-gray-500">
                Copyright © {currentYear} All Rights reserved | Name
            </p>
        </footer>
    );
}

export default Footer;
