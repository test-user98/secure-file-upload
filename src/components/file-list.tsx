'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { File } from '@/types/types'
import Link from 'next/link'
import { Trash } from 'lucide-react'

const queryClient = new QueryClient();

export default function FileList() {

  const filesQuey = useQuery({
    queryKey: ['files'],
    queryFn: async () => {
      const { data } = await axios.get("/api/files");
      return data?.data;
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      queryClient?.setQueryData(['files'], filesQuey?.data?.filter((file: File) => file?.id));
      await axios.delete(`/api/files?id=${id}`);
    },
    onSuccess:()=>{
      filesQuey?.refetch();
    }
  })



  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filesQuey?.data?.map((file: File) => (
            <TableRow key={file?.slug}>
              <TableCell>{file?.name}</TableCell>
              <TableCell>{`${process.env.NEXT_PUBLIC_APPLICATION_URL}/download/${file?.slug}`}</TableCell>
              <TableCell>
                <Link href={`/download/${file?.slug}`} >
                  <Button variant="outline" size="sm" className="ml-2">
                    Download
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                <Trash
                  onClick={() => deleteMutation?.mutate(file?.id)}
                  className='cursor-pointer'
                  color='red' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

