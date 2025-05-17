import { useEffect } from 'react'
import { useModalStore } from '../../../store/modalStore'
import { motion, AnimatePresence } from 'framer-motion'

interface AlertModalProps {
  mainChar: string
  subChar: string
  duration?: number
}

export const AlertModal = ({
  mainChar,
  subChar,

  duration = 1000
}: AlertModalProps) => {
  const { closeModal } = useModalStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal()
    }, duration)

    return () => clearTimeout(timer)
  }, [closeModal])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          className="bg-black absolute inset-0"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-8 relative z-10 max-w-lg w-full mx-4 border border-gray-200">
          {subChar ? (
            <div className="space-y-4 text-center text-xl leading-relaxed">
              <p>
                <span className="font-semibold text-purple-600">{subChar}</span>
                <span className="text-gray-700"> 님은</span>
              </p>
              <p>
                <span className="font-semibold text-blue-600">{mainChar}</span>
                <span className="text-gray-700">의 부캐릭터입니다.</span>
              </p>
            </div>
          ) : (
            <p className="text-center text-gray-800 text-lg">{mainChar}</p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
