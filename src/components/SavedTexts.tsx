import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { handleError } from '@/utils/errorHandler'; // Import the error handler

interface SavedText {
  id: number
  input: string // Update to include input
  output: string // Update to include output
  created_at: string
  updated_at: string
}

interface SavedTextsProps {
  pairs: SavedText[] // Update to handle pairs
  fetchProjectDetails: () => void;
}

const SavedTexts: React.FC<SavedTextsProps> = ({ pairs, fetchProjectDetails }) => {
  const handleEditText = async (textId: number, newInput: string, newOutput: string) => {
    try {
      const response = await fetch(`/api/edit-text`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: textId, input: newInput, output: newOutput }),
      });
      if (response.ok) {
        fetchProjectDetails(); // Refresh the saved texts
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to edit text');
      }
    } catch (error) {
      handleError(error as Error); // Use type assertion to treat error as Error
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Saved Pairs</CardTitle>
      </CardHeader>
      <CardContent>
        {pairs.length === 0 ? (
          <p className="text-muted-foreground">No saved pairs yet.</p>
        ) : (
          <ul className="space-y-2">
            {pairs.map((pair) => (
              <li key={pair.id}>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      Created: {new Date(pair.created_at).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      Updated: {new Date(pair.updated_at).toLocaleString()}
                    </p>
                    <p>Input: {pair.input}</p>
                    <p>Output: {pair.output}</p>
                    <Button onClick={() => {
                      const newInput = prompt("Edit input:", pair.input) || pair.input;
                      const newOutput = prompt("Edit output:", pair.output) || pair.output;
                      handleEditText(pair.id, newInput, newOutput);
                    }} className="mt-2">
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