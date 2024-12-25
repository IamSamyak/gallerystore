import React from 'react';
import { Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const GalleryModalMenuOptions = ({
    isAdminLoggedIn,
    price,
    newPrice,
    galleryAssets,
    modalIndex,
    addToCart,
    deleteAsset,
    updatePreviewImage,
    setShowNotification,
    handlePriceChange,
    setModal,
    handlePriceEdit,
    isEditing,
    savePrice,
    nextImage,
    prevImage
}) => {

    return (
        <div style={{color: '#fff' }}>
            {isAdminLoggedIn ? (
                <div
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '170px',
                        transform: 'translateX(-50%)',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}
                    onClick={handlePriceEdit}
                >
                    {isEditing ? (
                        <input
                            type="number"
                            value={newPrice}
                            onChange={handlePriceChange}
                            onBlur={savePrice}
                            style={{
                                fontSize: '24px',
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                textAlign: 'center',
                                width: '80px',
                                appearance: 'none',
                                MozAppearance: 'textfield',
                                WebkitAppearance: 'none',
                            }}
                        />
                    ) : (
                        `₹${price}`
                    )}
                </div>
            ) : (
                <div
                    style={{
                        position: 'absolute',
                        top: '18px',
                        right: '110px',
                        transform: 'translateX(-50%)',
                        fontSize: '24px',
                        fontWeight: 'bold',
                    }}
                >
                    ₹{price}
                </div>
            )}

            {/* Banner Image Marking */}
            {isAdminLoggedIn && (
                <Tooltip title="Mark as Banner Image">
                    <PreviewIcon
                        className="cart-icon"
                        onClick={() => {
                            const jwtToken = sessionStorage.getItem('jwt');
                            if (jwtToken) {
                                updatePreviewImage(
                                    galleryAssets[modalIndex]?.id,
                                    galleryAssets[modalIndex]?.groupId,
                                    jwtToken
                                );
                            }
                        }}
                        style={{
                            fontSize: '48px',
                            cursor: 'pointer',
                            color: '#fff',
                            top: '10px',
                            right: '130px',
                            position: 'absolute',
                        }}
                    />
                </Tooltip>
            )}

            {/* Admin Delete or User Add to Cart */}
            {isAdminLoggedIn ? (
                <Tooltip title="Delete Asset">
                    <DeleteIcon
                        className="cart-icon"
                        onClick={() => deleteAsset(galleryAssets[modalIndex]?.id)}
                        style={{
                            fontSize: '48px',
                            cursor: 'pointer',
                            color: '#fff',
                        }}
                    />
                </Tooltip>
            ) : (
                <Tooltip title="Add to Cart">
                    <ShoppingCartIcon
                        className="cart-icon"
                        onClick={() => {
                            addToCart(galleryAssets[modalIndex]);
                            setShowNotification(true);
                            setTimeout(() => setShowNotification(false), 3000);
                        }}
                        style={{
                            fontSize: '48px',
                            cursor: 'pointer',
                            color: `#fff`,
                        }}
                    />
                </Tooltip>
            )}

            {/* Modal Close Button */}
            <Tooltip title="Close">
                <CloseIcon
                    className="close-icon"
                    onClick={() => setModal(false)}
                    style={{ fontSize: '48px', cursor: 'pointer' }}
                />
            </Tooltip>
            <Tooltip title="Previous Image">
                    <ArrowBackIosNewIcon
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '0',
                            transform: 'translateY(-50%)',
                            fontSize: '48px',
                            height: '5rem',
                            width: '2rem',
                            cursor: 'pointer',
                            color: '#fff',
                            borderRadius: '5px 0 0 5px',
                            backgroundColor: 'rgba(255, 255 , 255, 0.4)',
                            zIndex: 1000
                        }}
                        onClick={prevImage}
                    />
                </Tooltip>

                <Tooltip title="Next Image">
                    <ArrowForwardIosIcon
                        style={{
                            position: 'fixed',
                            top: '50%',
                            right: '0',
                            transform: 'translateY(-50%)',
                            fontSize: '48px',
                            height: '5rem',
                            width: '2rem',
                            cursor: 'pointer',
                            color: '#fff',
                            borderRadius: '0 5px 5px 0',
                            backgroundColor: 'rgba(255, 255 , 255, 0.4)',
                            zIndex: 1000
                        }}
                        onClick={nextImage}
                    />
                </Tooltip>
        </div>
    );
};

export default GalleryModalMenuOptions;
