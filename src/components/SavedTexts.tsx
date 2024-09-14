import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface SavedText {
  id: number
  content: string
  created_at: string
}

interface SavedTextsProps {
  texts: SavedText[]
}

const SavedTexts: React.FC<SavedTextsProps> = ({ texts }) => {
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
            {texts.map((text, index) => (
              <li key={index}>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      {new Date(text.created_at).toLocaleString()}
                    </p>
                    <p>{text.content}</p>
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