import React from 'react'

const AddressCard = ({address}) => {
  return (
    
    <div className="space-y-3">
        <h6 className='text-color-primary'>
          {`${address?.firstName} ${address?.lastName}`}
        </h6>

        <p>
          {`${address?.streetAddress} ${address?.city} ${address?.state} ${address?.zipCode}`}
        </p>

        <div className="space-y-1">
          <h6 className='text-color-primary'>Phone Number</h6>
          <p>{address?.mobile}</p>
        </div>
    </div>
            
  )
}

export default AddressCard