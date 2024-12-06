"use server";

import connectToDB from "@/database"
import Application from "@/models/application.js";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

// const stripe=require("stripe");

//create profile action
export async function createProfileAction(formData, pathToRevalidate) {
    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);
  }
export async function fetchProfileAction(id) {
    await connectToDB();
    const result = await Profile.findOne({ userId: id });
    return JSON.parse(JSON.stringify(result));
  }
  //create job action
  export async function postNewJobAction(formData, pathToRevalidate) {
    await connectToDB();
    await Job.create(formData);
    revalidatePath(pathToRevalidate);
  }
  //fetch job action
  //for recruiter
  export async function fetchJobsForRecruiterAction(id){
    await connectToDB();
    const result=await Job.find({recruiterId:id});
    return JSON.parse(JSON.stringify(result));
  }
  //for candidate
  export async function fetchJobsForCandidateAction(filterParams={}){
    await connectToDB();
    let updatedParams={};
    Object.keys(filterParams).forEach(filterKey=>{
      updatedParams[filterKey]={$in:filterParams[filterKey].split(',')}
    })
    
    
    const result=await Job.find(filterParams && Object.keys(filterParams).length>0?updatedParams:{});
    return JSON.parse(JSON.stringify(result));
  }

  //create job application action
 export async function createJobApplicationAction(data, pathToRevalidate){
   await connectToDB();
   await Application.create(data);
   revalidatePath(pathToRevalidate);
 }


  //fetch job application-candidate action
 export async function fetchJobApplicationsForCandidate(candidateID){
   await connectToDB();
   const result=await Application.find({candidateUserID:candidateID});
   return JSON.parse(JSON.stringify(result));
 }

 //fetch job application-recruiter action
 export async function fetchJobApplicationsForRecruiter(recruiterID){
   await connectToDB();
   const result=await Application.find({recruiterUserID:recruiterID});
   return JSON.parse(JSON.stringify(result));
 }

 //update job application
 export async function updateJobApplicationAction(data,pathToRevalidate){
  await connectToDB();
  const {recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobID,
    jobAppliedDate,
  _id}=data;
   
   await Application.findByIdAndUpdate({
    _id:_id
   },{
    recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobID,
    jobAppliedDate,
   },{new:true});
   revalidatePath(pathToRevalidate);
 }


 //getCandidateDetails by candidate ID
 export async function getCandidateDetailsByIDAction(currentCandidateID) {
  await connectToDB();
  const result=await Profile.findOne({userId:currentCandidateID})
  return JSON.parse(JSON.stringify(result));
 }
 //create filter categories
 export async function createFilterCategoryAction(){
  await connectToDB();
  const result=await Job.find({});
  return JSON.parse(JSON.stringify(result));
 }

 //update profile action

 export async function updateProfileAction(data,pathToRevalidate){
  await connectToDB();
  const {userId,
    role,
    email,
    isPremiumUser,
    memberShipType,
    memberShipStartDate,
    memberShipEndDate,
    recruiterInfo,
    candidateInfo,_id}=data;

    await Profile.findByIdAndUpdate({
    _id:_id
   },{
    userId,role,email,isPremiumUser,
    memberShipType,
    memberShipStartDate,
    memberShipEndDate,
    recruiterInfo,candidateInfo
 },{
  new:true
 })
 revalidatePath(pathToRevalidate)
}
//create stripe price id based on tier selection
// export async function createPriceAction(data){
//   const session=await stripe.price.create({
//     currency:'inr',
//     unit_amount:data?.amount*100,
//     recurring:{
//       interval:'year'
//     },
//     product_data:{
//       name:'Premium Plan'
//     }
//   })
//   return {
//     success:true,
//     id:session?.id,
//   }
// }



//create payment logic
