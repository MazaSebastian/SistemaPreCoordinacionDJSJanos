import { useState } from 'react'
import { sendPrecoordinacionEmail } from '../services/emailService'

export const useEmailSender = () => {
  const [isSending, setIsSending] = useState(false)
  const [sendStatus, setSendStatus] = useState(null) // 'success', 'error', null

  const sendEmail = async (eventData, userSelections) => {
    console.log('useEmailSender: sendEmail called with:', { eventData, userSelections })
    setIsSending(true)
    setSendStatus(null)

    try {
      console.log('useEmailSender: Sending email with EmailJS...')
      const result = await sendPrecoordinacionEmail(eventData, userSelections)
      
      console.log('useEmailSender: Email result:', result)

      if (result.success) {
        setSendStatus('success')
        return { success: true }
      } else {
        setSendStatus('error')
        console.error('Error enviando email:', result.error)
        return { success: false, error: result.error }
      }
    } catch (error) {
      setSendStatus('error')
      console.error('Error de conexión:', error)
      return { success: false, error: 'Error de conexión' }
    } finally {
      setIsSending(false)
    }
  }

  return {
    sendEmail,
    isSending,
    sendStatus
  }
}
