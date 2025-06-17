"use client";

import { useCallback, useEffect, useState } from "react";
import { Textarea, TextInput, Button, Label } from "flowbite-react";

interface CommentType {
  _id: string;
  name?: string;
  email?: string;
  comment: string;
  createdAt: string;
}

const CommentsSection = ({ slug }: { slug: string }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);

  const fetchComments = useCallback(async () => {
    setLoadingComments(true);
    const res = await fetch(`/api/comments/${slug}`);
    const data = await res.json();
    setComments(data);
    setLoadingComments(false);
  }, [slug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blogSlug: slug,
        name: `${formData.fname} ${formData.lname}`,
        email: formData.email,
        comment: formData.comment,
      }),
    });

    if (res.ok) {
      setFormData({ fname: "", lname: "", email: "", comment: "" });
      await fetchComments();
    }

    setLoading(false);
  };

  return (
    <div className="mt-8 text-2xl font-bold">
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex flex-col">
            <Label htmlFor="fname">First Name:</Label>
            <TextInput
              type="text"
              id="fname"
              placeholder="First Name"
              className="font-normal placeholder:font-normal"
              value={formData.fname}
              onChange={(e) =>
                setFormData({ ...formData, fname: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="lname">Last Name:</Label>
            <TextInput
              type="text"
              id="lname"
              placeholder="Last Name"
              className="font-normal placeholder:font-normal"
              value={formData.lname}
              onChange={(e) =>
                setFormData({ ...formData, lname: e.target.value })
              }
              required
            />
          </div>
          <div className="col-span-2 flex flex-col">
            <Label htmlFor="email">Email:</Label>
            <TextInput
              type="email"
              id="email"
              placeholder="Email Address"
              className="font-normal placeholder:font-normal"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="col-span-2 flex flex-col">
            <Label htmlFor="comment">Add Comment:</Label>
            <Textarea
              id="comment"
              rows={10}
              value={formData.comment}
              className="font-normal placeholder:font-normal"
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div>
          <Button
            type="submit"
            size="sm"
            isProcessing={loading}
            className="mt-5 rounded-lg bg-blue-950 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-500 dark:bg-red-500 dark:hover:bg-blue-950"
          >
            Add Comment
          </Button>
        </div>
      </form>

      <div className="mt-10 space-y-6">
  {loadingComments ? (
    <div className="flex justify-center items-center space-x-2 py-6">
    <span className="dot bg-gray-500 animate-bounce delay-0"></span>
    <span className="dot bg-gray-500 animate-bounce delay-150"></span>
    <span className="dot bg-gray-500 animate-bounce delay-300"></span>
  </div>
  ) : comments.length === 0 ? (
    <p className="text-base text-gray-500">Be the first one to comment.</p>
  ) : (
    comments.map((c) => (
      <div
        key={c._id}
        className="border-b pb-6 px-4 bg-white hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out"
      >
        <div className="flex items-center space-x-3">
          <p className="text-lg font-medium text-gray-800">
            {c.name || "Anonymous"}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(c.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <p className="mt-2 text-base text-gray-700 font-normal">{c.comment}</p>
      </div>
    ))
  )}
</div>
    </div>
  );
};

export default CommentsSection;
