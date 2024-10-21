import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import { verifyEmail } from '../../shared/api/auth-api';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyEmail(token);
        setMessage(response.message);
        setTimeout(() => navigate('/auth'), 3000);
      } catch (error) {
        setMessage('Error verifying email. Please try again.');
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <Card className="verify-email">
      <h2>Email Verification</h2>
      <p>{message}</p>
    </Card>
  );
};

export default VerifyEmail;