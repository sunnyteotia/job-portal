'use client'

import { Fragment } from "react";
import JobApplicants from "../job-applicants";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { getCandidateDetailsByIDAction, updateJobApplicationAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";
const supabaseClient=createClient('https://aijelkzfhcwcjkenmlfq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpamVsa3pmaGN3Y2prZW5tbGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MzkzNTcsImV4cCI6MjA0ODIxNTM1N30.JUy9ha5mifh04c4rFRJ2sh4UJreIr9i5sYf-hblNhNU')
function CandidateList({jobApplications,
    setCurrentCandidateDetails,
    currentCandidateDetails,
    showCurrentCandidateDetailsModel,
    setShowCurrentCandidateDetailsModel}){

        async function handleFetchCandidateDetails(getCurrentCandidateId){
            const data=await getCandidateDetailsByIDAction(getCurrentCandidateId);
            // console.log(data);
            if(data){
                setCurrentCandidateDetails(data);
                setShowCurrentCandidateDetailsModel(true);
            }
        }
        console.log(currentCandidateDetails);
        function handlePreviewResume() {
            const { data } = supabaseClient.storage
              .from("job-board-public")
              .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);
        //  console.log(data,"data");
         
            const a = document.createElement("a");
            a.href = data?.publicUrl;
            a.setAttribute("download", "Resume.pdf");
            a.setAttribute("target", "_blank");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        async function handleUpdateJobStatus(getCurrentStatus){
            let cpyJobApplicants=[...jobApplications];
            const indexOfCurrentJobApplicant=cpyJobApplicants.
            findIndex(item=>item.candidateUserID===currentCandidateDetails?.userId);
            console.log(indexOfCurrentJobApplicant);
            const jobApplicantsToUpdate={
                ...cpyJobApplicants[indexOfCurrentJobApplicant],
                status:cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(getCurrentStatus),
            }
            console.log(jobApplicantsToUpdate,'jobApplicantsToUpdate');
            await updateJobApplicationAction(jobApplicantsToUpdate,'/jobs');

        }
        console.log(jobApplications);
        
    return <Fragment>
        <div className="grif grid-cols-1 gap-3 
        p-10 md:grid-cols-2 lg:grid-cols-3">
            {
                jobApplications && jobApplications.length>0 ?
                jobApplications.map(JobApplicantItem=><div
                className="bg-white shadow-lg w-full 
                max-w-sm rounded-lg overflow-hidden mx-auto mt-4"
                >
                <div className="px-4 my-6 flex justify-between items-center">
                    <h3 className="text-lg font-bold">
                        {JobApplicantItem?.name}
                    </h3>
                    <Button 
                    onClick={()=>handleFetchCandidateDetails(JobApplicantItem?.candidateUserID)} 
                    className="flex h-11 items-center
                justify-center px-5">
                    View Profile
                    </Button>
                </div>
                </div>)
                :null
            }
        </div>
        <Dialog open={showCurrentCandidateDetailsModel}
        onOpenChange={()=>{
            setShowCurrentCandidateDetailsModel(false);
            setCurrentCandidateDetails(null);
        }}
        >
            <DialogContent>
                <div>
                    <h1 className="text-2xl font-bold text-black">
                        {currentCandidateDetails?.candidateInfo?.name}
                        ,{" "}{currentCandidateDetails?.email}
                    </h1>
                    <p className="text-xl font-medium text-black">
                        {currentCandidateDetails?.candidateInfo?.currentCompany}
                    </p>
                    <p className="text-sm font-normal text-black">
                        {currentCandidateDetails?.candidateInfo?.currentJobLocation}
                    </p>
                    <p >
                       Total Experience: {currentCandidateDetails?.candidateInfo?.totalExperience}
                       {" "}Years
                    </p>
                    <p >
                        Salary: {currentCandidateDetails?.candidateInfo?.currentSalary}
                        {" "} LPA
                    </p>
                    <p>
                        Notice Period:{" "}
                         {currentCandidateDetails?.candidateInfo?.noticePeriod}
                         {" "}
                         Days
                    </p>
                    <div className="flex items-center flex-wrap gap-4 mt-6 ">
        {/* {
            currentCandidateDetails?.candidateInfo?.previousCompanies.split(',').map((skillItem)=>(
                <div className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px] ">
                    <h2 className="text-[13px] font-medium text-white">
                        {skillItem}
                    </h2>
                </div>
            ))
        } */}
        </div>
                    <div className="flex flex-wrap gap-4 mt-6 ">
        {
            currentCandidateDetails?.candidateInfo?.skills.split(',').map((skillItem)=>(
                <div className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px] ">
                    <h2 className="text-[13px] font-medium text-white">
                        {skillItem}
                    </h2>
                </div>
            ))
        }
        </div>
                </div>
                <div className="flex gap-3">
                      <Button
                      onClick={handlePreviewResume}
                       className="flex h-11 items-center
                justify-center px-5" >
                        Resume
                      </Button>
                      <Button 
                      className="disabled:opacity-65 flex h-11 items-center
                justify-center px-5"
                onClick={()=>handleUpdateJobStatus('selected')}
                disabled={
                    jobApplications.
                    find(item=>item.candidateUserID===currentCandidateDetails?.userId)
                    ?.status.includes('selected')||jobApplications.
                    find(item=>item.candidateUserID===currentCandidateDetails?.userId)
                    ?.status.includes('rejected')?true:false
                }
                >
                    {
                        jobApplications.find(item=>item.candidateUserID===currentCandidateDetails?.userId)?.status.includes('selected')?
                        'Selected':'Select'
                    }
                      </Button>
                      <Button
                       className="disabled:opacity-65 flex h-11 items-center
                justify-center px-5"
                onClick={()=>handleUpdateJobStatus('rejected')}
                disabled={jobApplications.
                    find(item=>item.candidateUserID===currentCandidateDetails?.userId)
                    ?.status.includes('selected')||jobApplications.
                    find(item=>item.candidateUserID===currentCandidateDetails?.userId)
                    ?.status.includes('rejected')?true:false}
                >
                       {
                        jobApplications.find(item=>item.candidateUserID===currentCandidateDetails?.userId)?.status.includes('rejected')?
                        'Rejected':'Reject'
                    }
                      </Button>
                </div>
            </DialogContent>
        </Dialog>
    </Fragment>
}
export default CandidateList;