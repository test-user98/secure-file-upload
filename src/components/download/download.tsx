"use client"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";


export default function Download({ slug }: { slug: string }) {
    const handleDownloadMutation = useMutation({
        mutationFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_APPLICATION_URL}/api/files/download?slug=${slug}`, { responseType: 'blob' });
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = url;
            a.click();
            URL.revokeObjectURL(url);
        },
        onError: () => {
            toast.error("something went wrong");
        }
    })
    return (
        <div>
            <Button
                disabled={handleDownloadMutation?.isPending}
                onClick={() => handleDownloadMutation?.mutate()}
            >
                {!handleDownloadMutation?.isPending ? "Download" : <LoaderCircle className="h-4 w-4 animate-spin" />}
            </Button>
        </div>
    );
}