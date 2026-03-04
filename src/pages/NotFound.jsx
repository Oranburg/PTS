import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>404</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>Page not found.</p>
      <Link to="/" className="btn">Back to Home</Link>
    </div>
  );
}
