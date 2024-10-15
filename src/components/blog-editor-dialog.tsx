"use client";
import _ from "lodash";
import { ChangeEvent, useState } from "react";
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
import { CirclePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createBlog } from "@/lib/actions";

export function BlogEditorDialog() {
  const [markdown, setMarkdown] = useState(
    "# Welcome to Markdown Editor\n\nStart typing your markdown here!",
  );
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [open, setOpen] = useState(false);

  const onTitleChangw = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setTitle(e.target.value);
    setSlug(_.kebabCase(e.target.value));
  };

  const submit = async () => {
    try {
      const res = await createBlog({
        title,
        slug,
        content: markdown,
      });

      console.log(res);
    } catch (errori: unknown) {
      console.error("error", errori);
    }

    closeEditor();
  };

  const openEditor = () => setOpen(true);
  const closeEditor = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="border-0" variant="link">
          <CirclePlus />
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
