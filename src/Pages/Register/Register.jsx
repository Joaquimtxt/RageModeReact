import React from 'react'
import Mosaico from '../../assets/Mosaico.png'

const Register = () => {
  return (

    <div className='row justify-content-center'>

<div className='container-fluid col-12 col-md-5 d-flex flex-column me-2 ms-0 gap-5'>
  <div className='row align-self-auto'>
  <p className='text-light display-2 jersey col-4 text-center m-3 m-md-0'>FORUMS</p>
  <img className='col-5 col-md-3 img-fluid p-0 m-0' src='../../../public/logo_ragemode_icon.png'></img>
  </div>

  <p className='text-light fs-3 jersey ms-3'>Conecte-se para acessar novidades, juntar-se a comunidade, acessar novos recursos ou embarcar
     em discussões sobre seus temas preferidos.</p>

</div>


<div className='col-12 col-md-4 ms-2'>
    <div className='container-fluid col-12 col-md-8'>
            <p className='display-2 text-light  text-center jersey'>REGISTER</p>
            <div className='rounded-2  py-3 px-2 logNsign mt-5'>
                <div className='d-flex flex-column align-items-center gap-2'>
                    
                       <img src="../../../public/logo_ragemode_icon.png" className='img-fluid col-4 col-md-5'  alt="" /> 
                    

                    <div className='row container px-4'>
                        <div className='col-12 my-2'>
                            <label className='form-label text-light mb-1 ms-1 fw-medium'>Texto</label>
                            <input className='input-group-text rounded-3 bg-danger-subtle border-black w-100'></input>
                        </div>

                         <div className='col-12 my-2'>
                            <label className='form-label text-light mb-1 ms-1 fw-medium'>Texto</label>
                            <input className='input-group-text rounded-3 bg-danger-subtle border-black w-100'></input>
                        </div>

                    </div>

                    <button className='btn btn-dark btn-sm fs-4 bg-black border-0 rounded-1 w-auto px-5 mt-3 jersey'>Registrar</button>
                    <hr className='w-100 mt-3 mb-5'/>
                </div>
            </div>

    </div>
    </div>
    </div>
  )
}

export default Register