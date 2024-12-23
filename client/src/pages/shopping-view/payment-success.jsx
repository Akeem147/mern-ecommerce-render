import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function PaypalSuccessPage() {
  const navigate = useNavigate()
  return (
    <Card className='p-10'>
    <CardHeader className='p-0'>
      <CardTitle className='text-4xl'>Payment successfull!</CardTitle>
    </CardHeader>
    <Button className='mt-5' onClick={() => navigate('/shop/account')}>View orders</Button>
  </Card>
  )
}

export default PaypalSuccessPage