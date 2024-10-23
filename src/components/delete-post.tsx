"use client";

import { deleteBlog } from "@/lib/actions";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

type DeletePostProps = {
  postSlug: string;
};

function DeletePost({ postSlug }: DeletePostProps) {
  const handleDelete = async (slug: string) => {
    try {
      const res = await deleteBlog(slug);

      // TODO: Add toast for successful deletion
      console.log(res);
    } catch (error: unknown) {
      // TODO: Add toast for error
      console.error(error);
    }
  };

  return (
    <Button onClick={() => handleDelete(postSlug)} variant="ghost" size="sm">
      <Trash2 />
    </Button>
  );
}

export default DeletePost;
