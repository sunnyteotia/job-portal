'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnBoardFormControls } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";
const supabaseClient=createClient('https://aijelkzfhcwcjkenmlfq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpamVsa3pmaGN3Y2prZW5tbGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MzkzNTcsImV4cCI6MjA0ODIxNTM1N30.JUy9ha5mifh04c4rFRJ2sh4UJreIr9i5sYf-hblNhNU')


function OnBoard(){
    const [file,setFile]=useState(null);
    const[currentTab,setCurrentTab] =useState('candidate');
    const [recruiterFormData,setRecruiterFormData] = useState(initialRecruiterFormData);
    const [candidateFormData,setCandidateFormData] = useState(initialCandidateFormData);
   const currentAuthUser=useUser();
   const {user}=currentAuthUser;
//    console.log(currentAuthUser);
   
    function handleTabChange(value){
        setCurrentTab(value);
    }
    console.log(recruiterFormData);
    
    function handleRecruiterFormValidation(){
        return recruiterFormData && recruiterFormData.name.trim()!=='' &&
        recruiterFormData.companyRole.trim()!==''&& recruiterFormData.companyName.trim()!==''
    }
    function handleCandidateFormValidation(){
        return Object.keys(candidateFormData).every(key=>
            candidateFormData[key] && candidateFormData[key].trim()!==''
        )
    }
   async function createProfile(){
    const data = currentTab==='candidate' ?{
        candidateInfo: candidateFormData,
        role: "candidate",
        isPremiumUser: false,
        userId: user?.id,
        email: user?.primaryEmailAddress?.emailAddress,
  
    }:
        {
          recruiterInfo: recruiterFormData,
          role: "recruiter",
          isPremiumUser: false,
          userId: user?.id,
          email: user?.primaryEmailAddress?.emailAddress,
        };
    await createProfileAction(data,'/onboard');
    }
    console.log(candidateFormData);
    
    function handleFileChange(event) {
        event.preventDefault();
        // console.log(event.target.files);
        
        setFile(event.target.files[0]);
      }
      async function handleUploadPdfToSupabase(){
        const {data,error}=await supabaseClient.storage.
        from('job-board-public').upload(`/public/${file.name}`,file,{
            cacheControl:"3600",
            upsert:false,
        });
        console.log(data,error);
        if(data){
            setCandidateFormData({
                ...candidateFormData,
                resume:data.path
            });
        }
        
      }
    useEffect(()=>{
        if(file)handleUploadPdfToSupabase();
    },[file])
return(
    <div className="bg-white ">
    <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full" >
            <div className="flex items-baseline
             justify-between border-b pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight
                 text-gray-900">Welcome to onboarding</h1>
                 <TabsList>
                    <TabsTrigger value="candidate">Candidate</TabsTrigger>
                    <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                 </TabsList>
            </div>
        </div>
        <TabsContent value="candidate"  key="candidate">
        <CommonForm
            formControls={candidateOnboardFormControls}
            buttonText={'Onboard as candidate'}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            handleFileChange={handleFileChange}
            isBtnDisabled={!handleCandidateFormValidation()}
            action={createProfile}
            />
        </TabsContent>
        <TabsContent value="recruiter"  key="recruiter">
            <CommonForm
            formControls={recruiterOnBoardFormControls}
            buttonText={'Onboard as recruiter'}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isBtnDisabled={!handleRecruiterFormValidation()}
            action={createProfile}
            />
        </TabsContent>
    </Tabs>

</div>
)
}
export default OnBoard;