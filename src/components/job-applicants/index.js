"use client"

import CandidateList from "../candidate-list";
import { Drawer, DrawerContent } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";


function JobApplicants({
    showApplicantsDrawer,
    setShowApplicantsDrawer,
    showCurrentCandidateDetailsModel,
    setShowCurrentCandidateDetailsModel,
    currentCandidateDetails,
    setCurrentCandidateDetails,
    jobItem,
    jobApplications
}){
    return <Drawer open={showApplicantsDrawer}
    onOpenChange={setShowApplicantsDrawer}
    >
    <DrawerContent className="max-h-[50vh]">
    <ScrollArea className="h-auto overfolw-y-auto">
    <CandidateList
    currentCandidateDetails={currentCandidateDetails}
    setCurrentCandidateDetails={setCurrentCandidateDetails}
    jobApplications={jobApplications}
    showCurrentCandidateDetailsModel={showCurrentCandidateDetailsModel}
    setShowCurrentCandidateDetailsModel={setShowCurrentCandidateDetailsModel}
    />
    </ScrollArea>
    </DrawerContent>
    </Drawer>
}
export default JobApplicants;