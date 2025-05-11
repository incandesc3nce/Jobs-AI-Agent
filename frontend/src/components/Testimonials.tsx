import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  role: string;
  quote: string;
  imageSrc: string;
  stars: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, role, quote, imageSrc, stars }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col h-full transform transition-all hover:shadow-lg">
      <div className="flex items-center mb-4">
        <img src={imageSrc} alt={name} className="w-14 h-14 rounded-full object-cover mr-4" />
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-5 w-5 ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      
      <p className="text-gray-700 italic flex-grow">{quote}</p>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Отзывы пользователей
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Наш ИИ помог профессионалам найти идеальную работу.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Testimonial 
            name="Алексей Иванов"
            role="Разработчик ПО"
            quote="ИИ отлично понял мои технические навыки и карьерные цели. Я нашел удаленную работу, которая точно соответствовала моим пожеланиям, всего за два дня!"
            imageSrc="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
            stars={5}
          />
          
          <Testimonial 
            name="Мария Петрова"
            role="UX Дизайнер"
            quote="Я переходила из графического дизайна в UX, и система нашла возможности, где ценились мои переносимые навыки. Рекомендации по карьерному пути были бесценны."
            imageSrc="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
            stars={4}
          />
          
          <Testimonial 
            name="Михаил Чен"
            role="Аналитик данных"
            quote="Рекомендации были точными. ИИ предложил роли, о которых я даже не думал, но которые идеально соответствовали моим навыкам и интересам в финтех-секторе."
            imageSrc="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
            stars={5}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;