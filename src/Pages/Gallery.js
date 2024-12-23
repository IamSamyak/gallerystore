import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import Tooltip from '@mui/material/Tooltip';
import config from '../config/config';
import { useNavigate, useParams } from 'react-router-dom';
import Notification from '../Components/Notification';
import GalleryCard from '../Components/GalleryCard';

function Gallery({ addToCart, isAdminLoggedIn }) {
    const { galleryGroupId } = useParams();
    const navigate = useNavigate();
    const [galleryAssets, setGalleryAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [price, setPrice] = useState(0); // Initial dummy price
    const [isEditing, setIsEditing] = useState(false); // To toggle between editable and non-editable price
    const [newPrice, setNewPrice] = useState(price);

    const handlePriceEdit = () => {
        setIsEditing(true); // Enable editing mode
    };

    const handlePriceChange = (e) => {
        setNewPrice(e.target.value); // Update the new price value
    };

    const savePrice = async () => {
        try {
            // Get the JWT token from sessionStorage
            const token = sessionStorage.getItem('jwtToken'); // Adjusted to sessionStorage

            // Make the API request to update the price on the backend, including the JWT token
            await axios.patch(
                `${config.BASE_URL}/assets/${galleryAssets[modalIndex]?.id}/cost`,
                { cost: newPrice },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Attach JWT token here
                        'Content-Type': 'application/json', // Ensure the request content type is JSON
                    },
                }
            );

            // Update the price in the state and disable editing mode
            setPrice(newPrice);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating price:', error);
        }
    };

    useEffect(() => {
        axios.get(`${config.BASE_URL}/assets/group/${galleryGroupId}`)
            .then((response) => {
                setGalleryAssets(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching galleryAssets: ', err);
                setError('Failed to fetch galleryAssets');
                setLoading(false);
            });
    }, [galleryGroupId]);

    const openModal = (index) => {
        setModalIndex(index);
        setPrice(galleryAssets[index].cost);
        setModal(true);
    };

    const nextImage = () => {
        setModalIndex((prevIndex) => (prevIndex + 1) % galleryAssets.length);
    };

    const prevImage = () => {
        setModalIndex((prevIndex) => (prevIndex - 1 + galleryAssets.length) % galleryAssets.length);
    };

    const deleteAsset = async (assetId) => {
        try {
            // Get the JWT token from sessionStorage
            const token = sessionStorage.getItem('jwtToken'); // Adjusted to sessionStorage

            // Make the API request to delete the asset, including the JWT token in the Authorization header
            await axios.delete(
                `${config.BASE_URL}/assets/${assetId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Attach JWT token here
                    }
                }
            );

            // Update the state after successful deletion
            setGalleryAssets(prevAssets => prevAssets.filter(asset => asset.id !== assetId));
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        } catch (err) {
            console.error('Error deleting asset: ', err);
            setError('Failed to delete asset');
        }
    };

    const updatePreviewImage = async (assetId, groupId) => {
        try {
            // Get the JWT token from sessionStorage
            const jwtToken = sessionStorage.getItem('jwtToken'); // Adjusted to sessionStorage

            // Make the API request to update the preview image, including the JWT token in the Authorization header
            const response = await axios.patch(
                `${config.BASE_URL}/assets/${assetId}/preview?groupId=${groupId}`,
                null, // No body needed as the groupId is sent in the query string
                {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`, // Attach JWT token here
                        'Content-Type': 'application/json', // Content-Type for the request
                    }
                }
            );

            console.log('Preview updated:', response.data);
            // Optionally, update your UI or state with the updated asset information
        } catch (error) {
            console.error('Error updating preview:', error);
            // Handle the error here (e.g., show an error message)
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '20px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '10px' }}>
                    <Tooltip title="Go Back">
                        <ArrowBackIcon
                            style={{
                                cursor: 'pointer',
                                fontSize: '30px',
                                marginRight: '10px'
                            }}
                            onClick={() => navigate('/')}
                        />
                    </Tooltip>
                    <Tooltip title="Select All">
                        <SelectAllIcon
                            style={{
                                cursor: 'pointer',
                                fontSize: '30px',
                                marginRight: '10px'
                            }}
                            onClick={() => {
                                galleryAssets.forEach(item => addToCart(item));
                                setShowNotification(true);
                                setTimeout(() => setShowNotification(false), 3000);
                            }}
                        />
                    </Tooltip>
                </div>
            </div>

            {showNotification && (
                <Notification notificationMsg={"Added to cart successfully!!!"} />
            )}

            <div className={modal ? "modal open" : "modal"}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img src={galleryAssets[modalIndex]?.imageUrl} style={{ width: '100%' }} alt="modal" />
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            pointerEvents: 'none',
                            userSelect: 'none',
                        }}
                    >
                        @Ravi_Gore
                    </div>
                </div>

                {isAdminLoggedIn ? (
                    <div
                        style={{
                            position: 'absolute',
                            top: '15px',
                            right: '170px',
                            transform: 'translateX(-50%)',
                            color: '#fff',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}
                        onClick={handlePriceEdit} // Click to start editing the price
                    >
                        {isEditing ? (
                            <input
                                type="number"
                                value={newPrice}
                                onChange={handlePriceChange}
                                onBlur={savePrice} // Save on blur
                                style={{
                                    fontSize: '24px',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    textAlign: 'center',
                                    width: '80px', // Reduced width
                                    appearance: 'none', // Remove default number input styling
                                    MozAppearance: 'textfield', // Firefox specific
                                    WebkitAppearance: 'none', // Webkit browsers specific
                                    msAppearance: 'none',
                                }}
                            />
                        ) : (
                            `₹${price}` // Display the price if not editing
                        )}
                    </div>
                ) : (
                    <div
                        style={{
                            position: 'absolute',
                            top: '15px',
                            right: '170px',
                            transform: 'translateX(-50%)',
                            color: '#fff',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        ₹5000
                    </div>
                )}

                {/* Conditionally render PreviewIcon only if isAdminLoggedIn */}
                {isAdminLoggedIn && (
                    <Tooltip title="Mark as Banner Image">
                        <PreviewIcon
                            className="cart-icon"
                            onClick={() => {
                                const jwtToken = sessionStorage.getItem('jwt');  // Get JWT from session storage
                                if (jwtToken) {
                                    // Call the function to make the API request
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
                                right: '130px',  // Adjust positioning to fit it next to the price
                            }}
                        />
                    </Tooltip>
                )}

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
                                color: '#fff',
                            }}
                        />
                    </Tooltip>
                )}

                <Tooltip title="Close">
                    <CloseIcon
                        className="close-icon"
                        onClick={() => setModal(false)}
                        style={{ fontSize: '48px', cursor: 'pointer' }}
                    />
                </Tooltip>
            </div>


            {modal && <>
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
            </>}

            <div className="gallery">
                {galleryAssets?.map((item, index) => {
                    return (
                        index == galleryAssets.length - 1 ?
                            <div style={styles.card}>
                                <video
                                    style={styles.video}
                                    src='https://videocdn.cdnpk.net/videos/06caf8ac-1e6a-444e-98b5-0a0cfefe0a73/horizontal/previews/watermarked/large.mp4'
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    controls={false} // Remove controls for a clean look
                                />
                            </div> :
                            <GalleryCard
                                key={index}
                                index={index}
                                imageUrl={item.imageUrl}
                                onClick={openModal}
                            />
                    );
                })}
            </div>
        </>
    );
}

const styles = {
    card: {
        width: "100%",
        height: "100%",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    video: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
};

export default Gallery;
