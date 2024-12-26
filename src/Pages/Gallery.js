import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';
// import ArrowBackIcon from '../Assets/backwardicon.png'
import config from '../config/config';
import { useNavigate, useParams } from 'react-router-dom';
import Notification from '../Components/Notification';
import GalleryCard from '../Components/GalleryCard';
import GalleryTopMenuBar from '../Components/GalleryTopMenuBar';
import GalleryModalMenuOptions from '../Components/GalleryModalMenuOptions';
import VideoCard from '../Components/VideoCard';
import CompanyLogo from '../Assets/image-gallery.png';

function Gallery({ addToCart, isAdminLoggedIn }) {
    const { galleryGroupId } = useParams();
    const [galleryAssets, setGalleryAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [price, setPrice] = useState(0); // Initial dummy price
    const [isEditing, setIsEditing] = useState(false); // To toggle between editable and non-editable price
    const [newPrice, setNewPrice] = useState(price);
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
            <GalleryTopMenuBar
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                galleryAssets={galleryAssets}
                addToCart={addToCart}
                setShowNotification={setShowNotification}
            />

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
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            pointerEvents: 'none',
                            userSelect: 'none',
                        }}
                    >
                        <div className="profile-name" style={{ fontSize: '22px', width: '100%' }}>
                            SHREE DIGITAL
                            <img
                                src={CompanyLogo}
                                height={40}
                                width={40}
                                style={{ backgroundColor: 'transparent', filter: 'invert(100%)', height: '10%', width: '10%' }}
                                alt="Shree Digital Photo Logo"
                                className="logo-image"
                            />
                            PHOTO</div>
                    </div>
                </div>

                <GalleryModalMenuOptions
                    isAdminLoggedIn={isAdminLoggedIn}
                    price={price}
                    newPrice={newPrice}
                    setNewPrice={setNewPrice}
                    galleryAssets={galleryAssets}
                    modalIndex={modalIndex}
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
                />
            </div>

            <div className="gallery">
                {galleryAssets?.map((item, index) => {
                    return (
                        <GalleryCard
                            key={index}
                            index={index}
                            imageUrl={item.imageUrl}
                            onClick={openModal}
                        />
                    );
                })}
                {/* <VideoCard src="https://videocdn.cdnpk.net/videos/06caf8ac-1e6a-444e-98b5-0a0cfefe0a73/horizontal/previews/watermarked/large.mp4" /> */}
            </div>
        </>
    );
}

export default Gallery;
