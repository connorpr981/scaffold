import React from 'react'

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
    <div className="w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-2">Your Saved Texts</h2>
      {texts.length === 0 ? (
        <p>No saved texts yet.</p>
      ) : (
        <ul className="space-y-2">
          {texts.map((text, index) => (
            <li key={index} className="bg-white p-3 rounded shadow">
              <p className="text-sm text-gray-600 mb-1">
                {new Date(text.created_at).toLocaleString()}
              </p>
              <p>{text.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SavedTexts