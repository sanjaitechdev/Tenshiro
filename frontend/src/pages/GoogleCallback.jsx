import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { loginWithToken } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userStr = params.get('user');
        const error = params.get('error');

        if (error) {
            console.error('OAuth Error:', error);
            navigate('/login?error=' + error);
            return;
        }

        if (token && userStr) {
            try {
                const user = JSON.parse(decodeURIComponent(userStr));
                loginWithToken(token, user);
                navigate('/domains');
            } catch (err) {
                console.error('Failed to parse user data:', err);
                navigate('/login?error=invalid_data');
            }
        } else {
            navigate('/login?error=missing_data');
        }
    }, [location, navigate, loginWithToken]);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary)'
        }}>
            <div style={{
                textAlign: 'center',
                padding: '2rem'
            }}>
                <div style={{
                    fontSize: '2rem',
                    marginBottom: '1rem'
                }}>🔄</div>
                <h2>Signing you in...</h2>
                <p style={{ color: 'var(--text-muted)' }}>Please wait while we complete your authentication</p>
            </div>
        </div>
    );
};

export default GoogleCallback;
