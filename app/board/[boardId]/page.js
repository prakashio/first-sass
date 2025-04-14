import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";
import { redirect } from "next/navigation";

const getBoard = async (boardId) => {
  await connectMongo();

  const board = await Board.findById(boardId);

  if (!board) {
    redirect("/");
  }

  return board;
};

export default async function FeedbackBoard({ params }) {
  const { boardId } = params;
  const board = await getBoard(boardId);

  return (
    <div>
      <h1>Feedback Board: {board?.name}</h1>
    </div>
  );
}
