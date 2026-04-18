import React, { useEffect } from 'react';
import './Loader.css';

const Loader = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 2000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="school-loader-container">
            <div className="school-loader">
                <i className="bi bi-mortarboard-fill loader-icon"></i>
                <h2>Gitara University</h2>
                <div className="loader-bar">
                    <div className="loader-progress"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
