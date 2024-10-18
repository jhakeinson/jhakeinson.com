"use client";
import _ from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createBlog, getBlogBySlug, updateBlog } from "@/lib/actions";

type BlogEditorDialogProps = {
  postSlug?: string;
};

export function BlogEditorDialog({ postSlug }: BlogEditorDialogProps) {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (postSlug && open) {
        const post = await getBlogBySlug(postSlug);

        if (post) {
          setMarkdown(post.content || "");
          setTitle(post.title);
          setSlug(_.kebabCase(post.title));
        }
      }
    };

    fetchPost();
  }, [open, postSlug]);

  const onTitleChangw = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setTitle(e.target.value);
    setSlug(_.kebabCase(e.target.value));
  };

  const submit = async () => {
    try {
      const formData = {
        title,
        slug,
        content: markdown,
      };

      let res: number | null;
      if (!postSlug) {
        res = await createBlog(formData);
      } else {
        res = await updateBlog(postSlug, formData);
      }

      console.log(res);
    } catch (errori: unknown) {
      console.error("error", errori);
    }

    closeEditor();
  };

  const closeEditor = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          {postSlug ? <Pencil /> : <CirclePlus />}
        </Button>
      </DialogTrigger>
      <DialogContent className=" w-10/12 max-w-[100vw] ">
        <DialogHeader>
          <DialogTitle>Create Blog</DialogTitle>
        </DialogHeader>
        <div className="container flex flex-col gap-2 mx-auto p-2">
          <Input
            value={title}
            onChange={onTitleChangw}
            type="text"
            placeholder="Title"
          />
          <Input value={slug} readOnly type="text" placeholder="Slug" />
          <Card>
            <CardContent className="p-2">
              <Tabs defaultValue="edit">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                  <Textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="Type your markdown here..."
                    className="min-h-56 max-h-56"
                  />
                </TabsContent>
                <TabsContent value="preview">
                  <Card className="overflow-y-auto min-h-56 max-h-56">
                    <CardContent className="prose max-w-none p-4">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {markdown}
                      </ReactMarkdown>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button onClick={submit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
