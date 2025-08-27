import React from 'react'

const PerfilUsuario = () => {
  return (
    <div className=''>
      <div className='row'>
        <img src="https://placehold.co/1920x300" alt="" className='rounded-0 img-fluid opacity-50' />
      </div>
      <div className='row container mx-md-5 mx-1 gap-md-5'>
        <div className='col-3 d-flex flex-column gap-3 gap-md-4'>
          <img src="https://ui-avatars.com/api/?name=ST" alt="" className='rounded-circle img-fluid'/>
          <span className='btn btn-secondary btn-sm w-auto'>Seguindo</span>
        </div>
        <div className='col-3 d-flex flex-column justify-content-start pt-4'>
          <span className='badge bg-dark w-75 fs-5'>RAGEMODE OWNER</span>
         <div className='d-flex flex-row align-items-center'>
           <span className='fw-bolder text-light fs-1'>r0sy</span>
           <span className='btn '><i className='bi bi-three-dots text-light fs-2 '></i> </span>
          </div>
        
            <p className='small m-0 fw-bold'>Membro desde year</p>
        
        </div>
        <div className='pt-5 fs-6 col-2 text-light d-flex flex-row gap-5 fw-bold '>
          <div className='d-flex flex-column align-items-center'>
            <span>Seguidores</span>
            <span>120</span>
          </div>
          <div className='d-flex flex-column align-items-center'>
            <span>Seguindo</span>
            <span>120</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PerfilUsuario