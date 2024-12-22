import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon
import Tooltip from '@mui/material/Tooltip';
import config from '../config/config';
import { useNavigate, useParams } from 'react-router-dom';

function Gallery({ addToCart, isAdminLoggedIn }) {
    const { galleryGroupId } = useParams();
    const navigate = useNavigate(); 
    const [galleryAssets, setGalleryAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    const [showNotification, setShowNotification] = useState(false);

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
            await axios.delete(`${config.BASE_URL}/assets/${assetId}`);
            setGalleryAssets(prevAssets => prevAssets.filter(asset => asset.id !== assetId));
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        } catch (err) {
            console.error('Error deleting asset: ', err);
            setError('Failed to delete asset');
        }
    };

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
                <div
                    style={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        zIndex: 1000,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    Added to cart successfully!!!
                </div>
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
                        <div className="pics" key={index} onClick={() => openModal(index)}>
                            <div style={{ position: 'relative' }}>
                                <img src={item.imageUrl} style={{ width: '100%' }} alt="gallery" />
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        color: 'rgba(255, 255, 255, 0.5)',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        pointerEvents: 'none',
                                        userSelect: 'none',
                                    }}
                                >
                                    @Ravi_Gore
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Gallery;
