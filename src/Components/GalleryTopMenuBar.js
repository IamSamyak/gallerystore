import React from 'react';
import { Tooltip } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from 'react-router-dom';

const GalleryTopMenuBar = ({
    isSelected,
    setIsSelected,
    galleryAssets,
    addToCart,
    setShowNotification,
}) => {
    const navigate = useNavigate();

    const handleSelectAll = () => {
        setIsSelected(!isSelected);
        if (!isSelected) {
            galleryAssets.forEach(item => addToCart(item));
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        }
    };

    return (
        <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f5f5f5',
            width: '98.5%',
            margin: '20px auto',
            border: '1px solid #ccc',
            // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '15px 10px',
            marginBottom: '20px',
        }}
    >

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '10px' }}>
            <Tooltip title="Go Back">
                <ArrowBackIosNewIcon
                    style={{
                        cursor: 'pointer',
                        fontSize: '30px',
                        marginRight: '10px',
                    }}
                    onClick={() => navigate('/')}
                />
            </Tooltip>
        </div>

        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', fontWeight: 'bold', fontSize:'22px' }}>
            <span style={{ marginRight: '10px' }}>Rajshree Burnure</span> &
            <span style={{ marginLeft: '10px' }}>Omprakash Burnure</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginRight: '10px' }}>
            <Tooltip title="Select All">
                <DoneAllIcon
                    style={{
                        cursor: 'pointer',
                        fontSize: '30px',
                        color: isSelected ? 'green' : 'inherit', // Change color on click
                    }}
                    onClick={handleSelectAll}
                />
            </Tooltip>
        </div>
    </div>
    );
};

export default GalleryTopMenuBar;
