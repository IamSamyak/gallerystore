import React from 'react';

const VideoCard = ({ src, styleOverrides = {} }) => {
    const styles = {
        card: {
            width: '100%',
            height: '100%',
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            ...styleOverrides.card,
        },
        video: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            ...styleOverrides.video,
        },
    };

    return (
        <div style={styles.card}>
            <video
                style={styles.video}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                controls={false} // Remove controls for a clean look
            />
        </div>
    );
};

export default VideoCard;
