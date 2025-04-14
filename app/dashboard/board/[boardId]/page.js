import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import CardBoardLink from "@/components/CardBoardLink";
import ButtonDelete from "@/components/ButtonDelete";

const getBoard = async (boardId) => {
  const session = await auth();
  await connectMongo();

  const board = await Board.findOne({
    _id: boardId,
    userId: session?.user?.id,
  });

  if (!board) {
    redirect("/dashboard");
  }

  return board;
};

export default async function FeedbackBoard({ params }) {
  const { boardId } = params;
  const board = await getBoard(boardId);

  return (
    <div className="bg-base-200 min-h-screen">
      {/* HEADER */}
      <section className="bg-base-100">
        <div className="max-w-5xl mx-auto px-3 py-3 flex">
          <Link href="/dashboard" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z"
                clipRule="evenodd"
              />
            </svg>
            BACK
          </Link>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-5 py-12 max-w-5xl space-y-6">
        <h1 className="font-extrabold text-xl">{board?.name}</h1>

        <CardBoardLink boardId={boardId} />

        <ButtonDelete boardId={boardId} />
      </section>
    </div>
  );
}
