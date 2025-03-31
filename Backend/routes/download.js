const express = require('express');
const router = express.Router();

router.get('/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    
    // Google Drive direct download URL
    const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Redirect to the download URL
    res.redirect(fileUrl);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Download failed' });
  }
});

module.exports = router; 