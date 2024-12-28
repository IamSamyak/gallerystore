import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import PhotoIcon from "@mui/icons-material/Photo";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import "./ShoppingCartPage.css";
import WaterMark from "../Components/WaterMark";
import PaymentsIconsContainer from "./PaymentsIconsContainer";
import EMPTY_SHOPPING_CART from '../Assets/EMPTY_SHOPPING_CART.png';

const ITEMS_PER_PAGE = 4; // Number of items to display per page

const ShoppingCartPage = ({ cartItems, handleDeleteCartItem, isDarkMode }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  // Calculate the total price of the items in the cart
  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => total + item.cost, 0);
  };

  const handleCheckout = () => {
    navigate("/payment");
  };

  const getRandomMedia = (name) => {
    const isVideo = Math.random() < 0.5;
    if (isVideo) {
      return (
        <span className="media-type">
          Video <VideoFileIcon sx={{ color: isDarkMode ? '#fff' : '#475569' }} />
        </span>
      );
    }
    return (
      <span className="media-type">
        Image <PhotoIcon sx={{ color: isDarkMode ? '#fff' : '#475569' }} />
      </span>
    );
  };

  // Pagination logic
  const totalPages = Math.ceil(cartItems.length / ITEMS_PER_PAGE);
  const paginatedItems = cartItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const paginationLimit = 3; // Show 3 page numbers at a time
    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(currentPage + 1, totalPages);

    // Adjust page range to include dots when needed
    if (endPage - startPage < paginationLimit) {
      if (startPage === 1) {
        endPage = Math.min(3, totalPages);
      } else {
        startPage = Math.max(totalPages - 2, 1);
      }
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination-container">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination-button"
        >
          &laquo; Previous
        </button>
        {startPage > 1 && (
          <button
            onClick={() => handlePageChange(1)}
            className="pagination-button"
          >
            1
          </button>
        )}
        {startPage > 2 && <span className="pagination-dots">...</span>}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-button ${currentPage === page ? "active-page-number" : ""
              }`}
          >
            {page}
          </button>
        ))}
        {endPage < totalPages - 1 && <span className="pagination-dots">...</span>}
        {endPage < totalPages && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className="pagination-button"
          >
            {totalPages}
          </button>
        )}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-button"
        >
          Next &raquo;
        </button>
      </div>
    );
  };

  const openModal = (index) => {
    setModalOpen(true);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImageIndex(null);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % cartItems.length // Loop to the first image when we reach the end
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + cartItems.length) % cartItems.length // Loop to the last image when we go backward
    );
  };

  return (
    <div className="shopping-cart-container">
      <div className={`order-card ${isDarkMode ? "dark-mode" : ""}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Shopping Cart</h2>
          <p style={{ fontWeight: "500", fontSize: "1.25rem" }}>
            {cartItems ? cartItems.length : 0} items
          </p>
        </div>
        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
                <img src={EMPTY_SHOPPING_CART} alt="Empty Cart" className="empty-cart-icon" style={{ width: '70%', height: '70%', display: 'block', margin: '0 auto', borderRadius:'20px' }} />
                <h3>Your cart is empty.</h3>
                <p>Browse our amazing photography collections and fill your cart with memories!</p>
                <button onClick={() => navigate("/", { state: { focusOn: 'SearchBar' } })} className="shop-button">
                  Start Shopping
                </button>
            </div>
          ) : (
            <table className={`cart-items-table ${isDarkMode ? 'dark-mode-table' : 'light-mode-table'}`}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Media Type</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td>
                      <img
                        src={item.imageUrl}
                        alt="Product"
                        className="cart-item-image"
                        onClick={() => openModal(index)} // Open modal when image is clicked
                      />
                    </td>
                    <td>{getRandomMedia(item.name)}</td>
                    <td>₹{item.cost}</td>
                    <td>
                      <DeleteIcon
                        onClick={() => handleDeleteCartItem(item.id)}
                        className="delete-icon"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {cartItems.length > 0 && renderPaginationButtons()}
        </div>
      </div>

      {modalOpen && (
        <div className="modal-container">
          <div className="modal-content" style={{ position: 'relative' }}>
            <ArrowBackIosNewIcon
              onClick={goToPreviousImage}
              className="modal-nav-arrow-left"
            />
            <img
              src={cartItems[currentImageIndex].imageUrl}
              alt="Modal"
              className="modal-image"
            />
            <ArrowForwardIosIcon
              onClick={goToNextImage}
              className="modal-nav-arrow-right"
            />
            <DeleteIcon
              onClick={() => handleDeleteCartItem(cartItems[currentImageIndex].id)}
              className="delete-icon-modal"
            />
            <CloseIcon onClick={closeModal} className="close-icon-modal" />
            <WaterMark />
          </div>
        </div>
      )}

      <div className={`order-summary-card ${isDarkMode ? "dark-mode" : ""}`}>
        <h3>Order Summary</h3>
        <p className="total-price">
          <span style={{ fontWeight: "550" }}>Total</span>: ₹{calculateTotal()}
        </p>
        <button onClick={handleCheckout} className="checkout-button">
          Checkout
        </button>

        <div className="payment-methods">
          <p style={{ fontWeight: '600', fontSize: '17px' }}>We accept:</p>
          <PaymentsIconsContainer />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
