'use client'

import { intialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import CommonForm from "../common-form";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react";
import { postNewJobAction } from "@/actions";
  

function PostNewJob({profileInfo,user}){
    const [showJobDialog,setShowJobDialog] =useState(false);
    const [jobFormData,setJobFormData]=useState({
        ...intialPostNewJobFormData,
        companyName:profileInfo?.recruiterInfo?.companyName,
        recruiterId:profileInfo?.userId,
    })
    // console.log(user,"user");
    // console.log("Profile Info:", profileInfo);
    // console.log("Recruiter ID:", profileInfo?.userId);
    function handlePostNewBtnValid() {
        return Object.keys(jobFormData).every(
          (control) => jobFormData[control].trim() !== ""
        );
      }
      console.log(jobFormData);
      async function createNewJob(){
        setJobFormData({
            ...jobFormData,
            recruiterId:profileInfo?.userId,
            applicants:[],
        })
        await postNewJobAction(jobFormData,'/jobs')
         setJobFormData({
            ...intialPostNewJobFormData,
        companyName:profileInfo?.recruiterInfo?.companyName,
         })
         setShowJobDialog(false);
      }
      
      
      
 return <div>
    <Button
    onClick={()=>setShowJobDialog(true)}
    className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
    >Post A Job</Button>
    <Dialog open={showJobDialog}
    onOpenChange={()=>{
        setShowJobDialog(false);
        setJobFormData({
           ...intialPostNewJobFormData,
           companyName:profileInfo?.recruiterInfo?.companyName,
        });
    }}
    >
        <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
            <DialogHeader>
                <DialogTitle>Post New Job</DialogTitle>
                <div className="grid gap-4 py-4">
                    <CommonForm
                    buttonText={'Add'}
                    formData={jobFormData}
                    setFormData={setJobFormData}
                    formControls={postNewJobFormControls}
                    // isBtnDisabled={!handlePostNewBtnValid()}
                    action={createNewJob}
                    />
                </div>
            </DialogHeader>
        </DialogContent>
    </Dialog>
 </div>
}
export default PostNewJob;