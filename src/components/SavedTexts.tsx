import React from 'react'

interface SavedText {
  content: string
  project: string
  created_at: string
}

interface SavedTextsProps {
  texts: SavedText[]
}

const SavedTexts: React.FC<SavedTextsProps> = ({ texts }) => {
  const groupedTexts = texts.reduce((acc, text) => {
    const project = text.project || 'Uncategorized'
    if (!acc[project]) {
      acc[project] = []
    }
    acc[project].push(text)
    return acc
  }, {} as Record<string, SavedText[]>)

  return (
    <div className="w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-2">Your Saved Texts</h2>
      {texts.length === 0 ? (
        <p>No saved texts yet.</p>
      ) : (
        Object.entries(groupedTexts).map(([project, projectTexts]) => (
          <div key={project} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{project}</h3>
            <ul className="space-y-2">
              {projectTexts.map((text, index) => (
                <li key={index} className="bg-white p-3 rounded shadow">
                  <p className="text-sm text-gray-600 mb-1">
                    {new Date(text.created_at).toLocaleString()}
                  </p>
                  <p>{text.content}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  )
}

export default SavedTexts