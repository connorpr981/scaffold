import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { handleError } from '@/utils/errorHandler'; // Import the error handler

interface SavedText {
  id: number
  content: string
  created_at: string
}

interface SavedTextsProps {
  texts: SavedText[]
  fetchProjectDetails: () => void; // Add this line
}

const SavedTexts: React.FC<SavedTextsProps> = ({ texts, fetchProjectDetails }) => {
  const handleEditText = async (textId: number, newContent: string) => {
    try {
      const response = await fetch(`/api/edit-text`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: textId, content: newContent }),
      });
      if (response.ok) {
        fetchProjectDetails(); // Refresh the saved texts
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to edit text');
      }
    } catch (error) {
      handleError(error); // Use the centralized error handler
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Saved Texts</CardTitle>
      </CardHeader>
      <CardContent>
        {texts.length === 0 ? (
          <p className="text-muted-foreground">No saved texts yet.</p>
        ) : (
          <ul className="space-y-2">
            {texts.map((text) => (
              <li key={text.id}>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      {new Date(text.created_at).toLocaleString()}
                    </p>
                    <p>{text.content}</p>
                    <Button onClick={() => handleEditText(text.id, prompt("Edit text:", text.content) || text.content)} className="mt-2">
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

export default SavedTexts