import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
    }
  };
  
  return (
    <section className="py-16 bg-blue-600">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 bg-blue-600 text-white">
              <h3 className="text-2xl font-bold mb-4">Будьте в курсе</h3>
              <p className="mb-6">
                Подпишитесь на нашу рассылку, чтобы получать обновления о новых функциях, 
                аналитику рынка труда и ранний доступ к новым инструментам.
              </p>
              <div className="hidden md:block">
                <div className="flex items-center">
                  <div className="w-12 h-1 bg-blue-400 mr-4"></div>
                  <p className="text-blue-300 text-sm">Более 5,000 подписчиков</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 md:p-12">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="bg-green-100 text-green-700 rounded-full p-3 mb-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-900">Спасибо!</h4>
                  <p className="text-gray-600 text-center">
                    Вы успешно подписались на нашу рассылку.
                  </p>
                </div>
              ) : (
                <>
                  <h4 className="text-xl font-semibold mb-2 text-gray-900">Подпишитесь на рассылку</h4>
                  <p className="text-gray-600 mb-6">
                    Получайте последние обновления прямо на вашу почту.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введите ваш email"
                        className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <button 
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Подписаться
                      </button>
                    </div>
                  </form>
                  <p className="text-gray-500 text-sm mt-4">
                    Мы уважаем вашу конфиденциальность. Отписаться можно в любой момент.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;