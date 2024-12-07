import { createFilterCategoryAction, 
    fetchJobApplicationsForCandidate, 
    fetchJobApplicationsForRecruiter, 
    fetchJobsForCandidateAction, 
    fetchJobsForRecruiterAction, 
    fetchProfileAction } from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


async function JobsPage({searchParams}){
    console.log(searchParams,'searchParams');
    console.log("Clerk Publishable Key:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

    const user=await currentUser();
    const profileInfo=await fetchProfileAction(user?.id);
    //  console.log(profileInfo);
    if(!user)redirect('/sign-in')
    if(user && !profileInfo?._id)redirect('/onboard');

     const jobList=profileInfo?.role==='candidate' ? 
     await fetchJobsForCandidateAction(searchParams): 
     await fetchJobsForRecruiterAction(user?.id);
    //  console.log(jobList,'job');
    //  

     const jobApplicationList=profileInfo?.role==='candidate' ? 
     await fetchJobApplicationsForCandidate(user?.id): 
     await fetchJobApplicationsForRecruiter(user?.id);

     const fetchFilterCategories=await createFilterCategoryAction();
    return (
     <JobListing
     user={JSON.parse(JSON.stringify(user))}
     profileInfo={profileInfo}
     jobList={jobList}
     jobApplications={jobApplicationList}
     filterCategories={fetchFilterCategories}
     />
    );
}
export default JobsPage;