'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { LinkDialog } from './linkdialog/linkdialog'
import { QueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { LoaderCircle } from 'lucide-react'
import { userSession } from '@/types/types'
import { useDispatch } from 'react-redux'
import { login } from '@/store/slice/user.slice'
const queryClient = new QueryClient();
export default function FileUpload({ session }: { session: userSession }) {
  const [file, setFile] = useState<File | null>(null)
  const [dialogStatus, setDialogStatus] = useState(false);
  const [URL, setURL] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login({
      name: "",
      email: session?.email,
      id: session?._id,
      role: session?.role
    }))
  }, [session])
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file)
        return;
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.post("/api/files/upload", formData);
      setURL(data?.data?.url)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["files"],
        exact:true,
        type:"all"
      })
      setFile(null);
      setDialogStatus(true);
      toast.success("file uploaded")
    },
    onError: () => {
      console.log("something went wrong");

    }

  })
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
          </div>
          <Input type='file'
            id='file-upload'
            className='hidden' onChange={handleFileChange} />
        </label>
      </div>
      <Button onClick={() => uploadMutation?.mutate()}
        className='ml-auto block'
        disabled={!file || uploadMutation?.isPending}>
        {!uploadMutation?.isPending ? "Upload" : <LoaderCircle className='h-4 w-4 animate-spin' />}
      </Button>
      <LinkDialog url={URL} status={dialogStatus} onStatusChange={setDialogStatus} />
    </div>
  )
}

