"use client";
import { useEffect, useRef } from "react";
import "./canvas.css";



const CanvasAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Добавляем небольшой таймаут для гарантии наличия элемента
    const timeout = setTimeout(() => {
      const c = canvasRef.current;
      console.log("Canvas Ref:", c);
      if (!c) {
        console.error("Canvas not found!");
        return;
      }

      const $ = c.getContext("2d");
      if (!$) {
        console.error("2D context not found!");
        return;
      }

      let w = (c.width = window.innerWidth); // Устанавливаем ширину canvas равной ширине окна браузера
      let h = (c.height = window.innerHeight); // Устанавливаем высоту canvas равной высоте окна браузера
      let t = 0; // Время для анимации (движение со временем)
      const num = 850; // Количество точек (чем больше, тем плотнее рисунок)
      // let u = 0; // Переменная для смещения анимации
      const _t = 1 / 60; // Скорость анимации (чем меньше, тем быстрее)
      let x = 0, y = 0, _x = 0, _y = 0; // Координаты для точек

      const anim = () => {
        $.globalCompositeOperation = "source-over"; // Обычное наложение
        $.clearRect(0, 0, w, h); // Очищаем canvas
      
        $.globalCompositeOperation = "lighter"; // Легкое наложение
      
        // Основной цикл для создания "слоёв" анимации
        for (let i = 0; i < 1; i++) {
          x = 0; // Обнуляем координату X перед началом
          let b = 0; // Угол поворота
          $.beginPath(); // Начинаем новый путь
      
          for (let j = 0; j < num; j++) {
            x -= 0.312 * Math.sin(15); // Смещение точки по X
            y = x * Math.sin(i + 2.5 * t + x / 7) / 9; // Вычисление Y на основе времени и X
      
            b = (j * 9 * Math.PI) / 16; // Угол для поворота точки
            _x = x * Math.cos(b) - y * Math.sin(b); // Поворот точки по X
            _y = x * Math.sin(b) + y * Math.cos(b); // Поворот точки по Y
      
            // Рисуем точку белого цвета
            if (!isNaN(_x) && !isNaN(_y)) {
              $.fillStyle = "white"; // Цвет заливки - белый
              $.beginPath();
              $.arc(w / 2 - _x, h / 2 - _y, 0.5, 0, Math.PI * 2); // Радиус точки
              $.fill(); // Заливаем точку
            }
          }
      
          $.lineWidth = 0.12; // Толщина линий
          $.strokeStyle = "white"; // Цвет обводки - белый
          $.stroke(); // Обводка
        }
      
        t += _t; // Увеличиваем время для анимации
        // u -= 0.2; // Смещение анимации
        window.requestAnimationFrame(anim); // Запрашиваем следующий кадр
      };
      
      // const anim = () => {
      //   $.globalCompositeOperation = "source-over"; // Устанавливаем режим наложения для очистки фона
      //   $.clearRect(0, 0, w, h);
      //   $.globalCompositeOperation = "lighter"; // Устанавливаем режим наложения для ярких точек
      
      //   // Основной цикл для создания "слоёв" анимации
      //   for (let i = 0; i < 1; i++) {
      //     x = 0; // Обнуляем координату X перед началом
      //     let b = 0; // Угол поворота (сбрасывается для каждого слоя)
      //     const _u = u / 4 + i; // Смещение цвета и анимации для текущего слоя
      //     const col = u + _u / 8; // Вычисление оттенка цвета для градиента
      
      //     $.beginPath(); // Начинаем новый путь (новый слой точек)
      //     for (let j = 0; j < num; j++) {
      //       // === Изменение формы и траектории ===
      //       x -= 0.312 * Math.sin(15); // Смещение точки по X
      //       y = x * Math.sin(i + 2.5 * t + x / 7) / 9; // Вычисление Y на основе времени и X
            
      //       b = (j * 9 * Math.PI) / 12; // Угол для поворота точки (можно менять для других форм)
      //       _x = x * Math.cos(b) - y * Math.sin(b); // Поворот точки по X
      //       _y = x * Math.sin(b) + y * Math.cos(b); // Поворот точки по Y
      
      //       // Рисуем точку на canvas
      //       if (!isNaN(_x) && !isNaN(_y)) {
      //       $.arc(w / 2 - _x, h / 2 - _y, 0.5, 0, Math.PI * 2); // Параметры точки (радиус: 0.5)
      //       }
      //       $.lineWidth = 0.12; // Толщина линий
      //     }
      
      //     // === Изменение цвета ===
      //     const g = $.createLinearGradient(w / 2, h / 2, w / 2 + _x, h / 2 + _y); // Градиент для слоя
      //     g.addColorStop(0, `hsla(${col}, 90%, 50%, 1)`); // Цвет градиента на старте
      //     g.addColorStop(0.5, `hsla(${_u}, 95%, 50%, 1)`); // Цвет в середине градиента
      //     g.addColorStop(1, "hsla(0, 0%, 0%, 1)"); // Завершающий цвет градиента (чёрный)
      //     $.strokeStyle = g; // Применяем градиент как стиль обводки
      //     $.stroke(); // Применяем обводку для всех нарисованных точек
      //   }
      
      //   // === Изменение скорости анимации ===
      //   t += _t; // Увеличиваем время для движения
      //   u -= 0.2; // Смещение анимации (измените для ускорения или замедления "вихря")
      //   window.requestAnimationFrame(anim); // Запрашиваем следующий кадр анимации
      // };

      anim();

      const handleResize = () => {
        w = window.innerWidth;
        h = window.innerHeight;
        c.width = w;
        c.height = h;
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, 0); // Таймаут в 0 мс

    return () => clearTimeout(timeout);
  }, []);

  return <canvas ref={canvasRef}  className="canvas" />;
};

export default CanvasAnimation;