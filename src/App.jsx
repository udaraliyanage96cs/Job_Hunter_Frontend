// src/components/CoverLetterGenerator.js

import React, { useState } from 'react';

const CoverLetterGenerator = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [ocrData, setOcrData] = useState('');
    const [aiData, setAiData] = useState('');
    const [emailHtml, setEmailHtml] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://127.0.0.1:3000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl }),
            });
            const data = await response.json();
            if (response.ok) {
                setOcrData(data.ocrData);
                setAiData(data.aiData);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleSend = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://127.0.0.1:3000/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ to: recipientEmail, html: aiData, key: apiKey }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Email sent successfully!');
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="container">
            <h1 className="my-4">Cover Letter Generator</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="formImageUrl">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formImageUrl"
                        placeholder="Enter image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleGenerate}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Generate'
                    )}
                </button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
            <div className="my-4">
                <div className="col">
                    <h2>OCR Data</h2>
                    <textarea className="form-control" rows="10" value={ocrData} readOnly></textarea>
                </div>
                <div className="col">
                    <h2>AI Data</h2>
                    <textarea className="form-control" rows="10" value={aiData} readOnly></textarea>
                </div>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="formRecipientEmail">Recipient Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="formRecipientEmail"
                        placeholder="Enter recipient email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formApiKey">API Key</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formApiKey"
                        placeholder="Enter API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSend}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Send'
                    )}
                </button>
            </form>
        </div>
    );
};

export default CoverLetterGenerator;
