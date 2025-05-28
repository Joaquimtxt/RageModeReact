import React from 'react'
import { useLocation } from 'react-router';

const ModalShare = () => {
    const location = useLocation();
    const postUrl = `${window.location.origin}${location.pathname}`;
    const handleCopy = () => {
        navigator.clipboard.writeText(postUrl);
        alert("Link copied to your clipboard!");
    };
    const handleShareWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(postUrl)}`;
        window.open(url, "_blank");
      };
      const handleShareTwitter = () => {
        const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`;
        window.open(url, "_blank");
      };
      
      const handleShareLinkedin = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
        window.open(url, "_blank");
      };
      
      const handleShareFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        window.open(url, "_blank");
      };
  return (
    <div className='modal-content bg-secondary'>
        <header className='bg-white fw-bold d-flex justify-content-between align-items-center p-2 '>
        <i className='bi bi-share text-dark'><span className='ms-2'>Share:</span></i>
            <button
                type="button"
                className="btn-close btn-close-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
        </header>
        <div className='modal-body'>
          <div>
            <i className='bi bi-copy fs-4 btn text-light' onClick={handleCopy}></i>
            <span className='ms-1'>{postUrl}</span>
            </div>
          <hr />
          <div>
            <p className='text-light'>Share this post on your Social Medias:</p>
            <div className='d-flex flex-row gap-2'>
                <button className='btn btn-success' onClick={handleShareWhatsApp}><i className='bi bi-whatsapp'></i> Whatsapp</button>
                <button className={`btn btn-primary`} onClick={handleShareLinkedin}><i className='bi bi-linkedin'></i> Linkedin</button>
                <button className={`btn btn-dark `} onClick={handleShareTwitter}><i className='bi bi-bi-twitter-x'></i> X</button>
                <button className={`btn btn-primary`} onClick={handleShareFacebook}><i className='bi bi-facebook'></i> Facebook</button>
            </div>
          </div>
        </div>
        </div>
  )
}

export default ModalShare