import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  StarIcon,
  FaceSmileIcon,
  FaceFrownIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface FeedbackData {
  type: 'bug' | 'feature' | 'general';
  rating: number;
  message: string;
  email?: string;
}

const feedbackTypes = [
  { id: 'bug', label: '报告问题', icon: '🐛', color: 'bg-red-50 text-red-600 border-red-200' },
  { id: 'feature', label: '功能建议', icon: '💡', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { id: 'general', label: '一般反馈', icon: '💬', color: 'bg-green-50 text-green-600 border-green-200' }
];

const FeedbackWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'type' | 'rating' | 'message' | 'success'>('type');
  const [feedback, setFeedback] = useState<FeedbackData>({
    type: 'general',
    rating: 0,
    message: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTypeSelect = (type: 'bug' | 'feature' | 'general') => {
    setFeedback(prev => ({ ...prev, type }));
    setStep('rating');
  };

  const handleRatingSelect = (rating: number) => {
    setFeedback(prev => ({ ...prev, rating }));
    setStep('message');
  };

  const handleSubmit = async () => {
    if (!feedback.message.trim()) return;
    
    setIsSubmitting(true);
    
    // 模拟提交反馈
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep('success');
      
      // 重置表单
      setTimeout(() => {
        setIsOpen(false);
        setStep('type');
        setFeedback({ type: 'general', rating: 0, message: '', email: '' });
      }, 3000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetWidget = () => {
    setStep('type');
    setFeedback({ type: 'general', rating: 0, message: '', email: '' });
  };

  return (
    <>
      {/* Feedback Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
        <span className="sr-only">反馈</span>
      </motion.button>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">用户反馈</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-200 transition-colors duration-200"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-blue-100 text-sm mt-1">
                  您的反馈对我们很重要
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Step 1: Select Feedback Type */}
                {step === 'type' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3"
                  >
                    <h4 className="font-medium text-gray-900 mb-4">选择反馈类型</h4>
                    {feedbackTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleTypeSelect(type.id as any)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-105 ${type.color}`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{type.icon}</span>
                          <span className="font-medium">{type.label}</span>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Step 2: Rating */}
                {step === 'rating' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-center"
                  >
                    <h4 className="font-medium text-gray-900 mb-2">整体评分</h4>
                    <p className="text-sm text-gray-600 mb-6">请为您的使用体验打分</p>
                    
                    <div className="flex justify-center space-x-2 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRatingSelect(star)}
                          className="transition-transform duration-200 hover:scale-110"
                        >
                          {star <= feedback.rating ? (
                            <StarIconSolid className="h-8 w-8 text-yellow-400" />
                          ) : (
                            <StarIcon className="h-8 w-8 text-gray-300 hover:text-yellow-400" />
                          )}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      {feedback.rating > 0 && feedback.rating <= 2 && (
                        <div className="flex items-center text-red-500">
                          <FaceFrownIcon className="h-5 w-5 mr-1" />
                          <span className="text-sm">需要改进</span>
                        </div>
                      )}
                      {feedback.rating >= 4 && (
                        <div className="flex items-center text-green-500">
                          <FaceSmileIcon className="h-5 w-5 mr-1" />
                          <span className="text-sm">很满意</span>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => setStep('type')}
                      className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                      ← 返回上一步
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Message */}
                {step === 'message' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h4 className="font-medium text-gray-900">详细描述</h4>
                    
                    <textarea
                      value={feedback.message}
                      onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="请详细描述您的反馈..."
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    
                    <input
                      type="email"
                      value={feedback.email}
                      onChange={(e) => setFeedback(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="邮箱地址（可选，用于回复）"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setStep('rating')}
                        className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        上一步
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!feedback.message.trim() || isSubmitting}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            提交中...
                          </>
                        ) : (
                          <>
                            <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                            提交反馈
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {step === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">反馈提交成功！</h4>
                    <p className="text-sm text-gray-600">
                      感谢您的反馈，我们会认真考虑您的建议。
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackWidget;