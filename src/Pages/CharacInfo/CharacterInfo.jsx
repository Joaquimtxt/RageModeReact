import React from 'react'

const CharacterInfo = () => {
  return (
    
    <div className='container  d-flex flex-column align-items-center'>
        <div className='row my-3'>

            <p className='text-light display-4 text-center jersey mb-4'>Moveset</p>
            <div className='d-flex flex-wrap gap-3'>


            <div className='border-light border rounded-1 p-1 text-center d-flex flex-column align-items-center text-light'>
                <img src="https://placehold.co/400x220" className='img-fluid' alt="" />
                <p className='fw-bolder fs-4 my-2'> Move Name </p>
                <div className=''>
                    <img src="https://wiki.supercombo.gg/images/0/00/Qcb.png" className='img-fluid w-50' alt="" />+ LK
                </div>
            </div>

            </div>

        </div>
        <div className='row'>


        </div>
    </div>

    

  )
}

export default CharacterInfo