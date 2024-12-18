import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const FileList: React.FC = () => {
  // In a real application, you would fetch this data from an API
  const files = [
    { id: 1, name: 'document.pdf', size: '2.5 MB', shared: 'No' },
    { id: 2, name: 'image.jpg', size: '1.8 MB', shared: 'Yes' },
    { id: 3, name: 'spreadsheet.xlsx', size: '3.2 MB', shared: 'No' },
  ];

  const handleShare = (fileId: number) => {
    // In a real application, you would implement sharing logic here
    console.log('Sharing file with ID:', fileId);
  };

  const handleDownload = (fileId: number) => {
    // In a real application, you would implement download logic here
    console.log('Downloading file with ID:', fileId);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Shared</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow key={file.id}>
            <TableCell>{file.name}</TableCell>
            <TableCell>{file.size}</TableCell>
            <TableCell>{file.shared}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" onClick={() => handleShare(file.id)}>
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownload(file.id)} className="ml-2">
                Download
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FileList;

