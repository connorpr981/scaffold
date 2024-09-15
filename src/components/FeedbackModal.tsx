import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { handleError } from '@/utils/errorHandler';

interface FeedbackModalProps {
  onClose: () => void;
}

export default function FeedbackModal({ onClose }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });
      if (response.ok) {
        alert('Thank you for your feedback!');
        onClose();
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Provide Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback here..."
            rows={4}
            className="mb-4"
          />
          <div className="flex justify-end space-x-2">
            <Button onClick={onClose} variant="outline">Cancel</Button>
            <Button onClick={handleSubmit} disabled={isSubmitting || !feedback.trim()}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}