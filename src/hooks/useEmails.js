import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useEmails(box="INBOX") {
  const { isAuthenticated } = useAuth();
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmails = async () => {
    if (!isAuthenticated) {
      setEmails([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/email/boxes/${box}`, {
        credentials: 'include' // Important for sending cookies
      });

      if (!response.ok) {
        throw new Error('Failed to fetch emails');
      }

      const data = await response.json();
      if (data.success) {
        setEmails(data.emails);
      } else {
        throw new Error(data.error || 'Failed to fetch emails');
      }
    } catch (err) {
      setError(err.message);
      setEmails([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []); // Re-fetch when authentication status changes

  return {
    emails,
    loading,
    error,
    fetchEmails
  };
}
