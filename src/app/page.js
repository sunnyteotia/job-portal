import { fetchProfileAction } from "@/actions";
import HomePageButtonControls from "@/components/homepage-button-controls";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment } from "react";

async function Home() {
  const user=await currentUser();
  // console.log(user,'current user');
  const profileInfo=await fetchProfileAction(user?.id);
  if(user && !profileInfo?._id)redirect('/onboard');
  return (
    <Fragment>
      <div className="bg-white">
        <div className="relative w-full">
        <div className="min-h-screen flex">
        <div className="container m-auto p-0">
        <div className="flex items-center flex-wrap gap-12 lg:gap-0">
        <div className="lg:w-5/12 space-y-8 ">
          <span className="flex space-x-2">
            <span className="block w-14 mb-2 border-b-2 border-gray-700">
            </span>
            <span
            className="font-medium text-gray-600"
            >One Stop Solution To Find Jobs</span>
          </span>
          <h1 className="text-4xl font-bold md:text-6xl">
            The Best <br/> Job Portal App
          </h1>
          <p className="text-xl text-gray-700">
            Find Best Jobs From Top Product Based Companies and Build Your Career
          </p>
          <HomePageButtonControls
          user={JSON.parse(JSON.stringify(user))}
          profileInfo={profileInfo}
          />       
        </div>
        <div className="hidden relative md:block lg:w-7/12">
        <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/online-job-search-illustration-download-in-svg-png-gif-file-formats--finding-recruitment-business-activity-pack-professionals-illustrations-4185620.png"
        alt="Job Portal "
        className="relative ml-auto"
        />
        </div>
        </div>
        </div>
        </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Home;
