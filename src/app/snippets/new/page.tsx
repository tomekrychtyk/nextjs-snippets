import { redirect } from "next/navigation";
import { db } from "@/db";

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    console.log("SNIPPET", snippet);

    redirect("/");
  }

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            className="border rounder p-2 w-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            id="code"
            name="code"
            className="border rounder p-2 w-full"
          ></textarea>
        </div>
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
