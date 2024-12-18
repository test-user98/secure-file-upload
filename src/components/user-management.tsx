'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import { File, userSession } from '@/types/types'
import Link from 'next/link'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { login } from '@/store/slice/user.slice'
import { Trash } from 'lucide-react'
const queryClient = new QueryClient();

export default function UserManagement({ session }: { session: userSession }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login({
      name: "",
      email: session?.email,
      id: session?._id,
      role: session?.role
    }))
  }, [session])

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get("/api/user");
      return data?.data;
    }
  })

  const filesQuery = useQuery({
    queryKey: ['files'],
    queryFn: async () => {
      const { data } = await axios.get("/api/files");
      return data?.data;
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      queryClient?.setQueryData(['files'], filesQuery?.data?.filter((file: File) => file?.id));
      await axios.delete(`/api/files?id=${id}`);
    },
    onSuccess:()=>{
      filesQuery?.refetch();
    }
  })
  return (
    <div>
      <h1 className='text-2xl font-semibold' >Files</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Owner Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Download</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filesQuery?.data?.map((file: File) => (
            <TableRow key={file?.slug}>
              <TableCell>{file?.name}</TableCell>
              <TableCell>{file?.type}</TableCell>
              <TableCell>
                {file?.ownerEmail || "N/A"}
              </TableCell>
              <TableCell>
                {file?.createdAt}
              </TableCell>
              <TableCell>
                <Link
                  href={`/download/${file?.slug}`}
                >Download</Link>
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
      <h1 className='text-2xl font-semibold' >Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersQuery?.data?.map((user: any, i: number) => (
            <TableRow key={i}>
              <TableCell>{user?.id}</TableCell>
              <TableCell>{user?.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

