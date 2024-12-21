'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { File } from '@/types/types'
import Link from 'next/link'
import { Trash } from 'lucide-react'

const queryClient = new QueryClient();

export default function FileList() {
  const filesQuery = useQuery({
    queryKey: ['files'],
    queryFn: async () => {
      const { data } = await axios.get("/api/files");
      return data?.data;
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      queryClient?.setQueryData(['files'], filesQuery?.data?.filter((file: File) => file?.id !== id));
      await axios.delete(`/api/files?id=${id}`);
    },
    onSuccess: () => {
      filesQuery?.refetch();
    }
  })

  useEffect(() => {
    filesQuery.refetch();
  }, []);

  return (
    <div>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Link</TableHead>
        <TableHead>Action</TableHead>
        <TableHead>Delete</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {filesQuery?.data?.map((file: File) => (
        <TableRow key={file?.slug}>
          <TableCell>{file?.name}</TableCell>
          <TableCell>
          <a href={`${process.env.NEXT_PUBLIC_APPLICATION_URL}/download/${file?.slug}`} className="text-blue-500 hover:text-blue-700 hover:underline cursor-pointer">
            {`${process.env.NEXT_PUBLIC_APPLICATION_URL}/download/${file?.slug}`}
          </a>
        </TableCell>

          <TableCell>
            <Link href={`/download/${file?.slug}`} passHref>
              <Button>
                Download
              </Button>
            </Link>
          </TableCell>
          <TableCell>
            <Trash
              onClick={() => deleteMutation?.mutate(file?.id)}
              className="cursor-pointer"
              color="red"
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
  )
}

