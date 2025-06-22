import React from 'react';
import { Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import LoginForm from './forms/LoginForm.jsx';

export default function LoginPage() {
  const { login } = useAuth();

  const handleLoginSuccess = async ({ email, password }) => {
    try {
      const success = await login(email, password);
      if (!success) {
        throw new Error('Échec de la connexion');
      }
    } catch (error) {
      console.error('Erreur handleLoginSuccess:', error);
      throw error; // Laisser LoginForm gérer l'affichage de l'erreur
    }
  };

  // Generate stars with different properties
  const generateStars = (count, type) => {
    return [...Array(count)].map((_, i) => {
      const size = type === 'small' ? Math.random() * 2 + 1 : 
                   type === 'medium' ? Math.random() * 3 + 2 : 
                   Math.random() * 4 + 3;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 4 + 3;
      const delay = Math.random() * 8;
      const opacity = type === 'small' ? Math.random() * 0.8 + 0.4 : 
                      type === 'medium' ? Math.random() * 0.9 + 0.5 : 
                      Math.random() * 1 + 0.7;
      
      return {
        id: `${type}-${i}`,
        size,
        x,
        y,
        duration,
        delay,
        opacity
      };
    });
  };

  // Generate planets
  const generatePlanets = () => {
    return [
      {
        id: 'planet-1',
        size: 120,
        x: 15,
        y: 20,
        color: 'from-blue-400 to-purple-600',
        duration: 20,
        rings: true
      },
      {
        id: 'planet-2',
        size: 80,
        x: 75,
        y: 15,
        color: 'from-orange-400 to-red-500',
        duration: 15,
        rings: false
      },
      {
        id: 'planet-3',
        size: 60,
        x: 85,
        y: 70,
        color: 'from-green-400 to-teal-500',
        duration: 25,
        rings: false
      },
      {
        id: 'planet-4',
        size: 100,
        x: 10,
        y: 75,
        color: 'from-purple-400 to-pink-500',
        duration: 18,
        rings: true
      }
    ];
  };

  const smallStars = generateStars(200, 'small');
  const mediumStars = generateStars(100, 'medium');
  const largeStars = generateStars(40, 'large');
  const planets = generatePlanets();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Galaxy Background with Stars and Planets */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Deep space nebula clouds */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/6 to-cyan-500/6 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '8s' }}></div>
        <div className="absolute top-1/6 right-1/3 w-72 h-72 bg-gradient-to-r from-pink-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '12s' }}></div>

        {/* Planets */}
        {planets.map((planet) => (
          <div
            key={planet.id}
            className="absolute animate-planet-orbit"
            style={{
              left: `${planet.x}%`,
              top: `${planet.y}%`,
              animationDuration: `${planet.duration}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <div 
              className={`rounded-full bg-gradient-to-br ${planet.color} relative shadow-2xl animate-planet-rotate`}
              style={{
                width: `${planet.size}px`,
                height: `${planet.size}px`,
                boxShadow: `0 0 ${planet.size/2}px rgba(255, 255, 255, 0.1), inset 0 0 ${planet.size/4}px rgba(0, 0, 0, 0.3)`
              }}
            >
              {/* Planet surface details */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-white/20 rounded-full blur-sm"></div>
              <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-white/15 rounded-full blur-sm"></div>
              
              {/* Planet rings */}
              {planet.rings && (
                <>
                  <div 
                    className="absolute border border-white/20 rounded-full animate-ring-rotate"
                    style={{
                      width: `${planet.size * 1.6}px`,
                      height: `${planet.size * 0.3}px`,
                      left: `${-planet.size * 0.3}px`,
                      top: `${planet.size * 0.35}px`,
                      transform: 'rotateX(75deg)'
                    }}
                  ></div>
                  <div 
                    className="absolute border border-white/10 rounded-full animate-ring-rotate"
                    style={{
                      width: `${planet.size * 1.8}px`,
                      height: `${planet.size * 0.35}px`,
                      left: `${-planet.size * 0.4}px`,
                      top: `${planet.size * 0.325}px`,
                      transform: 'rotateX(75deg)',
                      animationDelay: '1s'
                    }}
                  ></div>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Small twinkling stars */}
        {smallStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-star-twinkle"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: star.opacity,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`
            }}
          ></div>
        ))}

        {/* Medium sparkling stars */}
        {mediumStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-gradient-to-r from-white to-blue-100 animate-star-sparkle"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: star.opacity,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
            }}
          ></div>
        ))}

        {/* Large brilliant stars with cross effect */}
        {largeStars.map((star) => (
          <div
            key={star.id}
            className="absolute animate-star-brilliant"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`
            }}
          >
            <div 
              className="rounded-full bg-gradient-to-r from-white via-blue-100 to-white relative"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.5), 0 0 45px rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Star cross effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-0.5 bg-gradient-to-b from-transparent via-white to-transparent opacity-80"></div>
              </div>
              {/* Additional diagonal cross */}
              <div className="absolute inset-0 flex items-center justify-center rotate-45">
                <div className="w-3/4 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                <div className="w-3/4 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Distant galaxies */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`galaxy-${i}`}
            className="absolute animate-galaxy-rotate"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: `${20 + i * 5}s`
            }}
          >
            <div className="w-16 h-4 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-sm transform rotate-12"></div>
            <div className="w-12 h-3 bg-gradient-to-r from-transparent via-white/8 to-transparent rounded-full blur-sm transform -rotate-12 mt-1"></div>
          </div>
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] opacity-40 pointer-events-none"></div>
      
      <div className="relative w-full max-w-md z-10">
        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-300">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg animate-logo-pulse">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Moralead V2</h1>
            <p className="text-gray-600">Système de gestion ERP</p>
          </div>

          {/* Login Form */}
          <LoginForm onSuccess={handleLoginSuccess} />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Moralead V2 - Projet-424 © 2025 | NR CONSULT - ABCD ELEC
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-float-gentle pointer-events-none"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-float-gentle pointer-events-none" style={{ animationDelay: '3s' }}></div>
      </div>
    </div>
  );
}