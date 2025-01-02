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
    setNotificationMsgAndBGC,
    isDarkMode
}) => {
    const navigate = useNavigate();

    // Extract customer names from galleryAssets[0]
    const customerNames =
        galleryAssets?.[0]?.customerName?.split(',').slice(0, 2) || ['Dummy1', 'Dummy2'];

    const handleSelectAll = () => {
        setIsSelected(!isSelected);
        if (!isSelected) {
            galleryAssets.forEach(item => addToCart(item));
            setNotificationMsgAndBGC({msg:'All assets are added to cart successfully!!!',BGC:'#28a745'});
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
                backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5',
                width: '98.5%',
                margin: '20px auto',
                border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px 10px',
                marginBottom: '20px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginLeft: '10px',
                }}
            >
                <Tooltip title="Go Back">
                    <ArrowBackIosNewIcon
                        style={{
                            cursor: 'pointer',
                            fontSize: '30px',
                            marginRight: '10px',
                            color: isDarkMode ? '#fff' : '#000'
                        }}
                        onClick={() => navigate('/')}
                    />
                </Tooltip>
            </div>

            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '22px',
                }}
            >
                <span style={{ marginRight: '10px', color: isDarkMode ? '#fff' : '#000' }}>{customerNames[0]}</span> <span style={{color: isDarkMode ? '#fff' : '#000' }}> & </span> 
                <span style={{ marginLeft: '10px', color: isDarkMode ? '#fff' : '#000' }}>{customerNames[1]}</span>
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginRight: '10px',
                }}
            >
                <Tooltip title="Select All">
                    <DoneAllIcon
                        style={{
                            cursor: 'pointer',
                            fontSize: '30px',
                            color: isSelected ? 'green' : (isDarkMode ? '#fff' : '#000')
                        }}
                        onClick={handleSelectAll}
                    />
                </Tooltip>
            </div>
        </div>
    );
};

export default GalleryTopMenuBar;
