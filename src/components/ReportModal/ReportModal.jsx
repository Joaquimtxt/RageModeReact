import React, { useState } from 'react'
import ReportTags from './ReportTags';

const ReportModal = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };


  return (

    <div className='modal-content bg-secondary'>
        <header className='bg-white fw-bold d-flex justify-content-between align-items-center p-2 '>
        <i className='bi bi-share text-dark'><span className='ms-2'>Report:</span></i>
            <button
                type="button"
                className="btn-close btn-close-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => toggleExpand()}
                ></button>
        </header>
        <div className='modal-body'>
            <ReportTags ReportType="Spam or Fake content" ReportName="SpamOrFake"/>
            <ReportTags ReportType="Adult Content" ReportName="AdultContent"/>
            <ReportTags ReportType="Violent or repulsive content" ReportName="violentOrRepulsive"/>
            <ReportTags ReportType="Hate speech or abusive" ReportName="hateOrAbusive"/>
            <ReportTags ReportType="Harassment or bullying" ReportName="HarassmentOrBullying"/>
            <ReportTags ReportType="Legal problem" ReportName="LegalProblem"/>
          </div>
        
        </div>
      
  )
}


export default ReportModal
