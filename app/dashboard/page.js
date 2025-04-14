import { auth } from "@/auth";
import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

async function getUser() {
  const session = await auth();

  await connectMongo();
  return await User.findById(session.user.id).populate("boards");
}

export default async function Dashboard() {
  const user = await getUser();

  return (
    <main className="bg-base-200 min-h-screen">
      {/* HEADER */}
      <section className="bg-base-100">
        <div className="px-5 py-3 flex justify-end">
          <ButtonLogout />
        </div>
      </section>

      <section className="px-5 py-12 max-w-5xl mx-auto">
        <FormNewBoard />
      </section>
      <section className="px-5 py-6 max-w-5xl mx-auto">
        <h1 className="font-extrabold text-xl">{user.boards.length} Boards</h1>
        <ul>
          {user.boards.map((board) => (
            <li key={board._id} className="bg-base-100 p-5 rounded-2xl mt-5">
              <span className="text-lg font-bold">{board.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
