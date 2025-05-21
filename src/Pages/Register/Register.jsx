import React from 'react'

const Register = () => {
  return (
    <div className='container-md w-auto'>
            <span className='display-4 text-light fw-bold'>REGISTER</span>
            <div className='rounded-2  py-3 px-2 logNsign mt-5'>
                <div className='d-flex flex-column align-items-center gap-2'>
                    <div>
                       <img src="https://placehold.co/100x50" className='img-fluid' alt="" /> 
                    </div>

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

                    <button className='btn btn-dark btn-sm bg-black border-0 rounded-1 w-50 mt-3'>Registrar</button>
                    <hr className='w-100 mt-3 mb-5'/>
                </div>
            </div>

    </div>
  )
}

export default Register