import ButtonLogin from "@/components/ButtonLogin";
import HeroImage from "@/assets/productDemo.jpeg";

import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* HEADER */}
      <section className="bg-base-200">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-8 py-2">
          <div className="font-extrabold">First SASS </div>
          <div className="space-x-4 max-md:hidden">
            <a className="lint link-hover">Pricing</a>
            <a className="lint link-hover">FAQ</a>
          </div>
          <div>
            <ButtonLogin isLoggedIn={true} name="John Doe" />
          </div>
        </div>
      </section>
      {/* HERO */}
      <section className="text-center lg:text-left py-32 px-8 max-w-5xl mx-auto flex flex-col lg:flex-row gap-14">
        <Image
          src={HeroImage}
          alt="Product demo"
          className="w-96 rounded-xl mx-auto"
        />
        <div>
          <h1 className="text-4xl font-extrabold mb-6">
            Collect customer feedback to build better products
          </h1>
          <div>
            <p className="opacity-90 mb-8">
              Create a feedback board in minutes, prioritize features, and build
              products your customer will love.
            </p>
            <ButtonLogin isLoggedIn={true} name="Prakash">
              Dashboard
            </ButtonLogin>
          </div>
        </div>
      </section>
      {/* PRICING */}
      <section className="bg-base-200">
        <div className="py-32 px-8 max-w-5xl mx-auto mb-4">
          <div className="text-sm font-medium text-primary uppercase text-center">
            Pricing
          </div>
          <h2 className="text-3xl lg:text-4xl font-semibold mb-12 text-center ">
            A price that fits your need and budget friendly
          </h2>
          <div className="p-8 bg-base-100 w-96 rounded-2xl mx-auto">
            <div className="flex gap-2 items-baseline">
              <div className="text-4xl font-black"> $19</div>
              <div className="uppercase text-sm font-medium opacity-50">
                /month
              </div>
            </div>
            <ul className="text-left space-y-2 mt-4">
              <li>
                <span className="text-primary">Unlimited</span> feedback boards
              </li>
              <li>
                <span className="text-primary">Unlimited</span> team members
              </li>
              <li>
                <span className="text-primary">Unlimited</span> feedback items
              </li>
              <li>
                <span className="text-primary">Unlimited</span> file uploads
              </li>
            </ul>
            <ButtonLogin
              isLoggedIn={true}
              extraStyle="w-full mt-8"
              name={"Prakash"}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
