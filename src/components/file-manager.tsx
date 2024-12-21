'use client'

import { useState } from 'react'
import FileUpload from './file-upload'
import FileList from './file-list'
import { userSession } from '@/types/types'

export default function FileManager({ session }: { session: userSession }) {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleUploadSuccess = () => {
    setRefreshKey(prevKey => prevKey + 1)
  }

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-2">Upload File</h2>
        <FileUpload session={session} onUploadSuccess={handleUploadSuccess} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Files</h2>
        <FileList key={refreshKey} />
      </div>
    </>
  )
}

