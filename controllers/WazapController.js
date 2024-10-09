const { Client, MessageMedia } = require('whatsapp-web.js');
const QRCode = require('qrcode');

class WazapController {
    constructor() {
        this.client = new Client();

        // Handle QR code generation
        this.client.on('qr', (qr) => {
            QRCode.toDataURL(qr, (err, url) => {
                if (err) {
                    console.error('Error generating QR code:', err);
                } else {
                    console.log('QR Code generated:', url);
                }
            });
        });

        // Handle successful authentication
        this.client.on('ready', () => {
            console.log('WhatsApp client is ready!');
        });

        // Start the client
        this.client.initialize();
    }

    // Send a text message to a single number
    async sendText(req, res) {
        const { instance_id, access_token, to, message } = req.body;

        if (!instance_id || !access_token || !to || !message) {
            return res.status(400).json({ message: 'Instance ID, Access Token, recipient, and message are required.' });
        }

        const formattedTo = `${to}@c.us`;

        try {
            // Optionally validate instance_id and access_token here if needed

            const response = await this.client.sendMessage(formattedTo, message);
            return res.status(200).json({ message: 'Message sent successfully!', response });
        } catch (error) {
            console.error('Error sending message:', error);
            return res.status(500).json({ message: 'Error sending message.', error });
        }
    }

    // Send a text message to multiple numbers
    async sendBulkText(req, res) {
        const { instance_id, access_token, numbers, message } = req.body;

        if (!instance_id || !access_token || !Array.isArray(numbers) || !message) {
            return res.status(400).json({ message: 'Instance ID, Access Token, numbers (array), and message are required.' });
        }

        try {
            const results = [];
            for (const number of numbers) {
                const formattedNumber = `${number}@c.us`;

                try {
                    const response = await this.client.sendMessage(formattedNumber, message);
                    results.push({ number, status: 'sent', response });
                } catch (error) {
                    results.push({ number, status: 'failed', error: error.message });
                }
            }
            return res.status(200).json({ message: 'Messages sent.', results });
        } catch (error) {
            console.error('Error sending bulk messages:', error);
            return res.status(500).json({ message: 'Error sending bulk messages.', error });
        }
    }

    // Send a media file
    async sendMedia(req, res) {
        const { instance_id, access_token, to, mediaUrl, caption } = req.body;

        if (!instance_id || !access_token || !to || !mediaUrl) {
            return res.status(400).json({ message: 'Instance ID, Access Token, recipient, and media URL are required.' });
        }

        const formattedTo = `${to}@c.us`;

        try {
            const media = await MessageMedia.fromUrl(mediaUrl);
            const response = await this.client.sendMessage(formattedTo, media, { caption });
            return res.status(200).json({ message: 'Media sent successfully!', response });
        } catch (error) {
            console.error('Error sending media:', error);
            return res.status(500).json({ message: 'Error sending media.', error });
        }
    }
}

module.exports = new WazapController();
