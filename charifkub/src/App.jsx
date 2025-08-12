import { useState, useEffect, useRef } from 'react';
import Particles from './compo/Particles';
import { socialLinks, articleStructure, showCases } from './compo/judy'; 

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const observerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode);
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemPrefersDark);
    }

    document.querySelectorAll('.fade-in').forEach((el, index) => {
      el.style.animationDelay = `${index * 0.15}s`;
    });

    const cards = document.querySelectorAll('.article-card');
    cardsRef.current = cards;
    
    const handleMouseEnter = (e) => {
      e.currentTarget.classList.add('glow');
    };
    
    const handleMouseLeave = (e) => {
      e.currentTarget.classList.remove('glow');
    };
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-pulse');
          setTimeout(() => {
            entry.target.classList.remove('animate-pulse');
          }, 2000);
        }
      });
    }, { threshold: 0.1 });
    
    observerRef.current = observer;

    document.querySelectorAll('.section-header').forEach(header => {
      observer.observe(header);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className={`bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center justify-center relative ${darkMode ? 'dark' : ''}`}>
      <Particles className="fixed inset-0 -z-10" />
      
      <div className="w-full max-w-4xl mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-16 relative z-10">
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src="/profile.webp" 
                alt="Profile" 
                className="profile-img w-40 h-40 rounded-full object-cover mb-4 border-4 border-primary-light dark:border-primary-dark 
                animate-[pulse_3s_ease-in-out_infinite,rotate_15s_linear_infinite] hover:animate-none
                transform hover:scale-105 transition-all duration-300"
              />
              
              <div className="absolute -bottom-2 -right-2 bg-primary-light dark:bg-primary-dark text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg
                      animate-[bounce_2s_ease-in-out_infinite] hover:animate-none">
                <i className="fas fa-graduation-cap"></i>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-2 mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600
           animate-[slideUp_1s_ease-out_2s_both] overflow-hidden whitespace-nowrap">
            Worgurn Ruenpitak
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 italic mx-auto
              animate-[fadeIn_1.5s_ease-in-out_1.5s_both]">
            "On the day I achieve success, I will not forget those who have supported me"
            <br />
            "ในวันที่ฉันประสบความสำเร็จ ฉันจะไม่ลืมคนที่ซัพพอร์ตฉัน"
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-2xl mx-auto mt-4 transition-all duration-500
                animate-[slideUp_1s_ease-out_2s_both,glow_3s_ease-in-out_infinite] 
                hover:shadow-xl hover:scale-[1.02] border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              <i className="fas fa-university text-blue-500 mr-2 animate-[pulse_2s_ease-in-out_infinite]"></i> 
              สวัสดีครับ! ตอนนี้ผมกำลังศึกษาอยู่ที่มหาวิทยาลัยศรีปทุม SPU (SIT)
              <br />
              <i className="fas fa-lightbulb text-yellow-500 mr-2 animate-[pulse_2s_ease-in-out_infinite_1s]"></i>
              ผมชอบการศึกษาหาความรู้นอกห้องเรียน เทคโนโลยี และ สาระต่างๆที่น่าสนใจบนโลกออนไลน์
            </p>
          </div>
        </header>

        <section className="text-center mb-16 fade-in">
          <h2 className="text-2xl font-bold mb-8 text-center section-header bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ช่องทางต่างๆ</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className={`social-link ${link.bg} ${link.hoverBg} text-white py-4 px-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg`}
              >
                <i className={`${link.icon} text-2xl mb-2`}></i>
                <span>{link.text}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="text-center mb-16 fade-in">
          <h2 className="text-2xl font-bold mb-8 text-center section-header bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">บทความแนะนำ</h2>
          <div className="space-y-6">
            {articleStructure.recommended.map((article, index) => (
              <a 
                key={index}
                href={article.href} 
                className={`article-card block bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl border-l-4 ${article.borderColor} transition-all duration-300`}
              >
                <div className="flex items-start"> 
                  <div className={`article-icon ${article.iconBg} text-white rounded-lg w-12 h-12 flex items-center justify-center mr-4`}>
                    <i className={`${article.icon} text-xl`}></i>
                  </div>
                  <div className="article-content">
                    <h3 className="text-left text-xl font-bold text-primary-light dark:text-primary-dark mb-2">{article.title}</h3>
                    <p className="text-left text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400"><i className="fa-solid fa-pen mr-1"></i>{article.authorType}</span>
                      <span className={`${article.tagColor} text-xs px-2.5 py-1 rounded-full tag`}>{article.tag}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-6">
            <a href='https://www.blockdit.com/charifkubpage' className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
              อ่านเพิ่มเติม <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </section>

        <section className="text-center mb-16 fade-in">
          <h2 className="text-2xl font-bold mb-8 text-center section-header bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">บทความพัฒนาตัวเอง</h2>
          <div className="space-y-6">
            {articleStructure.selfImprovement.map((article, index) => (
              <a 
                key={index}
                href={article.href} 
                className={`article-card block bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl border-l-4 ${article.borderColor} transition-all duration-300`}
              >
                <div className="flex items-start"> 
                  <div className={`article-icon ${article.iconBg} text-white rounded-lg w-12 h-12 flex items-center justify-center mr-4`}>
                    <i className={`${article.icon} text-xl`}></i>
                  </div>
                  <div className="article-content">
                    <h3 className="text-left text-xl font-bold text-primary-light dark:text-primary-dark mb-2">{article.title}</h3>
                    <p className="text-left text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400"><i className="fa-solid fa-pen mr-1"></i>{article.authorType}</span>
                      <span className={`${article.tagColor} text-xs px-2.5 py-1 rounded-full tag`}>{article.tag}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-6">
            <a href='https://www.blockdit.com/series/68959722fa1b4bb0101b9850' className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
              อ่านเพิ่มเติม <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </section>

        <section className="text-center mb-16 fade-in">
          <h2 className="text-2xl font-bold mb-8 text-center section-header bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">บทความเทคโนโลยี</h2>
          <div className="space-y-6">
            {articleStructure.technology.map((article, index) => (
              <a 
                key={index}
                href={article.href} 
                className={`article-card block bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl border-l-4 ${article.borderColor} transition-all duration-300`}
              >
                <div className="flex items-start"> 
                  <div className={`article-icon ${article.iconBg} text-white rounded-lg w-12 h-12 flex items-center justify-center mr-4`}>
                    <i className={`${article.icon} text-xl`}></i>
                  </div>
                  <div className="article-content">
                    <h3 className="text-left text-xl font-bold text-primary-light dark:text-primary-dark mb-2">{article.title}</h3>
                    <p className="text-left text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400"><i className="fa-solid fa-pen mr-1"></i>{article.authorType}</span>
                      <span className={`${article.tagColor} text-xs px-2.5 py-1 rounded-full tag`}>{article.tag}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-6">
            <a href='https://www.blockdit.com/series/68959722fa1b4bb0101b9850' className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
              อ่านเพิ่มเติม <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </section>

        <section className="text-center mb-16 fade-in">
          <h2 className="text-2xl font-bold mb-8 text-center section-header bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Show Case</h2>
          <div className="space-y-6">
            {showCases.map((showCase, index) => (
              <a 
                key={index}
                href={showCase.href} 
                className={`article-card block bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl border-l-4 ${showCase.borderColor} transition-all duration-300`}
              >
                <div className="flex items-start"> 
                  <div className={`article-icon ${showCase.iconBg} text-white rounded-lg w-12 h-12 flex items-center justify-center mr-4`}>
                    <i className={`${showCase.icon} text-xl`}></i>
                  </div>
                  <div className="article-content">
                    <h3 className="text-left text-xl font-bold text-primary-light dark:text-primary-dark mb-2">{showCase.title}</h3>
                    <p className="text-left text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {showCase.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400"><i className={showCase.authorType === "Github" ? "fab fa-github mr-1" : "fa-solid fa-pen mr-1"}></i>{showCase.authorType}</span>
                      <span className={`${showCase.tagColor} text-xs px-2.5 py-1 rounded-full tag`}>{showCase.tag}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <a href='https://github.com/ShoperGamer' className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
              Show Case <i className="fas fa-arrow-right ml-2"></i>
            </a>
            <a href='https://github.com/superworgurn' className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
              Show Website <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </section>

        <section className="text-center fade-in">
          <h2 className="text-2xl font-bold mb-8 text-center section-header bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Contact</h2>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-center mb-6 text-white text-lg">
                <i className="fas fa-comments mr-2"></i> สนใจทำงานร่วมกันหรือมีคำถาม? ติดต่อได้ที่
              </p>
              <div className="flex justify-center">
                <a href="https://line.me/R/ti/p/@870jxawo" className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <i className="fab fa-line text-green-500 text-xl mr-2"></i> แชทผ่าน LINE
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="py-8 text-center text-gray-600 dark:text-gray-400 text-sm fade-in mt-8 w-full">
        <div className="max-w-3xl mx-auto px-4">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="mb-2">© 2025 Worgurn Ruenpitak | Copyright</p>
            <p className="text-center opacity-75">Tech Stack</p>
             <p className="text-xs opacity-75">HTML5 | CSS3 | JS | TailwindCSS | React</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;