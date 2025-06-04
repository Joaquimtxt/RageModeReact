import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import emailjs from 'emailjs-com';

const ReportTags = ({ReportType, ReportName, modalId = "ReportModal"}) => {
    // Limpa o input ao fechar a modal
  useEffect(() => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    const handler = () => setInputValue('');
    modal.addEventListener('hidden.bs.modal', handler);
    return () => modal.removeEventListener('hidden.bs.modal', handler);
  }, [modalId]);

       const [isExpanded, setIsExpanded] = useState(false);
    
        const toggleExpand = () => {
            setIsExpanded(!isExpanded);
        };
        const [inputValue, setInputValue] = useState('');
        const location = useLocation();
        const postUrl = `${window.location.origin}${location.pathname}`;
      
        // Pegue o nome e email do usuário logado (ajuste conforme seu sistema)
        const userName = localStorage.getItem('userName'); // ou useContext(AuthContext) etc
        const userEmail = localStorage.getItem('userEmail');

        const handleSubmit = (e) => {
            e.preventDefault();
        
            const templateParams = {
              name: userName,
              email: userEmail,
              report_title: ReportType,
              report_content: inputValue,
              post_url: postUrl,
            };
        
            emailjs.send(
              'service_mli4i6h',
              'template_4h79yjp',
              templateParams,
              'mYIXX86GjmppAIsPF'
            ).then(
              () => {
                alert("Report enviado com sucesso!");
                setIsExpanded(false);
                setInputValue('');
              },
              () => {
                alert("Erro ao enviar report.");
              }
            );
          };

  return (
    <div className='d-flex flex-row gap-2'>
    <section className='border border-light col-12'>
    <div >
        <div className='bg-black p-2 ' onClick={toggleExpand}>
    <p >{ReportType}{isExpanded ? <ion-icon name="caret-up-outline"></ion-icon> : <ion-icon name="caret-down-outline"></ion-icon>}</p>
    </div>
{isExpanded  &&(
<form  onSubmit={handleSubmit} className='d-flex flex-column align-items-center w-100 mt-2'>
<input className='w-75' type="text" name={ReportName} id={ReportName}  value={inputValue} onChange={e => setInputValue(e.target.value)}
                required/>   
<div className='w-75 align-items-center d-flex flex-row justify-content-between' >
<button className='btn btn-primary mt-2' type="submit">Submit</button>
<button className='btn btn-outline-danger mt-2'  onClick={() => toggleExpand()}>Cancel</button>
</div>
</form>
)}
</div>
</section>
</div>
  )
}

export default ReportTags