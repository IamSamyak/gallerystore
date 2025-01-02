import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';
import config from '../config/config';
import { useParams } from 'react-router-dom';
import Notification from '../Components/Notification';
import GalleryCard from '../Components/GalleryCard';
import GalleryTopMenuBar from '../Components/GalleryTopMenuBar';
import GalleryModalMenuOptions from '../Components/GalleryModalMenuOptions';
import WaterMark from '../Components/WaterMark';

function Gallery({ cartItems, addToCart, isAdminLoggedIn, isDarkMode, removeFromCart }) {
    const { galleryGroupId } = useParams();
    const [galleryAssets, setGalleryAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMsgAndBGC, setNotificationMsgAndBGC] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [newPrice, setNewPrice] = useState(0);
    const [isSelected, setIsSelected] = useState(false);

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
                `${config.BASE_URL}/assets/${selectedAsset?.id}/cost`,
                { cost: newPrice },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Attach JWT token here
                        'Content-Type': 'application/json', // Ensure the request content type is JSON
                    },
                }
            );

            // Update the price in the selected asset and disable editing mode
            setGalleryAssets(prevAssets =>
                prevAssets.map(asset =>
                    asset.id === selectedAsset.id ? { ...asset, cost: newPrice } : asset
                )
            );

            setSelectedAsset(prevAsset => ({ ...prevAsset, cost: newPrice }));
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

    const openModal = (asset) => {
        setSelectedAsset(asset);    
        setModal(true);
    };

    const nextImage = () => {
        const currentIndex = galleryAssets.findIndex(asset => asset.id === selectedAsset.id);
        const nextIndex = (currentIndex + 1) % galleryAssets.length;
        setSelectedAsset(galleryAssets[nextIndex]);
    };

    const prevImage = () => {
        const currentIndex = galleryAssets.findIndex(asset => asset.id === selectedAsset.id);
        const prevIndex = (currentIndex - 1 + galleryAssets.length) % galleryAssets.length;
        setSelectedAsset(galleryAssets[prevIndex]);
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
            <GalleryTopMenuBar
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                galleryAssets={galleryAssets}
                addToCart={addToCart}
                setShowNotification={setShowNotification}
                isDarkMode={isDarkMode}
                setNotificationMsgAndBGC={setNotificationMsgAndBGC}
            />

            {showNotification && (
                <Notification notificationMsg={notificationMsgAndBGC.msg} notificationMsgBackgroundColor={notificationMsgAndBGC.BGC} />
            )}

            <div className={modal ? "modal open" : "modal"}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img src={selectedAsset?.imageUrl} style={{ width: '100%' }} alt="modal" />
                    <WaterMark height='80px' fontSize='22px'/>
                </div>

                <GalleryModalMenuOptions
                    isAdminLoggedIn={isAdminLoggedIn}
                    price={selectedAsset?.cost}
                    newPrice={newPrice}
                    selectedAsset={selectedAsset}
                    removeFromCart={removeFromCart}
                    setNewPrice={setNewPrice}
                    galleryAssets={galleryAssets}
                    cartItems={cartItems}
                    addToCart={addToCart}
                    deleteAsset={deleteAsset}
                    updatePreviewImage={updatePreviewImage}
                    setShowNotification={setShowNotification}
                    handlePriceChange={handlePriceChange}
                    setModal={setModal}
                    handlePriceEdit={handlePriceEdit}
                    isEditing={isEditing}
                    savePrice={savePrice}
                    prevImage={prevImage}
                    nextImage={nextImage}
                    setNotificationMsgAndBGC={setNotificationMsgAndBGC}
                />
            </div>

            <div className="gallery">
                {galleryAssets?.map((item, index) => {
                    return (
                        <GalleryCard
                            key={index}
                            index={index}
                            imageUrl={item.imageUrl}
                            onClick={() => openModal(item)}
                        />
                    );
                })}
                {/* <VideoCard src="https://videocdn.cdnpk.net/videos/06caf8ac-1e6a-444e-98b5-0a0cfefe0a73/horizontal/previews/watermarked/large.mp4" /> */}
            </div>
        </>
    );
}

export default Gallery;
